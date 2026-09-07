/* =====================================================
RASS SHIPPING & LOGISTICS
Main JavaScript
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    /* ================= GLOBAL WHATSAPP CONTACT ================= */

    const whatsappNumber = "923405423232";
    const whatsappMessage =
        "Hello RASS Shipping & Logistics, I would like to know more about your shipping and logistics services.";

    if (!document.querySelector(".floating-whatsapp")) {
        const whatsappLink = document.createElement("a");
        whatsappLink.className = "floating-whatsapp";
        whatsappLink.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        whatsappLink.target = "_blank";
        whatsappLink.rel = "noopener noreferrer";
        whatsappLink.setAttribute("aria-label", "Chat with RASS Shipping on WhatsApp");
        whatsappLink.innerHTML = `
            <span class="whatsapp-tooltip" role="tooltip">
                <strong>Need assistance?</strong>
                <span>Chat with our team on WhatsApp.</span>
                <small>We're here to help with your shipping &amp; logistics needs.</small>
            </span>
            <span class="whatsapp-icon" aria-hidden="true">
                <svg viewBox="0 0 32 32" focusable="false">
                    <path d="M16 3.2a12.8 12.8 0 0 0-11 19.3L3.4 28.8l6.5-1.6A12.8 12.8 0 1 0 16 3.2Zm0 23.3a10.5 10.5 0 0 1-5.3-1.4l-.4-.2-3.9 1 1-3.8-.3-.4A10.5 10.5 0 1 1 16 26.5Zm5.8-7.8c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2l-.8 1c-.2.2-.3.2-.6.1a8.5 8.5 0 0 1-2.5-1.5 9.4 9.4 0 0 1-1.7-2.1c-.2-.3 0-.5.2-.7l.5-.6.2-.4c.1-.2 0-.4 0-.6l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.1 3.1 1.3 3.3a12.2 12.2 0 0 0 4.7 4.4c.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4Z" />
                </svg>
            </span>
        `;

        document.body.appendChild(whatsappLink);
    }

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navbar = document.querySelector(".navbar");

    /* ================= MOBILE MENU ================= */

    const closeMobileMenu = () => {
        if (!menuToggle || !navMenu) return;

        navMenu.classList.remove("show");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    };

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", (event) => {
            event.stopPropagation();

            const isOpen = navMenu.classList.toggle("show");
            menuToggle.classList.toggle("active", isOpen);

            menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        navMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMobileMenu);
        });

        document.addEventListener("click", (event) => {
            if (
                navMenu.classList.contains("show") &&
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMobileMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 900) closeMobileMenu();
        });
    }

    /* ================= NAVBAR SCROLL STATE ================= */

    const updateNavbarState = () => {
        if (!navbar) return;
        navbar.classList.toggle("is-scrolled", window.scrollY > 40);
    };

    updateNavbarState();
    window.addEventListener("scroll", updateNavbarState, { passive: true });

    /* ================= SMOOTH ANCHOR SCROLL ================= */

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);
            if (!target) return;

            event.preventDefault();

            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const targetTop =
                target.getBoundingClientRect().top +
                window.scrollY -
                navbarHeight -
                20;

            window.scrollTo({
                top: targetTop,
                behavior: "smooth"
            });
        });
    });

    /* ================= HERO PARALLAX ================= */

    const hero = document.querySelector(".hero");

    if (hero && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        let ticking = false;

        const updateHeroParallax = () => {
            const scrollY = window.scrollY;

            if (scrollY <= window.innerHeight) {
                hero.style.setProperty(
                    "--hero-shift",
                    `${Math.min(scrollY * 0.16, 90)}px`
                );
            }

            ticking = false;
        };

        window.addEventListener("scroll", () => {
            if (!ticking) {
                window.requestAnimationFrame(updateHeroParallax);
                ticking = true;
            }
        }, { passive: true });

        updateHeroParallax();
    }

    /* ================= SCROLL REVEAL ================= */

    const revealTargets = document.querySelectorAll(".reveal");

    if (revealTargets.length) {
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion || !("IntersectionObserver" in window)) {
            revealTargets.forEach((element) => {
                element.classList.add("is-visible");
            });
        } else {
            const observer = new IntersectionObserver(
                (entries, obs) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) return;

                        entry.target.classList.add("is-visible");
                        obs.unobserve(entry.target);
                    });
                },
                {
                    threshold: 0.14,
                    rootMargin: "0px 0px -50px 0px"
                }
            );

            revealTargets.forEach((element) => observer.observe(element));
        }
    }

    /* ================= CONTACT FORM ================= */

    const quoteForm = document.getElementById("quoteForm");
    const formSuccess = document.getElementById("formSuccess");

    if (quoteForm && formSuccess) {
        quoteForm.addEventListener("submit", (event) => {
            event.preventDefault();

            formSuccess.hidden = false;
            quoteForm.reset();
        });
    }

    /* ================= CURRENT YEAR ================= */

    const yearElement = document.querySelector(".footer-bottom p");

    if (yearElement) {
        yearElement.innerHTML =
            `&copy; ${new Date().getFullYear()} RASS Shipping &amp; Logistics. All Rights Reserved.`;
    }
});
