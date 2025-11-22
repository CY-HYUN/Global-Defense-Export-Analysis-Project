import os

# Define the root directory and target subdirectories
project_root = r"d:\Study\Github\Global Defense Export Analysis Project"
html_root = os.path.join(project_root, "html")
target_dirs = ["about_project", "analysis", "data"]

def get_relative_path_to_js(file_path):
    # Calculate depth relative to project root
    # We want path to "js/sidebar_loader.js"
    # file_path is like .../html/analysis/file.html
    # js is at .../js/sidebar_loader.js
    
    # Get directory of the file
    file_dir = os.path.dirname(file_path)
    
    # Calculate relative path from file_dir to project_root
    rel_to_root = os.path.relpath(project_root, file_dir)
    
    # Path to js file
    js_path = os.path.join(rel_to_root, "js", "sidebar_loader.js")
    
    # Normalize separators to forward slashes for HTML
    return js_path.replace("\\", "/")

def update_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if script is already there
        if "sidebar_loader.js" in content:
            print(f"Skipping {file_path}: Script already present.")
            return

        # Get relative path
        script_src = get_relative_path_to_js(file_path)
        script_tag = f'<script src="{script_src}"></script>'
        
        # Inject before </body>
        if "</body>" in content:
            new_content = content.replace("</body>", f"    {script_tag}\n    </body>")
        else:
            # If no body tag, append to end (unlikely for valid html but fallback)
            new_content = content + "\n" + script_tag
            
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
            
        print(f"Updated {file_path}")
        
    except Exception as e:
        print(f"Error updating {file_path}: {e}")

def main():
    for target in target_dirs:
        target_path = os.path.join(html_root, target)
        if not os.path.exists(target_path):
            print(f"Directory not found: {target_path}")
            continue
            
        for root, dirs, files in os.walk(target_path):
            for file in files:
                if file.lower().endswith(".html"):
                    file_path = os.path.join(root, file)
                    update_file(file_path)

if __name__ == "__main__":
    main()
