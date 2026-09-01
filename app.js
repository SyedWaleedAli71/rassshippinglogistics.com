/* =====================================================
RASS SHIPPING & LOGISTICS
Main JavaScript
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
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
