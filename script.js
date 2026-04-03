/**
 * PRNT LANDING PAGE SCRIPT
 * ─────────────────────────────────────────────────────────────────────────────
 * Purpose: Frontend logic for animations, dynamic rendering, and navigation.
 * ─────────────────────────────────────────────────────────────────────────────
 */

document.addEventListener('DOMContentLoaded', () => {
    LandingApp.init();
});

const LandingApp = {
    // ─────────────────────────────────────────────────────────────────────────
    // 1. SAMPLE DATA (MOCK SERVICES)
    // ─────────────────────────────────────────────────────────────────────────
    state: {
        services: [
            {
                id: 1,
                title: "Photo Printing",
                description: "Standard per-piece prints from 2R to A4 sizes.",
                icon: "fas fa-images"
            },
            {
                id: 2,
                title: "Photo Printing (Package)",
                description: "ID and Passport photo packages with layout included.",
                icon: "fas fa-user-tie"
            },
            {
                id: 3,
                title: "Document Printing",
                description: "B&W and color solutions for school and business.",
                icon: "fas fa-file-alt"
            },
            {
                id: 4,
                title: "Large Format",
                description: "High-quality tarpaulins and posters for any event.",
                icon: "fas fa-scroll"
            },
            {
                id: 5,
                title: "Brochure Printing",
                description: "Bi-fold and tri-fold brochures for marketing needs.",
                icon: "fas fa-columns"
            },
            {
                id: 6,
                title: "Customized Solutions",
                description: "Specialized requirements? Message us directly.",
                icon: "fas fa-comments"
            }
        ]
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 2. INITIALIZATION
    // ─────────────────────────────────────────────────────────────────────────
    init() {
        // this.renderServices(); // Using static high-fidelity layout in index.php
        this.initAnimations();
        this.setupEventListeners();
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 3. CORE LOGIC / DYNAMIC RENDERING
    // ─────────────────────────────────────────────────────────────────────────
    renderServices() {
        const container = document.getElementById('services-container');
        if (!container) return;

        // BACKEND INTEGRATION POINT
        // In production, replace this.state.services with data from an API call
        const servicesHTML = this.state.services.map(service => `
            <div class="col-md-4 mb-4 reveal">
                <div class="service-card text-center">
                    <div class="service-icon"><i class="${service.icon}"></i></div>
                    <h3>${service.title}</h3>
                    <p class="text-muted small">${service.description}</p>
                </div>
            </div>
        `).join('');

        container.innerHTML = servicesHTML;
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 4. INTERACTIONS & EFFECTS (IntersectionObserver)
    // ─────────────────────────────────────────────────────────────────────────
    initAnimations() {
        const reveals = document.querySelectorAll('.reveal');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Optionally unobserve after animating
                    // observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        reveals.forEach(el => observer.observe(el));
    },

    // ─────────────────────────────────────────────────────────────────────────
    // 5. ACTION HANDLER / NAVIGATION
    // ─────────────────────────────────────────────────────────────────────────
    setupEventListeners() {
        // Handle CTA Analytics or custom tracking here
        document.querySelectorAll('.btn-landing-primary').forEach(btn => {
            btn.addEventListener('click', (e) => {
                // NAVIGATION logic
                console.log("Navigating to ordering module...");
                // BACKEND INTEGRATION POINT: Log conversion event before redirecting
            });
        });

        // RESPONSIVE DESIGN: Handle mobile navbar interactions if needed
    }
};
