import os
import glob
import re

def update_map_files():
    map_dir = r'd:\Study\Github\Global Defense Export Analysis Project\html\map'
    files = glob.glob(os.path.join(map_dir, '*.html'))
    
    count = 0
    for file_path in files:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = content
        
        # Pattern 1: Folium generated style (already handled, but good to keep)
        # "minZoom": 0, "noWrap": false -> "minZoom": 2, "noWrap": true
        if '"minZoom": 0, "noWrap": false' in new_content:
            new_content = new_content.replace('"minZoom": 0, "noWrap": false', '"minZoom": 2, "noWrap": true')
        
        # Pattern 2: Handle cases where noWrap/minZoom might be missing or different
        # We look for L.tileLayer(..., { ... })
        
        # Regex to find the options object of L.tileLayer
        # It looks for L.tileLayer( "url", { options } )
        # We want to ensure 'noWrap: true' and 'minZoom: 2' are inside the options.
        
        # Simple approach for South_Korea_map.html style:
        # It has `maxZoom: 20,`
        # We can replace `maxZoom: 20,` with `maxZoom: 20, minZoom: 2, noWrap: true,`
        # This is a heuristic but safe for the specific file structure observed.
        
        if 'maxZoom: 20,' in new_content and 'noWrap: true' not in new_content:
             new_content = new_content.replace('maxZoom: 20,', 'maxZoom: 20, minZoom: 2, noWrap: true,')

        # Also handle "maxZoom": 20 (quoted keys) if missed by Pattern 1
        if '"maxZoom": 20' in new_content and '"noWrap": true' not in new_content:
             # If it doesn't have noWrap at all
             new_content = new_content.replace('"maxZoom": 20', '"maxZoom": 20, "minZoom": 2, "noWrap": true')

        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            count += 1
            print(f"Updated: {os.path.basename(file_path)}")
            
    print(f"Total files updated: {count}")

if __name__ == "__main__":
    update_map_files()
