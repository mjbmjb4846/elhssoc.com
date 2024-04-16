class Title extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const background = this.getAttribute('background');
        const backgroundColor = this.getAttribute('background-color') || 'var(--color-dark)';
        const textColor = this.getAttribute('text-color') || '#ffffff';
        const brightness = this.getAttribute('brightness') || 0.6;
        const height = this.getAttribute('height') || '50vh';
        const x = this.getAttribute('x') || '50%';
        const y = this.getAttribute('y') || '50%';
        const zoom = this.getAttribute('zoom') || '120%';

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
                    font-size: var(--large-text);
                    height: ${height};
                    width: 100%;
                    background-color: ${backgroundColor};
                    background-repeat: no-repeat;
                    background-image: ${background ? `linear-gradient(rgba(0, 0, 0, ${brightness}), rgba(0, 0, 0, ${brightness})), url(${background})` : ''};
                    background-position: ${x} ${y};
                    background-size: ${zoom};
                }
                .title-text {
                    display: inline-block;
                }
                @media screen and (max-width: 480px) {
                    :host {
                        background-size: auto;
                    }
                }
            </style>
            <div class="title-text"><slot></slot></div>
        `;
    }
}

customElements.define('m-title', Title);