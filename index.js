// SCRIPT INIT -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

/**
 * Menu Initialization Custom HTML Component
 *
 * @class Init
 * @typedef {Init}
 * @extends {HTMLElement}
 */
class Init extends HTMLElement { // Not Supported on Github Pages
    /**
 * Creates Menu Selections
 */
connectedCallback() {
        const predefinedScripts = [
            "spinButton.js",
            "spacer.js",
            "Image.js",
            "Dropdown.js",
            "Title.js",
            "Announcement.js",
            "AltTitle.js",
            "TextBox.js",
            "Download.js",
            "Carousel.js"
        ];

        let scripts = this.getAttribute('scripts');
        scripts = scripts ? scripts.split(' ') : predefinedScripts;

        scripts.forEach(script => {
            let scriptElement = document.createElement('script');
            scriptElement.src = script;
            scriptElement.onerror = () => console.error(`Failed to load script: ${script}`);
            this.appendChild(scriptElement);
        });
    }
}

customElements.define('m-init', Init);

// MENU INIT -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

/**
 * Creates a Navigation Menu when Called on an HTML Page.
 */
function menuInit() {
    // Create the menu in one function command so that it doesn't need to be rewritten on every page:
    let menu = document.createElement('div');
    menu.innerHTML = `<nav>
    <ul>
        <li><a href="./index.html">Home</a></li>
        <li><a href="./about.html">About</a></li>
        <li><a href="./socials.html">Socials</a></li>
        <li><a href="./log.html">Study Log</a></li>
        <li><a href="./schedule.html">Calendar</a></li>
        <li><a href="./tournaments.html">Tournaments</a></li>
    </ul>
</nav>`;

    const logoLink = document.createElement('a');
    logoLink.href = './index.html';
    const logoSVG = document.createElement('img');
    // Set the src attribute based on the viewport width
    if (window.innerWidth > 800) {
        logoSVG.src = './soLogo.svg'; // Use the large logo for wider screens
    } else {
        logoSVG.src = './soLogoSmall.svg'; // Use the small logo for narrower screens
    }
    logoLink.classList.add("logoLink");
    logoSVG.classList.add("logoSVG");

    logoLink.appendChild(logoSVG);
    menu.insertBefore(logoLink, menu.firstChild); // Insert the logo link at the beginning of the menu

    menu.classList.add('nav-container');

    // Add a click event listener to each list item
    const listItems = menu.querySelectorAll('li');
    listItems.forEach((item) => {
        item.addEventListener('click', () => {
            // Handle the click action here (e.g., navigate to the link)
            const link = item.querySelector('a');
            if (link) {
                window.location.href = link.getAttribute('href');
            }
        });
    });

    document.body.appendChild(menu); // Add the menu to the webpage

    // Create a button to show and hide the menu when on a mobile device
    let button = document.createElement('div');
    button.innerHTML = 'Menu';
    button.classList.add('nav-open');

    // Add an event listener to the button to toggle the menu display
    button.addEventListener('click', function() {
        menu.classList.toggle('in');
    });

    document.body.appendChild(button); // Add the button to the webpage
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
        console.log(data);
        return data;
    } catch (error) {
        console.error('The file did not fetch:', error);
    }
}

/**
 * Returns the Opposite Hex Color to the Input Hex Color.
 *
 * @param {*} hex
 * @param {*} returnType
 * @returns {*}
 */
function oppHex(hex, returnType) {
    // Compute the opposite hex code

    let map = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]
    let chars = hex.toUpperCase().split('');
    let startPos = 0;
    // Compute to Base 16
    for (let i = 0; i < chars.length; i ++) {
        if (map.indexOf(chars[i]) != -1) {
            chars[i] = map.indexOf(chars[i]);
        } else {
            startPos = i + 1;
        }
    }
    // Structure Base 16 Numbers to Opposite Values
    for (let i = startPos; i < chars.length; i += 2) {
        chars[i] = 240 - chars[i] * 16;
        chars[i + 1] = 15 - chars[i + 1];
    }
    if (returnType === "rgb") {
        for (let i = chars.length - 2; i >= startPos; i -= 2) {
            chars[i] += chars[i + 1];
            chars.splice(i + 1, 1);
        }
        chars.splice(0, startPos);
    } else {
        for (let i = startPos; i < chars.length; i += 2) {
            chars[i] = map[chars[i] / 16];
            chars[i + 1] = map[chars[i + 1]];
        }
        return chars.join('');
    }
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

// STYLING -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

/*window.onscroll = function() {
    // Whenever the user scrolls (page update), run the following code:

    var container = document.querySelector('.nav-container');
    var element = document.querySelectorAll('nav li'); // Returns list of HTML elements
    var text = document.querySelectorAll('nav a'); // Returns list of HTML elements

    if (window.scrollY > getVH(56) && getVW() > 768) {

        container.style.backgroundColor = 'transparent';
        container.style.borderBottom = '4px solid var(--color-medium)';

        element.forEach(li => { // Cycle the list
            li.style.backgroundColor = 'transparent';
        })
        text.forEach(a => { // Cycle the list
            a.style.color = 'var(--color-dark)';
            a.style.fontWeight = '600';
        })
    } else {

        container.style.backgroundColor = 'var(--color-medium)';
        container.style.borderBottom = 'none';

        element.forEach(li => { // Cycle the list
            li.style.backgroundColor = 'var(--color-medium)';
        })
        text.forEach(a => { // Cycle the list
            a.style.color = 'var(--white)';
            a.style.fontWeight = '100';
        })
    }
}; */