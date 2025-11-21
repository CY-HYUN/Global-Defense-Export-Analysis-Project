import os

# Base directory
BASE_DIR = r"d:\Study\Github\Global Defense Export Analysis Project\WEB"

# Replacements map
# Old path fragment -> New path fragment
REPLACEMENTS = {
    '/WEB/web-layout/': '/',
    '../../web-layout/': '../',
    '../web-layout/': './',
    'web-layout/': '',
    'href="css/': 'href="/css/',
    'src="js/': 'src="/js/',
    'src="assets/': 'src="/assets/',
    'href="assets/': 'href="/assets/',
    'src="data/': 'src="/assets/data/', # Data moved to assets/data? No, data is in root data/ or assets/data?
    # Let's check where data went. In step 79, we see 'data' and 'assets'.
    # Wait, in step 43 (before move), data was in web-layout/data.
    # In step 79 (after move), we have 'data' and 'assets' in WEB root.
    # But wait, step 54 showed web-layout/assets/data/...
    # So data was inside assets?
    # Let's check step 79 again.
    # {"name":"assets","isDir":true,"numChildren":39}
    # {"name":"data","isDir":true}
    # It seems we have both.
    # If the original code used /WEB/web-layout/data/..., it might refer to the folder 'data' that was in 'web-layout'.
    # If 'web-layout' had 'assets' AND 'data', then now WEB has 'assets' and 'data'.
    # We need to be careful.
}

# We need a more robust replacement strategy.
# 1. Replace absolute paths starting with /WEB/web-layout/ with /
# 2. Replace relative paths that try to go up to web-layout.

def fix_paths(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # 1. Fix absolute paths
        content = content.replace('/WEB/web-layout/', '/')
        
        # 2. Fix specific asset paths if they were relative and broken by move?
        # Actually, since we moved everything from web-layout to WEB, 
        # if a file was at web-layout/index.html and referred to css/style.css,
        # now it is at WEB/index.html and refers to css/style.css (which is at WEB/css/style.css).
        # So relative paths should largely be preserved IF the relative structure inside web-layout was preserved.
        # We moved web-layout/* to WEB/. So structure inside is same.
        # The only broken paths are those that were Absolute (/WEB/web-layout/...) or those that went up (../../).
        
        # Fix CSS imports in HTML
        # content = content.replace('href="css/', 'href="/css/') # This makes it absolute from root, which is safer for nested pages if we serve from WEB root.
        # However, if we open file directly, absolute paths fail.
        # The user said "don't break functionality".
        # If they open index.html directly in browser (file://), absolute paths like /css/style.css will fail (it goes to C:/css/...).
        # We should stick to RELATIVE paths if possible, or assume a server.
        # The user's previous `update_paths.py` seemed to try to fix relative paths.
        # Let's assume we are serving with a local server (python -m http.server) as per README.
        # If so, /css/style.css works if root is WEB.
        
        # Let's stick to absolute paths from server root (/) for simplicity in a web server environment.
        
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Fixed: {file_path}")
            return True
        return False
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def main():
    count = 0
    for root, dirs, files in os.walk(BASE_DIR):
        for file in files:
            if file.endswith(('.html', '.css', '.js')):
                if fix_paths(os.path.join(root, file)):
                    count += 1
    print(f"Total files fixed: {count}")

if __name__ == "__main__":
    main()
