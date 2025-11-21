
export const initUI = () => {
    console.log('Initializing UI...');

    // 1. Sidebar Toggle
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', (event) => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

    // 2. Default Open Dropdown
    const defaultOpenDropdownId = 'collapseResearch';
    const defaultDropdown = document.getElementById(defaultOpenDropdownId);
    if (defaultDropdown) {
        defaultDropdown.classList.remove('show');
        const toggleButton = document.querySelector(`[data-bs-target="#${defaultOpenDropdownId}"]`);
        if (toggleButton) {
            toggleButton.setAttribute('aria-expanded', 'false');
            toggleButton.classList.add('collapsed');
        }
    }

    // 3. Dropdown Menus
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const dropdownBars = document.querySelectorAll('.dropdown-bar');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (event) => {
            event.preventDefault();
            const dropdownId = toggle.getAttribute('data-dropdown');
            const relatedDropdown = document.getElementById(`${dropdownId}-dropdown`);

            // Close others
            dropdownBars.forEach(bar => {
                if (bar !== relatedDropdown) {
                    bar.style.height = '0';
                    bar.classList.remove('open');
                }
            });

            // Toggle current
            if (relatedDropdown.classList.contains('open')) {
                relatedDropdown.style.height = '0';
                relatedDropdown.classList.remove('open');
                toggle.classList.remove('dropdown-open');
            } else {
                relatedDropdown.style.height = relatedDropdown.scrollHeight + 'px';
                relatedDropdown.classList.add('open');
                toggle.classList.add('dropdown-open');
            }
        });
    });

    // Close dropdowns on outside click
    document.addEventListener('click', (event) => {
        if (![...dropdownToggles].some(toggle => toggle.contains(event.target)) &&
            ![...dropdownBars].some(bar => bar.contains(event.target))) {
            
            dropdownBars.forEach(bar => {
                bar.style.height = '0';
                bar.classList.remove('open');
            });
            dropdownToggles.forEach(toggle => {
                toggle.classList.remove('dropdown-open');
            });
        }
    });

    // 4. Search Bar Toggle
    const searchContainer = document.querySelector('.search-container');
    const searchIcon = document.querySelector('.search-icon');
    if (searchContainer && searchIcon) {
        searchIcon.addEventListener('click', (event) => {
            event.preventDefault();
            searchContainer.classList.toggle('active');
        });

        document.addEventListener('click', (event) => {
            if (!searchContainer.contains(event.target) && !searchIcon.contains(event.target)) {
                searchContainer.classList.remove('active');
            }
        });
    }

    // 5. Search Button Enter Key
    const searchButton = document.getElementById('btnNavbarSearch');
    const searchInput = document.querySelector('.form-control');
    if (searchInput && searchButton) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); // Prevent form submission if inside form
                searchButton.click();
            }
        });
    }

    // 6. Slider Logic
    initSlider();
};

const initSlider = () => {
    let currentIndex = 0;
    const prevBtn = document.querySelector('.slider-button.left');
    const nextBtn = document.querySelector('.slider-button.right');
    const slider = document.querySelector('.news-slider');

    if (prevBtn && nextBtn && slider) {
        const slide = (direction) => {
            const totalItems = slider.children.length;
            const visibleItems = 3;

            if (direction === "left" && currentIndex > 0) {
                currentIndex--;
            } else if (direction === "right" && currentIndex < totalItems - visibleItems) {
                currentIndex++;
            }

            slider.style.transform = `translateX(-${currentIndex * (100 / visibleItems)}%)`;
        };

        prevBtn.addEventListener("click", () => slide("left"));
        nextBtn.addEventListener("click", () => slide("right"));
    }
};
