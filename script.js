document.addEventListener('DOMContentLoaded', function () {
    const fileUpload = document.getElementById('file-upload');
    const fileInfo = document.getElementById('file-info');
    const previewSection = document.getElementById('preview-section');
    const dataPreview = document.getElementById('data-preview');
    const qualityReportSection = document.getElementById('quality-report-section');
    const qualityReport = document.getElementById('quality-report');
    const suggestionsSection = document.getElementById('suggestions-section');
    const cleaningSuggestions = document.getElementById('cleaning-suggestions');
    const autoCleanBtn = document.getElementById('auto-clean-btn');
    const downloadBtn = document.getElementById('download-btn');
    const qualityReportPlaceholder = document.getElementById('quality-report-placeholder');
    const suggestionsPlaceholder = document.getElementById('suggestions-placeholder');

    const columnModal = document.getElementById('column-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const closeModalBtn = document.getElementById('close-modal-btn');
    
    // Elements for Filtering
    const filteringSection = document.getElementById('filtering-section');
    const filteringPlaceholder = document.getElementById('filtering-placeholder');
    const dateColumnSelect = document.getElementById('date-column-select');
    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const applyFilterBtn = document.getElementById('apply-filter-btn');
    const clearFilterBtn = document.getElementById('clear-filter-btn');
    const filterStatus = document.getElementById('filter-status');

    // New element for download format
    const downloadFormatSelect = document.getElementById('download-format-select');

    const historyPanel = document.getElementById('history-panel');
    const historyList = document.getElementById('history-list');
    const undoBtn = document.getElementById('undo-btn');

    let originalData = [];
    let processedData = []; // This will now always hold the full, cleaned dataset
    let headers = [];
    let qualityMetrics = {};
    let appliedSuggestions = new Set();
    let originalFilename = 'data.csv';
    let historyStack = [];
    let actionHistory = [];
    let activeFilter = null; // To store current filter settings

    function updateStepUI(stepNumber, status = 'active') {
        const stepSection = document.getElementById(`step-${stepNumber}`);
        const stepIcon = document.getElementById(`step-${stepNumber}-icon`);
        if (!stepSection) return;

        stepSection.classList.remove('opacity-50', 'border-slate-400', 'border-blue-500', 'border-green-500');
        if(stepIcon) stepIcon.classList.remove('bg-slate-400', 'bg-blue-500', 'bg-green-500');

        if (status === 'active') {
            stepSection.classList.add('border-blue-500');
            if(stepIcon) stepIcon.classList.add('bg-blue-500');
            stepSection.classList.remove('opacity-50');
        } else if (status === 'done') {
            stepSection.classList.add('border-green-500');
             if(stepIcon) stepIcon.classList.add('bg-green-500');
            stepSection.classList.remove('opacity-50');
        } else {
            stepSection.classList.add('opacity-50', 'border-slate-400');
            if(stepIcon) stepIcon.classList.add('bg-slate-400');
        }
    }
    
    function processData(results) {
        if (!results || !results.data || !results.meta) {
            fileInfo.textContent = `Error: Could not parse the file. The format may be invalid.`;
            return;
        }

        originalData = results.data;
        processedData = JSON.parse(JSON.stringify(originalData));
        headers = results.meta.fields;
        
        historyStack = [];
        actionHistory = [];
        appliedSuggestions.clear();
        clearFilter();

        detectAndPopulateDateColumns();
        refreshDisplay();
        generateCleaningSuggestions();
        renderHistory();
        
        historyPanel.classList.remove('hidden');
        filteringSection.classList.remove('hidden');
        filteringPlaceholder.classList.add('hidden');
        
        updateStepUI(1, 'done');
        updateStepUI(2, 'active');
    }

    fileUpload.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (!file) return;

        originalFilename = file.name;
        fileInfo.textContent = `Processing file: ${file.name} (${(file.size / 1024).toFixed(2)} KB)...`;
        fileInfo.classList.remove('hidden');

        const fileExtension = file.name.split('.').pop().toLowerCase();

        if (fileExtension === 'csv' || fileExtension === 'tsv') {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                delimiter: fileExtension === 'tsv' ? '\t' : ',',
                complete: processData
            });
        } else if (fileExtension === 'json') {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const data = JSON.parse(e.target.result);
                    if (Array.isArray(data) && data.length > 0) {
                        const fields = Object.keys(data[0]);
                        processData({ data: data, meta: { fields: fields } });
                    } else {
                        throw new Error("JSON must be an array of objects.");
                    }
                } catch (err) {
                    fileInfo.textContent = `Error parsing JSON: ${err.message}`;
                }
            };
            reader.readAsText(file);
        } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, {type: 'array'});
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet);
                    const fields = jsonData.length > 0 ? Object.keys(jsonData[0]) : [];
                    processData({ data: jsonData, meta: { fields: fields } });
                } catch (err) {
                    fileInfo.textContent = `Error parsing Excel file: ${err.message}`;
                }
            };
            reader.readAsArrayBuffer(file);
        } else {
            fileInfo.textContent = "Unsupported file format. Please use CSV, TSV, JSON, or Excel.";
        }
    });

    function getFilteredData() {
        if (!activeFilter) {
            return processedData;
        }
        const { column, start, end } = activeFilter;
        const startDate = new Date(start);
        const endDate = new Date(end);
        
        return processedData.filter(row => {
            const cellValue = row[column];
            if (!cellValue) return false;
            
            let rowDate;
            // Handle Excel's integer date format
            if (typeof cellValue === 'number' && cellValue > 10000 && cellValue < 60000) {
                rowDate = new Date(Date.UTC(0, 0, cellValue - 1));
            } else {
                rowDate = new Date(cellValue);
            }

            return !isNaN(rowDate.getTime()) && rowDate >= startDate && rowDate <= endDate;
        });
    }

    function refreshDisplay() {
        const dataToShow = getFilteredData();
        displayPreview(dataToShow);
        generateQualityReport(dataToShow);
        updateFilterStatus(dataToShow.length);
    }
    
    function displayPreview(data) {
        previewSection.classList.remove('hidden');
        let table = '<table class="w-full text-sm text-left text-slate-500">';
        table += '<thead class="text-xs text-slate-700 uppercase bg-slate-200">';
        table += '<tr>';
        headers.forEach(header => table += `<th scope="col" class="px-6 py-3">${header}</th>`);
        table += '</tr></thead>';
        table += '<tbody>';
        data.slice(0, 10).forEach(row => {
            table += '<tr class="bg-white border-b">';
            headers.forEach(header => {
                const value = row[header] === null || row[header] === undefined ? '' : row[header];
                table += `<td class="px-6 py-4">${String(value).slice(0, 50)}${String(value).length > 50 ? '...' : ''}</td>`;
            });
            table += '</tr>';
        });
        table += '</tbody></table>';
        dataPreview.innerHTML = table;
        if(data.length > 10) {
            dataPreview.innerHTML += `<p class="mt-2 text-sm text-slate-600">Showing first 10 of ${data.length} rows.</p>`;
        } else if(data.length === 0 && originalData.length > 0) {
            dataPreview.innerHTML = `<p class="mt-2 text-sm text-slate-600">No rows match the current filter.</p>`;
        }
    }

    function generateQualityReport(data) {
        qualityReport.innerHTML = '';
        qualityMetrics = {}; // Recalculate based on currently displayed data
        
        if (data.length === 0) {
             qualityReport.innerHTML = '<p class="text-slate-500 col-span-full">No data to display. Try adjusting your filter or upload a new file.</p>';
             qualityReportSection.classList.remove('hidden');
             qualityReportPlaceholder.classList.add('hidden');
             return;
        }

        headers.forEach(header => {
            const values = data.map(row => row[header]);
            const nonEmptyValues = values.filter(v => v !== null && v !== undefined && v !== '');
            const missingCount = data.length - nonEmptyValues.length;
            const uniqueValues = [...new Set(nonEmptyValues)];
            
            let dataType = 'Mixed';
            if (nonEmptyValues.every(v => v === '' || !isNaN(Number(v)))) {
                dataType = 'Numeric';
            } else if (nonEmptyValues.every(v => typeof v === 'string')) {
                 dataType = 'Text';
            }

            const newMetrics = {
                missing: missingCount,
                missingPercentage: data.length > 0 ? ((missingCount / data.length) * 100).toFixed(2) : "0.00",
                unique: uniqueValues.length,
                dataType: dataType,
                values: values
            };
            qualityMetrics[header] = newMetrics;

            const card = `
                <div class="bg-slate-50 p-4 rounded-lg border border-slate-200">
                    <h4 class="font-bold text-lg text-slate-800">${header}</h4>
                    <p class="text-sm text-slate-600"><strong>Data Type:</strong> ${dataType}</p>
                    <p class="text-sm text-slate-600"><strong>Missing Values:</strong> ${newMetrics.missing} (${newMetrics.missingPercentage}%)</p>
                    <p class="text-sm text-slate-600"><strong>Unique Values:</strong> ${newMetrics.unique}</p>
                    <button class="view-column-btn text-sm text-blue-600 hover:underline mt-2" data-column="${header}">View Values</button>
                </div>
            `;
            qualityReport.innerHTML += card;
        });
        qualityReportSection.classList.remove('hidden');
        qualityReportPlaceholder.classList.add('hidden');
        updateStepUI(2, 'done');
        updateStepUI(3, 'active');
    }

    function generateCleaningSuggestions() {
        cleaningSuggestions.innerHTML = '';
        let hasSuggestions = false;
        
        // 1. Suggest removing duplicate rows
        const uniqueRows = new Set(processedData.map(row => JSON.stringify(row)));
        const duplicateRowCount = processedData.length - uniqueRows.size;
        if(duplicateRowCount > 0) {
            hasSuggestions = true;
            addSuggestionCard('remove-duplicates', 'Remove Duplicate Rows', `Found and can remove ${duplicateRowCount} duplicate rows.`, `Remove ${duplicateRowCount} duplicates`);
        }

        // 2. Suggestions per column (analyzing the full processedData)
        headers.forEach(header => {
            const fullValues = processedData.map(row => row[header]);
            const missingCount = fullValues.filter(v => v === null || v === undefined || v === '').length;
            
            if (missingCount > 0) {
                hasSuggestions = true;
                addSuggestionCard(`fill-missing-${header}`, `Handle Missing Values in "${header}"`, `This column has ${missingCount} missing values. You can fill them with the mean (for numeric) or mode (for text).`, 'Fill Missing Values', header);
            }
            
            const hasWhitespace = fullValues.some(v => typeof v === 'string' && (v.trim() !== v));
            if (hasWhitespace) {
                hasSuggestions = true;
                 addSuggestionCard(`trim-whitespace-${header}`, `Trim Whitespace in "${header}"`, `Some values in this column have leading or trailing whitespace.`, 'Trim Whitespace', header);
            }
        });
        
        if (hasSuggestions) {
            suggestionsSection.classList.remove('hidden');
            suggestionsPlaceholder.classList.add('hidden');
            autoCleanBtn.disabled = false;
        } else {
            cleaningSuggestions.innerHTML = '<p class="text-slate-600 text-center p-4 bg-green-50 rounded-lg">Great news! Your data looks clean. No immediate suggestions.</p>';
            autoCleanBtn.disabled = true;
        }

        updateStepUI(3, 'done');
        updateStepUI(4, 'active');
        updateStepUI(5, 'active');
        downloadBtn.disabled = false;
    }

    function addSuggestionCard(id, title, description, buttonText, column = null) {
        const card = document.createElement('div');
        card.id = `suggestion-${id}`;
        card.className = 'suggestion-card bg-white p-4 rounded-lg border flex items-center justify-between';
        card.innerHTML = `
            <div>
                <h4 class="font-semibold text-md">${title}</h4>
                <p class="text-sm text-slate-600">${description}</p>
            </div>
            <button class="apply-suggestion-btn bg-blue-500 text-white text-sm font-semibold py-2 px-3 rounded-md hover:bg-blue-600" data-suggestion-id="${id}" data-column="${column || ''}">${buttonText}</button>
        `;
        cleaningSuggestions.appendChild(card);
    }

    document.body.addEventListener('click', e => {
        if (e.target.classList.contains('apply-suggestion-btn')) {
            const suggestionId = e.target.dataset.suggestionId;
            const column = e.target.dataset.column;
            applySuggestion(suggestionId, column);
        }
        if (e.target.classList.contains('view-column-btn')) {
            const column = e.target.dataset.column;
            showColumnModal(column);
        }
    });

    autoCleanBtn.addEventListener('click', () => {
        const allSuggestionButtons = document.querySelectorAll('.apply-suggestion-btn:not(:disabled)');
        if(allSuggestionButtons.length === 0) return;

        pushStateToHistory('Applied Auto-Clean', Array.from(allSuggestionButtons).map(b => b.dataset.suggestionId));

        allSuggestionButtons.forEach(btn => {
             if (!btn.disabled) {
                const suggestionId = btn.dataset.suggestionId;
                const column = btn.dataset.column;
                // We skip pushing to history here because we did it once for the whole batch.
                applySuggestion(suggestionId, column, false);
            }
        });
    });

    function markSuggestionAsDone(suggestionId, button) {
        const card = document.getElementById(`suggestion-${suggestionId}`);
        button.textContent = 'Applied';
        button.disabled = true;
        button.classList.remove('bg-blue-500', 'hover:bg-blue-600');
        button.classList.add('bg-green-600', 'cursor-not-allowed');
        card.classList.add('bg-green-50');
        appliedSuggestions.add(suggestionId);
    }

    function applySuggestion(id, column, addToHistory = true) {
         if(appliedSuggestions.has(id)) return;

        if (addToHistory) {
            const button = document.querySelector(`[data-suggestion-id="${id}"]`);
            const card = button.closest('.suggestion-card');
            const title = card.querySelector('h4').textContent;
            pushStateToHistory(title, id);
        }

        if (id === 'remove-duplicates') {
            const uniqueData = [];
            const seen = new Set();
            for (const row of processedData) {
                const rowString = JSON.stringify(row);
                if (!seen.has(rowString)) {
                    uniqueData.push(row);
                    seen.add(rowString);
                }
            }
            processedData = uniqueData;
        } else if (id.startsWith('fill-missing-')) {
             const fullValues = processedData.map(r => r[column]);
             const nonEmptyFullValues = fullValues.filter(v => v !== null && v !== undefined && v !== '');
             const isNumeric = nonEmptyFullValues.every(v => v === '' || !isNaN(Number(v)));

            if(isNumeric){
                const sum = nonEmptyFullValues.reduce((acc, val) => acc + Number(val), 0);
                const mean = nonEmptyFullValues.length > 0 ? (sum / nonEmptyFullValues.length) : 0;
                processedData.forEach(row => {
                    if (row[column] === null || row[column] === undefined || row[column] === '') {
                        row[column] = mean.toFixed(2);
                    }
                });
            } else { // For Text or Mixed, use mode
                const counts = {};
                let maxCount = 0;
                let mode = '';
                nonEmptyFullValues.forEach(val => {
                     if(val){
                        counts[val] = (counts[val] || 0) + 1;
                        if(counts[val] > maxCount){
                            maxCount = counts[val];
                            mode = val;
                        }
                     }
                });
                processedData.forEach(row => {
                    if (row[column] === null || row[column] === undefined || row[column] === '') {
                        row[column] = mode;
                    }
                });
            }
        } else if (id.startsWith('trim-whitespace-')) {
            processedData.forEach(row => {
                if(typeof row[column] === 'string') {
                    row[column] = row[column].trim();
                }
            });
        }
        
        refreshDisplay();

        const buttonToMark = document.querySelector(`[data-suggestion-id="${id}"]`);
        if(buttonToMark) {
            markSuggestionAsDone(id, buttonToMark);
        }
    }
    
    downloadBtn.addEventListener('click', () => {
        const dataToDownload = getFilteredData();
        const format = downloadFormatSelect.value;
        
        let blob;
        let fileExtension;
        
        if (format === 'csv') {
            const csv = Papa.unparse(dataToDownload);
            blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            fileExtension = 'csv';
        } else if (format === 'json') {
            const json = JSON.stringify(dataToDownload, null, 2);
            blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
            fileExtension = 'json';
        } else if (format === 'xlsx') {
            const worksheet = XLSX.utils.json_to_sheet(dataToDownload);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'CleanedData');
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            blob = new Blob([excelBuffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
            fileExtension = 'xlsx';
        }

        if (blob) {
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            const cleanedFilename = originalFilename.replace(/\.[^/.]+$/, "") + `_cleaned.${fileExtension}`;
            link.setAttribute('download', cleanedFilename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    });

    function pushStateToHistory(message, suggestionIdOrIds) {
        historyStack.push(JSON.parse(JSON.stringify(processedData)));
        actionHistory.push({ message, ids: Array.isArray(suggestionIdOrIds) ? suggestionIdOrIds : [suggestionIdOrIds] });
        renderHistory();
    }

    function renderHistory() {
        historyList.innerHTML = '';
        if (actionHistory.length === 0) {
            historyList.innerHTML = '<li class="text-slate-500 italic">No actions taken yet.</li>';
            undoBtn.disabled = true;
        } else {
            actionHistory.forEach(action => {
                const li = document.createElement('li');
                li.className = 'bg-slate-100 p-2 rounded-md';
                li.textContent = action.message;
                historyList.appendChild(li);
            });
            undoBtn.disabled = false;
        }
        historyList.scrollTop = historyList.scrollHeight;
    }
    
    undoBtn.addEventListener('click', () => {
        if (historyStack.length === 0) return;
        
        processedData = historyStack.pop();
        const lastAction = actionHistory.pop();

        lastAction.ids.forEach(id => {
            appliedSuggestions.delete(id);
            resetSuggestionCardUI(id);
        });

        renderHistory();
        refreshDisplay();
    });
    
    function resetSuggestionCardUI(suggestionId) {
        const card = document.getElementById(`suggestion-${suggestionId}`);
        if (!card) return;
        const button = card.querySelector('.apply-suggestion-btn');
        
        button.disabled = false;
        
        // Regenerate original button text more reliably
        if (suggestionId === 'remove-duplicates') {
            const uniqueRows = new Set(processedData.map(row => JSON.stringify(row)));
            const duplicateRowCount = processedData.length - uniqueRows.size;
            button.textContent = `Remove ${duplicateRowCount} duplicates`;
        } else if (suggestionId.startsWith('fill-missing-')) {
            button.textContent = 'Fill Missing Values';
        } else if (suggestionId.startsWith('trim-whitespace-')) {
            button.textContent = 'Trim Whitespace';
        }

        button.classList.add('bg-blue-500', 'hover:bg-blue-600');
        button.classList.remove('bg-green-600', 'cursor-not-allowed');
        card.classList.remove('bg-green-50');
    }

    function showColumnModal(column) {
        modalTitle.textContent = `Values for "${column}"`;
        const values = qualityMetrics[column].values;
        const uniqueValues = [...new Set(values)];
        
        let content = `<p class="mb-2 text-sm text-slate-600">Showing ${uniqueValues.length} unique values out of ${values.length} total rows.</p>`;
        content += '<ul class="divide-y divide-slate-200 bg-slate-50 p-2 rounded-md max-h-64 overflow-y-auto">';
        uniqueValues.slice(0, 200).forEach(v => {
            content += `<li class="p-1.5 text-sm">${v === '' || v === null || v === undefined ? '<em>(empty)</em>' : v}</li>`;
        });
        content += '</ul>';

         if(uniqueValues.length > 200) {
            content += `<p class="mt-2 text-xs text-slate-500">Preview is limited to the first 200 unique values.</p>`;
        }
        
        modalContent.innerHTML = content;
        columnModal.classList.remove('hidden');
    }

    closeModalBtn.addEventListener('click', () => {
        columnModal.classList.add('hidden');
    });

    window.addEventListener('click', (event) => {
        if (event.target == columnModal) {
            columnModal.classList.add('hidden');
        }
    });

    // --- FUNCTIONS FOR FILTERING ---
    function detectAndPopulateDateColumns() {
        dateColumnSelect.innerHTML = '<option value="">-- Select a column --</option>';
        const dateRegex = /date|year|time|dt/i;
        const potentialDateColumns = headers.filter(h => {
            if (dateRegex.test(h)) return true;
            let dateLikeCount = 0;
            for (let i = 0; i < Math.min(10, originalData.length); i++) {
                const val = originalData[i][h];
                if (typeof val === 'number' && val > 10000 && val < 60000) {
                     dateLikeCount++;
                     continue;
                }
                if (val && !isNaN(new Date(val).getTime())) {
                    dateLikeCount++;
                }
            }
            return dateLikeCount > 5;
        });
        
        potentialDateColumns.forEach(header => {
            const option = document.createElement('option');
            option.value = header;
            option.textContent = header;
            dateColumnSelect.appendChild(option);
        });
    }

    function applyFilter() {
        const column = dateColumnSelect.value;
        const start = startDateInput.value;
        const end = endDateInput.value;

        if (!column || !start || !end) {
            const statusEl = document.getElementById('filter-status');
            statusEl.textContent = "Please select a column, a start date, and an end date.";
            statusEl.classList.add('text-red-500');
            setTimeout(() => {
                statusEl.textContent = "";
                statusEl.classList.remove('text-red-500');
            }, 3000);
            return;
        }
        
        activeFilter = { column, start, end };
        clearFilterBtn.classList.remove('hidden');
        refreshDisplay();
        updateStepUI(4, 'done');
    }

    function clearFilter() {
        activeFilter = null;
        dateColumnSelect.value = '';
        startDateInput.value = '';
        endDateInput.value = '';
        clearFilterBtn.classList.add('hidden');
        if(processedData.length > 0) {
            refreshDisplay();
        }
        filterStatus.textContent = '';
        if(headers.length > 0) updateStepUI(4, 'active');
    }

    function updateFilterStatus(filteredRowCount) {
        if (activeFilter) {
            filterStatus.textContent = `Showing ${filteredRowCount} of ${processedData.length} rows.`;
        } else {
            filterStatus.textContent = '';
        }
    }

    applyFilterBtn.addEventListener('click', applyFilter);
    clearFilterBtn.addEventListener('click', clearFilter);


    // Init
    updateStepUI(1, 'active');
    updateStepUI(2, 'inactive');
    updateStepUI(3, 'inactive');
    updateStepUI(4, 'inactive');
    updateStepUI(5, 'inactive');
});
