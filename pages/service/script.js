import "/PRNT/components/Navbar/Navbar.js";
import "/PRNT/components/Footer/Footer.js";

document.addEventListener("DOMContentLoaded", () => {
	const observerOptions = {
		threshold: 0.1,
		rootMargin: "0px 0px -50px 0px"
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add("appear");
				observer.unobserve(entry.target);
			}
		});
	}, observerOptions);

	// Observe all service cards and document service cards
	document.querySelectorAll(".service-card, .doc-service-card").forEach(el => {
		el.style.opacity = "0";
		el.style.transform = "translateY(30px)";
		el.style.transition = "all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)";
		observer.observe(el);
	});
});
