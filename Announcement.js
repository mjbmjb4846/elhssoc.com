class Announcement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

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
                }
            </style>
            <div class="announcement-text"><slot></slot></div>
        `;
    }
}

customElements.define('m-announcement', Announcement);