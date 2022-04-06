class helloWorld extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = "Hello World! Yeay";
    }

    static get observedAttributes() {
        return ["name"];
    }

    attributeChangedCallback(prop, oldVal, newVal) {
        // console.log('attribute changed', prop, oldVal, newVal);
        this.innerHTML = "Hey " + newVal + "!";
    }

    // connectedCallback() {}
}

customElements.define('hello-world', helloWorld);