Data Processing Assistant

Introduction

This repository contains two complete implementations of an interactive data cleaning and processing tool. This project tackles the universal "first mile" problem in data analysis: the tedious, time-consuming, and error-prone process of inspecting, cleaning, and formatting raw data before any meaningful insights can be drawn.

To explore different solutions to this problem, the assistant was built using two different technology stacks:

A modern Python-based stack (Streamlit, Pandas)

Traditional client-side Web Technologies (HTML, CSS, JavaScript)

This repository serves as a practical case study comparing the two approaches, their development trade-offs, and their final performance.

🚀 Features

Both versions of the application include the following core features:

Multi-Format Data Upload: Seamlessly upload files in .csv, .tsv, .json, and Excel (.xlsx, .xls) formats using a simple drag-and-drop interface.

Instant Data Preview: Immediately view the first 10 rows of your dataset in a clean, scrollable table to ensure the correct file has been loaded and parsed.

Automated Data Quality Report: The assistant automatically analyzes each column to generate a report on:

Data Type: (e.g., Numeric, Text, Mixed)

Missing Values: The total count and percentage of empty cells.

Unique Values: The count of unique data points in the column.

AI-Powered Cleaning Suggestions: Based on the quality report, the tool intelligently identifies common issues and suggests one-click actions:

Remove Duplicates: Find and remove all duplicate rows.

Fill Missing Values: Fill empty cells using the mean (for numeric columns) or the mode (for text columns).

Trim Whitespace: Clean text data by removing extra spaces from the beginning or end of strings.

Advanced Interactive Filtering: A powerful UI to build complex queries. Users can add multiple filter conditions (e.g., Age > 30, City == 'New Delhi') to drill down and isolate the exact data they need.

Action History & Undo: Provides a safe, non-destructive workflow by logging every cleaning action. A single click on the "Undo" button will revert the last change made to the dataset.

Versatile Download Options: Download the final cleaned and filtered data in your choice of .csv, .json, or Excel (.xlsx) format.

Custom Filename: Specify a custom filename for your cleaned dataset before downloading.

💻 Technology Stacks

This project compares two distinct technology stacks for achieving the same goal.

Version 1: Python, Streamlit & Pandas (app.py)

This version leverages a modern, Python-based stack to create a data-centric web application with minimal front-end code. It is ideal for rapid prototyping and internal tool development.

Core Language: Python

The entire application logic, from file handling to data manipulation, is written in Python.

Web Framework: Streamlit

Streamlit is the framework used to build the entire interactive user interface (buttons, file uploaders, data tables, etc.) using only Python code. It handles the web server and front-end generation automatically.

Data Manipulation: Pandas

The popular Pandas library is the engine behind all data processing. Its powerful DataFrame structures are used for reading, cleaning, filtering, and writing all supported file formats.

Styling: HTML & CSS (Injected)

Custom HTML and CSS are injected directly into the Streamlit application to customize the UI and hide default elements.

Version 2: Web Technologies (iindex.html, style.css, script.js)

This version is a classic, client-side web application that runs entirely in the user's browser, requiring no server backend. It offers granular control over the UI and a lightweight user experience.

Structure: HTML5

Provides the core semantic structure for all UI elements, sections, and input fields.

Styling: CSS3 & Tailwind CSS

The UI is styled using Tailwind CSS (loaded via CDN) for a modern, responsive, and utility-first design.

style.css provides additional custom CSS rules for specific components and animations.

Core Logic: JavaScript (ES6+)

script.js contains all the application logic, including DOM manipulation, UI interactivity, state management (for history and undo), and data cleaning functions.

Data Parsing Libraries:

PapaParse: A powerful in-browser CSV parser used to handle .csv and .tsv files.

SheetJS (xlsx): The industry standard for reading and parsing Microsoft Excel (.xlsx, .xls) files directly in JavaScript.

🏃‍♂️ How to Run This Project

Running the Python (Streamlit) Version

To run this application on your local machine, you will need Python 3 installed.

1. Install the required libraries:

pip install streamlit pandas openpyxl


2. Navigate to the project directory:
Open your terminal and change to the folder where app.py is saved.

# Example:
cd "I:\Project\Data Processing Assistant"


3. Run the Streamlit app:
Use the following command in your terminal. Streamlit will start a local web server and open the app in your browser.

streamlit run app.py


If the streamlit command is not found, use this alternative:

python -m streamlit run app.py


Running the Web (HTML/CSS/JS) Version

This version requires no installation or web server.

Ensure all three files (iindex.html, style.css, script.js) are in the same folder.

Simply open the iindex.html file in any modern web browser (like Chrome, Firefox, or Edge).
