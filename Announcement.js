class Announcement extends HTMLElement {
    /**
     * Creates an instance of Announcement Custom HTML Component.
     *
     * @constructor
     */
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.schedule = [];
        this.loadSchedule();
    }

    /**
     * Loads the schedule.json file.
     */
    async loadSchedule() {
        const response = await fetch('./schedule.json');
        this.schedule = await response.json();
    }

    /**
     * Lifecycle callback that is invoked when the custom element is connected to the document's DOM.
     * It also checks for any scheduled announcements and updates the component accordingly.
     */
    async connectedCallback() {
        await this.loadSchedule();
        this.checkSchedule();
        this.render();
    }

    /**
     * Checks the schedule.json file for any announcements scheduled for the current date.
     * If a scheduled announcement is found, it updates the innerHTML of the component.
     * If not, and there is nothing in the slots, it deletes the element.
     */
    checkSchedule() {
        const currentDate = new Date().toISOString().split('T')[0];
        let isScheduled = false;
        this.schedule.forEach(announcement => {
            if (announcement.start <= currentDate && announcement.end >= currentDate) {
                this.setAttribute('color', announcement.color);
                this.setAttribute('text-color', announcement.textColor);
                this.innerHTML = announcement.text;
                isScheduled = true;
            }
        });
        if (!isScheduled && !this.hasChildNodes()) {
            this.style.display = 'none';
        }
    }

    /**
     * Renders the custom HTML component with the appropriate styles and content.
     * Added padding to the .announcement-text class for vertical spacing.
     */
    render() {
        const color = this.getAttribute('color') || 'var(--color-light)';
        const textColor = this.getAttribute('text-color') || 'var(--text)';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    position: relative;
                    text-align: center;
                    align-items: center;
                    justify-content: center;
                    color: ${textColor};
                    font-weight: bold;
                    height: 8vh;
                    width: 100%;
                    background-color: ${color};
                }
                .announcement-text {
                    display: inline-block;
                    padding: 10px 0; /* Added vertical padding */
                }
            </style>
            <div class="announcement-text"><slot></slot></div>
        `;
    }
}

customElements.define('m-announcement', Announcement);