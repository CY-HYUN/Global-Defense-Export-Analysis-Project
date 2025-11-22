import os
import glob

def update_map_files():
    map_dir = r'd:\Study\Github\Global Defense Export Analysis Project\html\map'
    files = glob.glob(os.path.join(map_dir, '*.html'))
    
    count = 0
    for file_path in files:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Target pattern: "minZoom": 0
        # We want to change it to "minZoom": 2
        # And ensure "noWrap": true
        
        new_content = content
        
        # Case 1: "minZoom": 0, "noWrap": false -> "minZoom": 2, "noWrap": true
        if '"minZoom": 0, "noWrap": false' in new_content:
            new_content = new_content.replace('"minZoom": 0, "noWrap": false', '"minZoom": 2, "noWrap": true')
            
        # Case 2: "minZoom": 0, "noWrap": true -> "minZoom": 2, "noWrap": true
        if '"minZoom": 0, "noWrap": true' in new_content:
            new_content = new_content.replace('"minZoom": 0, "noWrap": true', '"minZoom": 2, "noWrap": true')
            
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            count += 1
            print(f"Updated: {os.path.basename(file_path)}")
            
    print(f"Total files updated: {count}")

if __name__ == "__main__":
    update_map_files()
