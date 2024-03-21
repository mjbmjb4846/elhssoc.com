// SCRIPT INIT -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

class Init extends HTMLElement {
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

        let scripts = this.getAttribute('scripts').split(' ');

        // If the scripts attribute is left blank, load all scripts in the predefined list
        if (scripts.length === 1 && scripts[0] === "") {
            scripts = predefinedScripts;
        }

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

function getVW(percent = 100) {
    //Find the CSS property for Viewport Width (vw):

    return window.innerWidth * (percent / 100);
}

function getVH(percent = 100) {
    //Find the CSS property for Viewport Height (vh):

    return window.innerHeight * (percent / 100);
}

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