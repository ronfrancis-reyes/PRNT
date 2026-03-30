class Navbar extends HTMLElement {
	async connectedCallback() {
		const response = await fetch("./Navbar.html");
		const html = await response.text();

		this.innerHTML = html;
	}
}
customElements.define("custom-nav", Navbar);
