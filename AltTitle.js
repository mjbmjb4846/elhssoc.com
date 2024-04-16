class AltTitle extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const color = this.getAttribute('color') || 'var(--white)';
        const textColor = this.getAttribute('text-color') || 'var(--text)';
        const format = this.getAttribute('format') || 'center';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    position: relative;
                    text-align: ${format};
                    align-items: center;
                    justify-content: ${format};
                    padding: 0 40px;
                    color: ${textColor};
                    font-weight: bold;
                    font-size: var(--medium-text);
                    width: calc(100% - 80px);
                    background-color: ${color};
                }
                .alt-title-text {
                    display: inline-block;
                }
            </style>
            <div class="alt-title-text"><slot></slot></div>
        `;
    }
}

customElements.define('m-alt-title', AltTitle);
