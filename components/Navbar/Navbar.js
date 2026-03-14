class Navbar extends HTMLElement {
	async connectedCallback() {
		const response = await fetch("/PRNT/components/Navbar/Navbar.html");
		const html = await response.text();

		this.innerHTML = html;
	}
}
customElements.define("custom-nav", Navbar);
