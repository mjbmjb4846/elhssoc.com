// MENU INIT -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

/**
 * Creates a Navigation Menu when Called on an HTML Page.
 */
function menuInit() {
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
    if (window.innerWidth > 768) {
        logoSVG.src = './soLogo.svg';
    } else {
        logoSVG.src = './soLogoSmall.svg';
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

    document.body.appendChild(menu);

    let button = document.createElement('div');
    button.innerHTML = '<ion-icon name="menu"></ion-icon>';
    button.classList.add('nav-open');

    button.addEventListener('click', function() {
        menu.classList.toggle('in');
    });

    document.body.appendChild(button);
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