// Function to apply dark mode based on localStorage
function applyDarkMode() {
    const themeSwitcher = document.querySelector(".theme-switch__checkbox");
    const savedTheme = localStorage.getItem("theme");

    // Check saved theme and apply
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        if (themeSwitcher) {
            themeSwitcher.checked = true; // Set checkbox to checked
        }
    } else {
        document.body.classList.remove("dark-mode");
        if (themeSwitcher) {
            themeSwitcher.checked = false; // Set checkbox to unchecked
        }
    }
}

// Function to load header and footer
document.addEventListener("DOMContentLoaded", function () {
    // Apply dark mode initially
    applyDarkMode();

    // Function to fetch and inject HTML content
    function fetchAndInsertHTML(url, containerId, callback) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                console.log(`${url} content fetched:`, data); // Log fetched content
                document.getElementById(containerId).innerHTML = data;
                if (callback) callback(); // Execute callback if provided
                console.log(`${url} content inserted into #${containerId}.`);
            })
            .catch(error => {
                console.error(`There was a problem fetching ${url}:`, error);
            });
    }

    // Fetch and insert header
    fetchAndInsertHTML("header.html", "header-container", () => {
        setupHamburgerMenu();
        setupThemeSwitcher();
    });

    // Fetch and insert footer
    fetchAndInsertHTML("footer1.html", "footer-photo-container");

    // Fetch and insert sidebar
    fetchAndInsertHTML("footer2.html", "footer-info-adress");

    // Fetch and insert main content
    fetchAndInsertHTML("footer3.html", "footer-container2");

    fetchAndInsertHTML("footer4.html", "footer-info-contact");
});

// Function to set up the theme switcher
function setupThemeSwitcher() {
    const themeSwitcher = document.querySelector(".theme-switch__checkbox");

    // Check and set the initial state of the theme switcher
    if (themeSwitcher) {
        themeSwitcher.addEventListener("change", () => {
            if (themeSwitcher.checked) {
                document.body.classList.add("dark-mode");
                localStorage.setItem("theme", "dark");
            } else {
                document.body.classList.remove("dark-mode");
                localStorage.setItem("theme", "light");
            }
        });

        // Set the checkbox state based on localStorage
        const savedTheme = localStorage.getItem("theme");
        themeSwitcher.checked = savedTheme === "dark"; // Ensure checkbox reflects the saved theme
    } else {
        console.error("Theme switcher not found");
    }
}

// Function to set up the hamburger menu functionality
function setupHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navPanel = document.getElementById('nav-panel');

    if (hamburger && navPanel) {
        // Toggle menu on hamburger click
        hamburger.addEventListener('click', (event) => {
            navPanel.classList.toggle('active');
            hamburger.classList.toggle('active');
            event.stopPropagation(); // Prevent event from bubbling up
        });

        // Close menu when clicking outside of the menu and hamburger
        document.addEventListener('click', (event) => {
            const isClickInsideMenu = navPanel.contains(event.target);
            const isClickInsideHamburger = hamburger.contains(event.target);
            
            // If the click is outside the menu and hamburger, close the menu
            if (!isClickInsideMenu && !isClickInsideHamburger) {
                navPanel.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    } else {
        console.error("Hamburger or Nav Panel not found");
    }
}





function toggleDescription(tile)  //ROZSZERZANIE OFERTY
{
    const isExpanded = tile.classList.contains('expanded');
    const description = tile.querySelector('.tile-description');

    // Usunięcie stanu "expanded" z wszystkich kafelków w tej kolumnie
    const columnTiles = tile.parentElement.querySelectorAll('.tile');
    columnTiles.forEach(t => {
        t.classList.remove('expanded');
        t.querySelector('.tile-description').style.maxHeight = '0'; // Resetujemy max-height
    });

    // Dodanie stanu "expanded" tylko do klikniętego kafelka
    if (!isExpanded) {
        tile.classList.add('expanded');
        description.style.maxHeight = description.scrollHeight + 'px'; // Ustalamy wysokość na podstawie zawartości
    }
}

//USUWANIE WISZĄCYCH ZNAKÓW
document.addEventListener("DOMContentLoaded", function () {
    function avoidHangingWords(selector) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            let text = element.innerHTML;

            // Zamiana " i ", " w ", " z " na niełamliwą spację
            text = text.replace(/\b([iIwWzZ])\s+/g, '$1&nbsp;');

            element.innerHTML = text;
        });
    }

    // Zastosowanie dla elementów z określonym selektorem (np. akapity, nagłówki)
    avoidHangingWords("p, h1, h2, h3, h4, h5, h6");
});