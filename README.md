# 🤖 Data Processing Assistant

**📖 Introduction**

This repository contains **two complete implementations** of an interactive data cleaning and processing tool. This project tackles the universal **"first mile"** problem in data analysis: the tedious, time-consuming, and error-prone process of inspecting, cleaning, and formatting raw data before any meaningful insights can be drawn.

To explore different solutions to this problem, the assistant was built using two different technology stacks:

**1. A modern Python-based stack** (Streamlit & Pandas)

**2. Traditional client-side Web Technologies** (HTML, CSS, & JavaScript)

This repository serves as a practical case study comparing the two approaches, their development trade-offs, and their final performance.

---

**🚀 Core Features**

No matter which version you choose, you get the same powerful toolkit:

| Feature | Description |
| :--- | :--- |
| 📁 **Multi-Format Upload** | Seamlessly upload files in .csv, .tsv, .json, and Excel (.xlsx, .xls) using a simple drag-and-drop interface. |
| 👀 **Instant Data Preview** | Immediately view the first 10 rows of your dataset in a clean, scrollable table to ensure the correct file has been loaded. |
| 📊 **Automated Quality Report** | Automatically analyzes columns for Data Type, Missing Values (Count/%), and Unique Values. |
| ✨ **AI Cleaning Suggestions** | One-click actions to Remove Duplicates, Fill Missing Values (Mean/Mode), and Trim Whitespace. |
| 🔍 **Interactive Filtering** | Build complex queries (e.g., Age > 30 AND City == 'New Delhi') to isolate exact data points. |
| ↩️ **History & Undo** | Non-destructive workflow logging every action with a one-click Undo button. |
| 💾 **Versatile Export** | Download final cleaned data in .csv, .json, or Excel format with a Custom Filename. |

---

**💻 Technology Stacks**

**Version 1: Python, Streamlit & Pandas** (app.py)

This version creates a data-centric web application with minimal front-end code, ideal for rapid prototyping.

* **Core Logic:** Written entirely in Python using Pandas for heavy-duty data manipulation.

* **UI Framework:** Streamlit handles the interactive elements and web hosting logic.

* **Styling:** Custom HTML & CSS injected to hide default Streamlit elements and enhance branding.

---

**Version 2: Web Technologies** (iindex.html, style.css, script.js)

A classic client-side application running entirely in the browser with no server backend.

* **Structure/Style:** Semantic **HTML5** and **Tailwind CSS** for a modern, responsive UI.

* **Core Logic: JavaScript (ES6+)** handles DOM manipulation, state management, and undo history.

* **Libraries: PapaParse** for CSV handling and **SheetJS (xlsx)** for Excel parsing.

---

**🏃‍♂️ How to Run This Project**

**🐍 Running the Python (Streamlit) Version**

**1. Install Dependencies:**
```
pip install streamlit pandas openpyxl
```

**2. Run the App:**
```
python -m streamlit run app.py
```
---

**🌐 Running the Web (HTML/CSS/JS) Version**

1. Ensure iindex.html, style.css, and script.js are in the same folder.

2. Simply double-click iindex.html to open it in any modern web browser.

---

**🛠️ Roadmap & Future Enhancements**

* **[ ] LLM Integration:** Natural language data queries.

* **[ ] Advanced Visuals:** Interactive histograms and distribution plots.

* **[ ] Batch Processing:** Cleaning multiple files simultaneously.

**Developed with a focus on data integrity and user experience. 📊✨**
