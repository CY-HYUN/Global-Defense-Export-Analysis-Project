import os

def fix_map_files(directory):
    count = 0
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".html"):
                filepath = os.path.join(root, file)
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    if '"noWrap": false' in content:
                        new_content = content.replace('"noWrap": false', '"noWrap": true')
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        count += 1
                        print(f"Fixed: {file}")
                except Exception as e:
                    print(f"Error processing {file}: {e}")
    print(f"Total files fixed: {count}")

if __name__ == "__main__":
    target_dir = r"d:\Study\Github\Global Defense Export Analysis Project\html\map"
    fix_map_files(target_dir)
