class Spacer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['width', 'height', 'color'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .spacer {
                    display: flex;
                    width: ${this.getAttribute('width') || '100%'};
                    height: ${this.getAttribute('height') || '2vh'};
                    background-color: ${this.getAttribute('color') || 'none'};
                }
            </style>
            <div class="spacer"></div>
        `;
    }
}

window.customElements.define('m-spacer', Spacer);
