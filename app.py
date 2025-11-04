import streamlit as st
import pandas as pd
import io

# --- App Configuration ---
st.set_page_config(
    page_title="Data Processing Assistant",
    page_icon="🤖",
    layout="wide",
    initial_sidebar_state="expanded",
)

# --- Custom Styling ---
st.markdown("""
    <style>
    /* Hide the deploy button */
    [data-testid="stDeployButton"] {
        display: none;
    }
    /* General body styling */
    body {
        background-color: #f0f2f6;
    }
    /* Sidebar styling */
    [data-testid="stSidebar"] {
        background-color: #ffffff;
        border-right: 1px solid #e6e6e6;
    }
    /* Container styling */
    .st-emotion-cache-1r4qj8v {
        border-radius: 0.5rem;
        padding: 1rem;
        box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    }
    /* Header styling */
    h1, h2, h3 {
        color: #2c3e50;
    }
    /* Button styling */
    .stButton>button {
        border-radius: 0.5rem;
        border: 1px solid #3498db;
        color: #3498db;
    }
    .stButton>button:hover {
        border-color: #2980b9;
        color: #2980b9;
    }
    div[data-testid="stDownloadButton"] > button {
        background-color: #3498db;
        color: white;
        border-radius: 0.5rem;
    }
    div[data-testid="stDownloadButton"] > button:hover {
        background-color: #2980b9;
        border: 1px solid #2980b9;
    }
    </style>
    """, unsafe_allow_html=True)


# --- Functions for Data Processing ---

def read_file(uploaded_file):
    """Reads an uploaded file into a Pandas DataFrame."""
    try:
        file_extension = uploaded_file.name.split('.')[-1].lower()
        if file_extension == 'csv':
            return pd.read_csv(uploaded_file)
        elif file_extension == 'tsv':
            return pd.read_csv(uploaded_file, sep='\t')
        elif file_extension == 'json':
            return pd.read_json(uploaded_file)
        elif file_extension in ['xlsx', 'xls']:
            return pd.read_excel(uploaded_file)
        else:
            st.error(f"Unsupported file format: .{file_extension}")
            return None
    except Exception as e:
        st.error(f"Error reading file: {e}")
        return None

def get_quality_report(df):
    """Generates a data quality report for a DataFrame."""
    report = {}
    for col in df.columns:
        report[col] = {
            'Data Type': str(df[col].dtype),
            'Missing Values': df[col].isnull().sum(),
            'Missing Percentage': f"{df[col].isnull().sum() / len(df):.2%}",
            'Unique Values': df[col].nunique()
        }
    return report

def get_cleaning_suggestions(df):
    """Generates cleaning suggestions based on the quality report."""
    suggestions = {}
    if df.duplicated().sum() > 0:
        suggestions['remove_duplicates'] = {
            "title": "Remove Duplicates",
            "description": f"Found {df.duplicated().sum()} duplicate rows.",
            "action": lambda d: d.drop_duplicates(inplace=True)
        }
    for col in df.columns:
        if df[col].isnull().sum() > 0:
            suggestions[f'fill_missing_{col}'] = {
                "title": f"Fill Missing in '{col}'",
                "description": f"Column has {df[col].isnull().sum()} missing values.",
                "action": lambda d, c=col: d[c].fillna(d[c].mode()[0] if not pd.api.types.is_numeric_dtype(d[c]) else d[c].mean(), inplace=True)
            }
        if pd.api.types.is_string_dtype(df[col]) and df[col].str.strip().ne(df[col]).any():
             suggestions[f'trim_whitespace_{col}'] = {
                "title": f"Trim Whitespace in '{col}'",
                "description": "Found values with extra whitespace.",
                "action": lambda d, c=col: d.update({c: d[c].str.strip()})
            }
    return suggestions
    
def to_downloadable_format(df, format_type, filename):
    """Converts a DataFrame to a downloadable format."""
    output = io.BytesIO()
    if format_type.lower() == 'csv':
        df.to_csv(output, index=False)
        mime = 'text/csv'
        filename = f"{filename}.csv"
    elif format_type.lower() == 'json':
        df.to_json(output, orient='records', indent=2)
        mime = 'application/json'
        filename = f"{filename}.json"
    elif format_type.lower() == 'excel (xlsx)':
        with pd.ExcelWriter(output, engine='openpyxl') as writer:
            df.to_excel(writer, index=False, sheet_name='CleanedData')
        mime = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        filename = f"{filename}.xlsx"
    
    output.seek(0)
    return output, mime, filename

# --- Streamlit UI ---

# Initialize session state
if 'df' not in st.session_state:
    st.session_state.df = None
    st.session_state.original_filename = None
    st.session_state.history = []
    st.session_state.suggestions = {}
    st.session_state.filters = []


# --- Sidebar ---
with st.sidebar:
    st.sidebar.title("Data Processing Assistant")
    st.sidebar.header("1. Upload Data")
    uploaded_file = st.file_uploader(
        "Upload a CSV, TSV, JSON, or Excel file",
        type=["csv", "tsv", "json", "xlsx", "xls"],
        key="file_uploader"
    )
    
    # Logic to handle new file uploads and prevent reprocessing on every rerun
    if uploaded_file and (st.session_state.original_filename != uploaded_file.name):
        st.session_state.original_filename = uploaded_file.name
        df = read_file(uploaded_file)
        if df is not None:
            st.session_state.original_df = df.copy()
            st.session_state.df = df.copy()
            st.session_state.suggestions = get_cleaning_suggestions(df)
            st.session_state.history = []
            st.session_state.filters = []
            st.rerun()

    if st.session_state.df is not None:
        st.sidebar.header("Action History")
        if st.session_state.history:
            if st.sidebar.button("Undo Last Action", key="undo"):
                action, last_df = st.session_state.history.pop()
                st.session_state.df = last_df
                st.session_state.suggestions = get_cleaning_suggestions(last_df)
                st.rerun()

            for action, _ in reversed(st.session_state.history):
                st.sidebar.info(action)
        else:
            st.sidebar.write("No actions taken yet.")

# --- Main Content ---
st.divider()


if st.session_state.df is not None:
    df_display = st.session_state.df.copy()
    
    with st.container(border=True):
        st.header("🧹 2. AI Cleaning Suggestions")
        if st.session_state.suggestions:
            cols = st.columns(4)
            for i, (key, suggestion) in enumerate(list(st.session_state.suggestions.items())):
                with cols[i % 4]:
                    with st.container(border=True):
                        st.subheader(suggestion['title'])
                        st.write(suggestion['description'])
                        if st.button("Apply", key=f"sug_{key}", type="primary"):
                            df_copy = st.session_state.df.copy()
                            st.session_state.history.append((suggestion['title'], df_copy))
                            suggestion['action'](st.session_state.df)
                            del st.session_state.suggestions[key]
                            st.rerun()
        else:
            st.success("Your data looks clean!")

    with st.container(border=True):
        st.header("🔍 3. Interactive Filtering")
        
        if st.button("Add Filter", key="add_filter"):
            st.session_state.filters.append({'column': None, 'operator': None, 'value': None})

        for i, f in enumerate(st.session_state.filters):
            cols = st.columns([3, 2, 3, 1])
            f['column'] = cols[0].selectbox("Column", df_display.columns, key=f"col_{i}", index=None, placeholder="Select column...")
            
            if f['column']:
                dtype = df_display[f['column']].dtype
                if pd.api.types.is_numeric_dtype(dtype):
                    operators = ['==', '!=', '>', '<', '>=', '<=']
                    f['operator'] = cols[1].selectbox("Operator", operators, key=f"op_{i}")
                    f['value'] = cols[2].number_input("Value", key=f"val_{i}", value=None)
                else:
                    operators = ['equals', 'not equals', 'contains', 'not contains']
                    f['operator'] = cols[1].selectbox("Operator", operators, key=f"op_{i}")
                    f['value'] = cols[2].text_input("Value", key=f"val_{i}")
            
            if cols[3].button("❌", key=f"del_{i}"):
                st.session_state.filters.pop(i)
                st.rerun()
                
        filtered_df = df_display.copy()
        for f in st.session_state.filters:
            if f['column'] and f['operator'] and f['value'] is not None and f['value'] != '':
                col, op, val = f['column'], f['operator'], f['value']
                try:
                    if op == '==': filtered_df = filtered_df[filtered_df[col] == val]
                    elif op == '!=': filtered_df = filtered_df[filtered_df[col] != val]
                    elif op == '>': filtered_df = filtered_df[filtered_df[col] > val]
                    elif op == '<': filtered_df = filtered_df[filtered_df[col] < val]
                    elif op == '>=': filtered_df = filtered_df[filtered_df[col] >= val]
                    elif op == '<=': filtered_df = filtered_df[filtered_df[col] <= val]
                    elif op == 'equals': filtered_df = filtered_df[filtered_df[col] == val]
                    elif op == 'not equals': filtered_df = filtered_df[filtered_df[col] != val]
                    elif op == 'contains': filtered_df = filtered_df[filtered_df[col].astype(str).str.contains(val, case=False)]
                    elif op == 'not contains': filtered_df = filtered_df[~filtered_df[col].astype(str).str.contains(val, case=False)]
                except Exception:
                    st.warning(f"Could not apply filter on '{col}'. Check value type.")
    
    with st.container(border=True):
        st.header("📊 Data Preview")
        st.dataframe(filtered_df, use_container_width=True)
        st.info(f"Showing {len(filtered_df)} of {len(df_display)} rows.")

    with st.container(border=True):
        st.header("💾 4. Download Cleaned Data")
        dl_cols = st.columns(3)
        filename = dl_cols[0].text_input("Filename", value=st.session_state.original_filename.split('.')[0] + "_cleaned")
        format_type = dl_cols[1].selectbox("Format", ["CSV", "JSON", "Excel (XLSX)"])
        
        if filename:
            data_to_download, mime_type, fn = to_downloadable_format(filtered_df, format_type, filename)
            dl_cols[2].download_button(
                label=f"Download as {format_type}",
                data=data_to_download,
                file_name=fn,
                mime=mime_type,
                type="primary"
            )

    with st.expander("Show Data Quality Report"):
        st.dataframe(pd.DataFrame(get_quality_report(filtered_df)), use_container_width=True)
    
else:
    st.info("Upload a data file in the sidebar to get started.")

