// MENU INIT -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

/**
 * Creates a Navigation Menu when Called on an HTML Page.
 */
function menuInit() {
    // Calculate the relative path to the root directory
    const currentPath = window.location.pathname;
    const pathDepth = currentPath.split('/').length - 2; // -2 because of leading slash and filename
    const rootPath = pathDepth > 0 ? '../'.repeat(pathDepth) : './';
    
    let menu = document.createElement('div');
    menu.innerHTML = `<nav>
    <ul>
        <li><a href="${rootPath}index.html">Home</a></li>
        <li><a href="${rootPath}about.html">About</a></li>
        <!--<li><a href="${rootPath}new.html">Join Us</a></li>-->
        <li><a href="${rootPath}socials.html">Socials</a></li>
        <li><a href="${rootPath}log.html">Study Log</a></li>
        <li><a href="${rootPath}schedule.html">Calendar</a></li>
        <li><a href="${rootPath}tournaments.html">Tournaments</a></li>
    </ul>
</nav>`;

    const logoLink = document.createElement('a');
    logoLink.href = `${rootPath}index.html`;
    const logoSVG = document.createElement('img');
    if (window.innerWidth > 768) {
        logoSVG.src = `${rootPath}images/logos/soLogo.svg`;
    } else {
        logoSVG.src = `${rootPath}images/logos/soLogoSmall.svg`;
    }
    logoLink.classList.add("logoLink");
    logoSVG.classList.add("logoSVG");

    logoLink.appendChild(logoSVG);
    menu.insertBefore(logoLink, menu.firstChild);

    menu.classList.add('nav-container');

    const listItems = menu.querySelectorAll('li');
    listItems.forEach((item) => {
        item.addEventListener('click', async () => {
            const link = item.querySelector('a');
            if (link) {
                let href = link.getAttribute('href');
                try {
                    // Try fetching the page without the .html extension
                    let response = await fetch(href.replace('.html', ''));
                    if (response.ok) {
                        // If the fetch was successful, update the href
                        href = href.replace('.html', '');
                    }
                } catch (error) {
                    // If the fetch failed, keep the original href
                }
                window.location.href = href;
            }
        });
    });

    document.body.appendChild(menu);    let button = document.createElement('div');
    button.innerHTML = '<ion-icon name="menu"></ion-icon>';
    button.classList.add('nav-open');    button.addEventListener('click', function() {
        menu.classList.toggle('in');
    });

    document.body.appendChild(button);

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.toggle('dark-mode', savedTheme === 'dark');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
    }

    // Create the settings icon
    const settingsIcon = document.createElement('ion-icon');
    settingsIcon.name = 'cog-outline';
    settingsIcon.classList.add('settings-icon');
    settingsIcon.style.position = 'fixed';
    settingsIcon.style.bottom = '10px';
    settingsIcon.style.left = '10px';
    settingsIcon.style.cursor = 'pointer';
    settingsIcon.style.zIndex = '1000';

    // Add event listener to toggle dark and light mode
    settingsIcon.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });    document.body.appendChild(settingsIcon);

    // Auto-generate sitemap at bottom of page
    // Wait for page to load completely before adding sitemap
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createSitemap);
    } else {
        createSitemap();
    }
}

// UTILITIES -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

/**
 * Formats MHTML string for use as HTML.
 *
 * @param {*} input
 * @param {*} preset
 * @returns {*}
 */
function format(input, preset) {
    let output = input;
    if (Array.isArray(preset)){
        if (Array.isArray(preset[0])){
            preset.forEach((set) => {
                output = output.replace(new RegExp(set[0], 'g'), set[1]);
            });
        }
    }
    if (typeof preset === 'string') {
        if (preset === 'html') {
            output = output.replace(/\(\(/g, "<").replace(/\)\)/g, ">").replace(/\'\'/g, '"');
        }
    }
    return output;
}

/**
 * Returns the Available Width of the Screen.
 *
 * @param {number} [percent=100]
 * @returns {number}
 */
function getVW(percent = 100) {
    // Find the CSS property for Viewport Width (vw):
    return window.innerWidth * (percent / 100);
}

/**
 * Returns the Available Height of the Screen.
 *
 * @param {number} [percent=100]
 * @returns {number}
 */
function getVH(percent = 100) {
    // Find the CSS property for Viewport Height (vh):
    return window.innerHeight * (percent / 100);
}

/**
 * Collects JSON Data from an External JSON File.
 *
 * @async
 * @param {*} file
 * @returns {unknown}
 */
async function readJson(file) {
    try {
        const response = await fetch(file);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('The file did not fetch: ', error);
    }
}

/**
 * Returns the Opposite Hex Color to the Input Hex Color.
 *
 * @param {*} hex
 * @returns {*}
 */
function oppHex(hex) {
    // Compute the opposite hex code
    let map = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    let chars = hex.toUpperCase().split('');

    // Compute to Base 16
    for (let i = 0; i < chars.length; i++) {
        let index = map.indexOf(chars[i]);
        if (index != -1) {
            chars[i] = index;
        }
    }

    // Structure Base 16 Numbers to Opposite Values
    for (let i = 0; i < chars.length; i += 2) {
        chars[i] = 15 - chars[i];
        chars[i + 1] = 15 - chars[i + 1];
    }

    // Convert back to hex
    for (let i = 0; i < chars.length; i++) {
        chars[i] = map[chars[i]];
    }

    return chars.join('');
}

/**
 * Converts HTML Canvas to a PNG Image.
 *
 * @param {*} canvas
 * @param {string} [imageFormat='image/png']
 * @returns {*}
 */
function toImage(canvas, imageFormat = 'image/png') {
    let imageData = canvas.toDataURL(imageFormat);
    let image = new Image();
    image.src = imageData;
    return image;
}

/**
 * Copies Relevant Data to the Clipboard.
 *
 * @param {*} data
 */
function clipboard(data) {
    navigator.clipboard.write(data);
}

/**
 * Waits for a keypress.
 * Executes the input function upon press.
 *
 * @param {*} key
 */
function onPress(key, func) {
    window.addEventListener('keydown', function(event) {
        if (event.key === key) {
            func();
        }
    });
}


// SITEMAP GENERATION -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

/**
 * Creates a comprehensive sitemap at the bottom of the page
 */
function createSitemap() {
    // Calculate the relative path to the root directory
    const currentPath = window.location.pathname;
    const pathDepth = currentPath.split('/').length - 2;
    const rootPath = pathDepth > 0 ? '../'.repeat(pathDepth) : './';
    
    // Define the sitemap structure
    const sitemapData = {
        'Main Pages': [
            { name: 'Home', url: `${rootPath}index.html`, icon: 'home-outline' },
            { name: 'About Us', url: `${rootPath}about.html`, icon: 'people-outline' },
            { name: 'Socials', url: `${rootPath}socials.html`, icon: 'camera-outline' },
            { name: 'Study Log', url: `${rootPath}log.html`, icon: 'book-outline' },
            { name: 'Calendar', url: `${rootPath}schedule.html`, icon: 'calendar-outline' },
            { name: 'Tournaments', url: `${rootPath}tournaments.html`, icon: 'trophy-outline' }
        ],
        'Special Pages': [
            { name: 'New Members', url: `${rootPath}new.html`, icon: 'person-add-outline' },
            { name: 'Google Drive', url: `https://drive.elhssoc.com`, icon: 'logo-google' },
            { name: 'Team Discord', url: `https://discord.elhssoc.com`, icon: 'logo-discord' },
            { name: 'Club Bylaws', url: `${rootPath}/files/bylaws.pdf`, icon: 'document-text-outline' },
            { name: '2027 Rules', url: `https://www.soinc.org/form/2027-rules-c`, icon: 'document-outline' }
        ],
        'Tournament Pages': [
            { name: 'Hawk and Hornet', url: `${rootPath}tournaments_/hawkandhornet.html`, icon: 'leaf-outline' },
            { name: 'Haslett', url: `${rootPath}tournaments_/haslett.html`, icon: 'flag-outline' },
            { name: 'University of Michigan', url: `${rootPath}tournaments_/uofm.html`, icon: 'school-outline' },
            { name: 'Regionals', url: `${rootPath}tournaments_/regionals.html`, icon: 'medal-outline' },
            { name: 'States', url: `${rootPath}tournaments_/stetes.html`, icon: 'star-outline' },
            { name: 'Nationals', url: `${rootPath}tournaments_/nationals.html`, icon: 'trophy' }
        ],
        'Development Features': [
            { name: 'Games Hub', url: `${rootPath}beta/games.html`, icon: 'game-controller-outline' },
            { name: 'Protein Game', url: `${rootPath}beta/protein.html`, icon: 'fitness-outline' },
            { name: 'Golf Game', url: `${rootPath}beta/ballGame.html`, icon: 'planet-outline' },
            { name: 'Catch Game', url: `${rootPath}beta/catchGame.html`, icon: 'ellipse-outline' },
            { name: 'Clicker Game', url: `${rootPath}beta/clickerGame.html`, icon: 'bug-outline' }
        ],
    };

    // Create the sitemap container
    const sitemap = document.createElement('footer');
    sitemap.classList.add('sitemap-footer');
    
    sitemap.innerHTML = `
        <div class="sitemap-container">
            <div class="sitemap-header">
                <h3>Site Navigation</h3>
            </div>
            <div class="sitemap-grid">
                ${Object.entries(sitemapData).map(([category, pages]) => `
                    <div class="sitemap-section">
                        <h4>${category}</h4>
                        <ul class="sitemap-links">
                            ${pages.map(page => `
                                <li>
                                    <a href="${page.url}" class="sitemap-link">
                                        <ion-icon name="${page.icon}"></ion-icon>
                                        <span>${page.name}</span>
                                    </a>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
            <div class="sitemap-footer-info">
                <div class="footer-logo">
                    <img src="${rootPath}images/logos/soLogoSmall.svg" alt="ELHSSOC Logo" class="footer-logo-img">
                </div>
                <div class="footer-text">
                    <p>&copy; ${new Date().getFullYear()} East Lansing High School Science Olympiad</p>
                    <p>Meeting Fridays 2:45-4:00 PM in the ELHS Media Center</p>
                </div>
            </div>
        </div>
    `;    // Add CSS styles
    const sitemapStyles = document.createElement('style');
    sitemapStyles.textContent = `
        .sitemap-header {
            color: rgba(255, 255, 255, 0.9);
        }

        .sitemap-footer {
            background: linear-gradient(135deg, var(--color-dark), var(--color-medium));
            color: white;
            margin-top: 2rem;
            padding: 1.5rem 1rem 1rem;
            border-top: 2px solid var(--color-light);
            position: relative;
            z-index: 1;
        }

        .sitemap-container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .sitemap-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 1.5rem;
        }

        .sitemap-section {
            background: rgba(255, 255, 255, 0.03);
            padding: 0.8rem;
            border-radius: 6px;
            border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .sitemap-section h4 {
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
            color: var(--color-light);
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding-bottom: 0.3rem;
        }

        .sitemap-links {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .sitemap-links li {
            margin-bottom: 0.2rem;
        }

        .sitemap-link {
            display: flex;
            align-items: center;
            text-decoration: none;
            color: #ffffff;
            padding: 0.3rem;
            border-radius: 4px;
            transition: all 0.2s ease;
            font-size: 0.8rem;
        }

        .sitemap-link:hover {
            background: rgba(255, 255, 255, 0.08);
            color: var(--color-light);
        }

        .sitemap-link ion-icon {
            font-size: 0.9rem;
            margin-right: 0.5rem;
            min-width: 16px;
        }

        .sitemap-footer-info {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1.5rem;
            padding-top: 1rem;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            flex-wrap: wrap;
        }

        .footer-logo-img {
            height: 40px;
            width: auto;
            filter: brightness(0) invert(1);
            opacity: 0.9;
        }

        .footer-text {
            text-align: center;
        }

        .footer-text p {
            margin: 0.2rem 0;
            opacity: 0.8;
            font-size: 0.8rem;
        }

        .footer-text p:first-child {
            font-weight: 600;
            font-size: 0.85rem;
        }

        /* Dark mode adjustments */
        body.dark-mode .sitemap-footer {
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            border-top-color: var(--color-light);
        }

        body.dark-mode .sitemap-section {
            background: rgba(255, 255, 255, 0.02);
            border-color: rgba(255, 255, 255, 0.05);
        }

        body.dark-mode .sitemap-link:hover {
            background: rgba(255, 255, 255, 0.06);
            color: var(--color-light);
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
            .sitemap-footer {
                padding: 1rem 0.5rem;
            }
            
            .sitemap-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 0.8rem;
            }
            
            .sitemap-section {
                padding: 0.6rem;
            }
            
            .sitemap-section h4 {
                font-size: 0.8rem;
            }
            
            .sitemap-link {
                font-size: 0.75rem;
                padding: 0.25rem;
            }
            
            .sitemap-link ion-icon {
                font-size: 0.8rem;
            }
            
            .sitemap-footer-info {
                flex-direction: column;
                gap: 0.8rem;
            }
            
            .footer-logo-img {
                height: 35px;
            }
        }
    `;

    // Add styles to head if not already present
    if (!document.querySelector('#sitemap-styles')) {
        sitemapStyles.id = 'sitemap-styles';
        document.head.appendChild(sitemapStyles);
    }

    // Add sitemap to the bottom of the page
    document.body.appendChild(sitemap);

    // Add click handlers for smooth navigation
    const sitemapLinks = sitemap.querySelectorAll('.sitemap-link');
    sitemapLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            
            try {
                // Try fetching the page without .html extension first
                let testUrl = href.replace('.html', '');
                let response = await fetch(testUrl);
                if (response.ok) {
                    window.location.href = testUrl;
                } else {
                    window.location.href = href;
                }
            } catch (error) {
                window.location.href = href;
            }
        });
    });
}