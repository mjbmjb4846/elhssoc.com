class TextBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const textColor = this.getAttribute('text-color') || 'var(--black)';
        const color = this.getAttribute('color') || 'var(--white)';
        const format = this.getAttribute('format') || 'left';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    position: relative;
                    text-align: ${format};
                    align-items: baseline;
                    justify-content: ${format};
                    padding: 0 40px;
                    color: ${textColor};
                    font-weight: normal;
                    font-size: var(--normal-text);
                    width: calc(100% - 80px);
                    background-color: ${color};
                }
                .text-box {
                    display: inline-block;
                }
            </style>
            <div class="text-box"><slot></slot></div>
        `;
    }
}

customElements.define('m-text', TextBox);