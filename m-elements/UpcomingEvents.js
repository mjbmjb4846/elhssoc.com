class UpcomingEvents extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const types = this.getAttribute('types') ? this.getAttribute('types').split(' ') : [];
        const events = await this.fetchEvents();
        const upcomingEvents = this.filterEvents(events, types);

        this.render(upcomingEvents);
    }

    async fetchEvents() {
        try {
            const response = await fetch('./schedule.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const now = new Date();
            const upcomingEvents = data.filter(event => {
                const eventEndDate = new Date(event.end);
                const isUpcoming = eventEndDate >= now;
                const isVisible = !event.hide;
                return isUpcoming && isVisible;
            });
            return upcomingEvents;
        } catch (error) {
            console.error('Error fetching events:', error);
            return [];
        }
    }

    filterEvents(events, types) {
        if (types.length === 0) return events;
        const filteredEvents = events.filter(event => event.type && types.includes(event.type));
        return filteredEvents;
    }

    render(events) {
        const container = document.createElement('div');
        container.setAttribute('class', 'events-container');

        events.forEach(event => {
            const eventElement = this.createEventElement(event);
            container.appendChild(eventElement);
        });

        this.shadowRoot.appendChild(container);
    }

    createEventElement(event) {
        const eventElement = document.createElement('div');
        eventElement.setAttribute('class', 'event');
    
        let whoElement = '';
        let costElement = '';
        let prepareElement = '';
        let linkElement = '';
        let col = event.color || "var(--color-light-gray)";
    
        if (event.who) {
            whoElement = `<m-text format="center"><strong>Who:</strong> ${event.who}</m-text>`;
        }
    
        if (event.cost) {
            costElement = `<m-text format="center"><strong>Cost:</strong> ${event.cost}</m-text>`;
        }
    
        if (event.prepare) {
            prepareElement = `<m-text format="center"><strong>What to Prepare:</strong> ${event.prepare}</m-text>`;
        }
    
        if (event.link) {
            linkElement = `<m-text format="center"><strong>Link:</strong> <a style="color: ${col};" href="${event.link}">${event.link}</a></m-text>`;
        }
    
        eventElement.innerHTML = `
            <m-spacer color="${col}"></m-spacer>
            <m-spacer></m-spacer>
            <m-alt-title>${event.text}</m-alt-title>
            <m-spacer></m-spacer>
            <m-text format="center"><strong>Where:</strong> ${event.location || 'TBD'}</m-text>
            <m-text format="center"><strong>When:</strong> ${event.when || 'TBD'}</m-text>
            ${whoElement}
            ${costElement}
            ${prepareElement}
            ${linkElement}
            <m-spacer></m-spacer>
        `;

        eventElement.style.border = `1px solid ${col}`;
        eventElement.style.borderRadius = '5px';
        eventElement.style.marginBottom = '20px';
        eventElement.style.padding = '10px';

        return eventElement;
    }    
}

customElements.define('m-events', UpcomingEvents);