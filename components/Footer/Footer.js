class Footer extends HTMLElement {
	async connectedCallback() {
		const response = await fetch("components/Footer/Footer.html");
		const html = await response.text();

		this.innerHTML = html;
	}
}
customElements.define("custom-footer", Footer);
