const template = document.createElement('template');
template.innerHTML = `
    <style>
        .button::-webkit-scrollbar {
            display: none;
        }
        .button {
            display: flex;
            height: 50px;
            width: 100%;
            outline: none;
            background-color: var(--color-light);
            border-radius: 5px;
            font-size: 20px;
            align-items: center;
            text-decoration: none;
            overflow: hidden;
            transition: all 0.1s ease;
        }
        .button .boxText {
            padding-left: 5%;
            padding-top: 2px;
            width: 75%;
            color: var(--google);
            font-family: 'Lato', sans-serif;
            font-weight: 750;
        }
        .button:hover {
            transform: scale(105%);
            filter:brightness(95%);
        }
        .button .boxIcon {
            width: 25%;
            height: inherit;
            color: var(--color-light);
            background-color: var(--google);
            font-size: 150%;
            padding-left: 12%;
            padding-top: 6%;
            line-height: 0;
            clip-path: polygon(30% 0%, 100% 0%, 100% 100%, 70% 100%);
            transform: scale(1.5);
        }

        @media (min-width: 600px) {
            .button .boxIcon {
                 transform: scale(1.75);
            }
        }

        @media (min-width: 900px) {
            .button .boxIcon {
                transform: scale(2);
            }
        }
        
        .button .ionIcon {
            transition: all 0.5s ease-in-out;
        }
        .button:hover .ionIcon {
            transform: rotate(360deg);
        }
    </style>
    <a class="button" target="_blank">
        <span class="boxText"></span>
        <span class="boxIcon">
            <ion-icon class="ionIcon"></ion-icon>
        </span>
    </a>
`;

class SpinButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'}).appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const link = this.getAttribute('link') || "about:blank";
        const color = this.getAttribute('color');
        const ionIcon = this.getAttribute('ionIcon');
        const text = this.getAttribute('text');

        this.shadowRoot.querySelector('.button').href = link;
        this.shadowRoot.querySelector('.boxText').textContent = text;
        this.shadowRoot.querySelector('.ionIcon').name = ionIcon;
        this.shadowRoot.querySelector('.boxText').style.color = color;
        this.shadowRoot.querySelector('.boxIcon').style.backgroundColor = color;
    }
}

customElements.define('m-button', SpinButton);