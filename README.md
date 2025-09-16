**Data Processing Assistant**

**Introduction**

The AI Data Processing Assistant is a powerful, browser-based tool designed to dramatically speed up the most common and time-consuming tasks in data preparation. Built with vanilla JavaScript, HTML, and CSS, this intelligent assistant helps users clean, filter, and prepare datasets from various formats in seconds, turning raw data into analysis-ready information with an intuitive, step-by-step interface.

This project was developed to address the universal "first mile" problem in data analysis: inspecting, cleaning, and formatting data before any meaningful insights can be drawn.

**Features**

Multi-Format Data Upload: Seamlessly upload files in CSV, TSV, JSON, XLSX, and XLS formats using a simple drag-and-drop interface.

Instant Data Preview: Immediately view the first 10 rows of your dataset to ensure the correct file has been loaded.

Automated Data Quality Report: The assistant automatically analyzes each column to generate a report on data types, missing value percentages, and unique value counts.

AI-Powered Cleaning Suggestions: Based on the quality report, the tool intelligently suggests actions like removing duplicates, filling missing values, and trimming whitespace.

One-Click Auto-Clean: Apply all recommended cleaning suggestions with a single click to save time.

Advanced Interactive Filtering: Build complex queries using a multi-condition filtering system. Filter by text, numeric ranges, and date periods simultaneously to isolate the exact data you need.

Versatile Download Options: Download the cleaned and filtered data in your choice of CSV, JSON, or Excel (.xlsx) format.

Custom Filename: Specify a custom filename for your cleaned dataset before downloading.

Action History with Undo: Keep track of every cleaning action applied and revert the last action with a single click, providing a safe and non-destructive workflow.

**How to Use**

To run the project, ensure all three files are in the same directory:

ai_data_assistant.html

style.css

script.js

Then, simply open the ai_data_assistant.html file in any modern web browser.

The workflow is as follows:

Upload: Drag and drop or select your data file.

Review: Examine the automatically generated Data Quality Report.

Clean: Apply the AI's cleaning suggestions individually or all at once.

Filter: Add one or more filter conditions to refine your data.

Download: Choose a filename and format, then download your clean dataset.

**Technologies Used**

Frontend: HTML5, CSS3, JavaScript (ES6+)

Styling: Tailwind CSS

**File Parsing:**

PapaParse for CSV and TSV files.

SheetJS (xlsx) for Excel files.

**File Structure**

The project is organized into three main files for clear separation of concerns:

ai_data_assistant.html: Contains the HTML structure and layout of the web application.

style.css: Contains custom CSS rules to complement the Tailwind CSS framework.

script.js: Contains all the JavaScript logic for file handling, data processing, UI manipulation, and interactivity.
