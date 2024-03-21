class Dropdown extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.shadowRoot.querySelector('.title').addEventListener('click', () => {
            const content = this.shadowRoot.querySelector('.content');
            const arrow = this.shadowRoot.querySelector('.arrow');
            if (content.style.display === 'block') {
                content.style.display = 'none';
                arrow.style.transform = 'rotate(0deg)';
            } else {
                content.style.display = 'block';
                arrow.style.transform = 'rotate(180deg)';
            }
        });

        document.addEventListener('click', (event) => {
            if (!this.contains(event.target)) {
                this.shadowRoot.querySelector('.content').style.display = 'none';
                this.shadowRoot.querySelector('.arrow').style.transform = 'rotate(0deg)';
            }
        });
    }

    static get observedAttributes() {
        return ['position'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'position') {
            this.render();
        }
    }

    render() {
        const align = this.getAttribute('position') || 'center';
    
        let content = this.getAttribute('content');
        if (content) {
            content = content.replace(/\(\(/g, "<").replace(/\)\)/g, ">").replace(/\'\'/g, '"');
        } else {
            content = '<slot></slot>';
        }
    
        this.shadowRoot.innerHTML = `
            <style>
                .title, .content {
                    display: flex;
                    position: relative;
                    text-align: ${align};
                    align-items: center;
                    padding: 30px 40px;
                    justify-content: ${align};
                    color: var(--black);
                    width: calc(100vw - 80px);
                    background-color: ${this.getAttribute('color') || "var(--white)"};
                    cursor: pointer;
                }
                .title {
                    font-weight: bold;
                    font-size: var(--medium-text);
                    user-select: none;
                }
                .content {
                    display: none;
                    overflow: hidden;
                    font-weight: normal;
                    font-size: var(--normal-text);
                    padding-top: 0;
                    user-select: text;
                }
                .arrow {
                    display: inline-block;
                    transition: transform 0.3s ease-in-out;
                }
            </style>
            <div class="title">${this.getAttribute('title') || "TITLE"}&nbsp&nbsp&nbsp<span class="arrow">▽</span></div>
            <div class="content">${content}</div>
        `;
    }    
}

window.customElements.define('m-dropdown', Dropdown);