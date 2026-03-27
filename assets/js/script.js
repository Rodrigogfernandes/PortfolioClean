const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const THEME_COLORS = {
    light: "#f4f7fb",
    dark: "#09101d",
};

function setTheme(theme = "light", persist = true) {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark-theme", isDark);
    document.body.classList.toggle("dark-theme", isDark);

    if (persist) {
        localStorage.setItem("theme", theme);
    }

    const themeMeta = qs("#theme-color-meta");
    if (themeMeta) {
        themeMeta.setAttribute("content", THEME_COLORS[theme] || THEME_COLORS.light);
    }

    qsa("#theme-toggle, #theme-toggle-mobile").forEach((button) => {
        button.setAttribute("aria-pressed", String(isDark));
    });

    updateParticlesColor(isDark ? "#87a9ff" : "#2f7cf6");
}

function getPreferredTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
        return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function updateParticlesColor(color) {
    if (!window.pJSDom || !window.pJSDom[0]) {
        return;
    }

    const particles = window.pJSDom[0].pJS;
    particles.particles.color.value = color;
    particles.particles.line_linked.color = color;
    particles.fn.particlesRefresh();
}

function initThemeToggle() {
    setTheme(getPreferredTheme(), false);

    qsa("#theme-toggle, #theme-toggle-mobile").forEach((button) => {
        button?.addEventListener("click", () => {
            const nextTheme = document.body.classList.contains("dark-theme") ? "light" : "dark";
            setTheme(nextTheme);
        });
    });

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", (event) => {
            if (!localStorage.getItem("theme")) {
                setTheme(event.matches ? "dark" : "light", false);
            }
        });
    }
}

function initHeaderScrollEffect() {
    const header = qs(".site-header");
    if (!header) return;

    const onScroll = () => {
        header.classList.toggle("scrolled", window.scrollY > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
}

function initMenu() {
    const menuButton = qs("#menu-toggle");
    const menu = qs("#primary-menu");
    if (!menuButton || !menu) return;

    const closeMenu = () => {
        document.body.classList.remove("menu-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menu");
    };

    const toggleMenu = () => {
        const isOpen = document.body.classList.toggle("menu-open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    };

    menuButton.addEventListener("click", toggleMenu);

    qsa('a[href^="#"]', menu).forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
        if (!document.body.classList.contains("menu-open")) return;
        if (menu.contains(event.target) || menuButton.contains(event.target)) return;
        closeMenu();
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 840) {
            closeMenu();
        }
    });
}

function initSmoothScroll() {
    qsa('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (event) => {
            const href = anchor.getAttribute("href");
            if (!href || href === "#") return;

            const target = qs(href);
            if (!target) return;

            event.preventDefault();
            const headerOffset = qs(".site-header")?.offsetHeight || 0;
            const top = target.getBoundingClientRect().top + window.scrollY - headerOffset - 12;
            window.scrollTo({ top, behavior: "smooth" });
        });
    });
}

function initRevealOnScroll() {
    const revealElements = qsa(".reveal");
    if (!revealElements.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    revealElements.forEach((element) => observer.observe(element));
}

function initActiveNav() {
    const links = qsa('.nav-links a[href^="#"]');
    const sections = links
        .map((link) => qs(link.getAttribute("href")))
        .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            const visibleEntry = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

            if (!visibleEntry) return;

            const id = `#${visibleEntry.target.id}`;
            links.forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === id);
            });
        },
        { threshold: 0.35 }
    );

    sections.forEach((section) => observer.observe(section));
}

function initMouseHighlight() {
    const cursor = qs(".highlight-effect");
    if (!cursor) return;
    if (window.matchMedia("(pointer: coarse)").matches) {
        cursor.style.display = "none";
        return;
    }

    document.addEventListener("mousemove", (event) => {
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
    });
}

function initLoader() {
    const loader = qs(".loader");
    if (!loader) return;

    const hideLoader = () => loader.classList.add("hidden");
    window.addEventListener("load", hideLoader, { once: true });
    window.setTimeout(hideLoader, 1800);
}

function initCurrentYear() {
    const yearNode = qs("#current-year");
    if (yearNode) {
        yearNode.textContent = String(new Date().getFullYear());
    }
}

function initParticles() {
    if (typeof particlesJS === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const particlesColor = document.body.classList.contains("dark-theme") ? "#87a9ff" : "#2f7cf6";

    particlesJS("particles-js", {
        particles: {
            number: { value: 40, density: { enable: true, value_area: 900 } },
            color: { value: particlesColor },
            shape: { type: "circle" },
            opacity: { value: 0.35, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 140,
                color: particlesColor,
                opacity: 0.18,
                width: 1,
            },
            move: {
                enable: true,
                speed: 1.8,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
            },
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "grab" },
                resize: true,
            },
        },
        retina_detect: true,
    });
}

function initWhatsappForm() {
    const form = qs("#whatsapp-form");
    const feedback = qs("#form-feedback");
    if (!form || !feedback) return;

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const fields = {
            name: qs("#name")?.value.trim() || "",
            email: qs("#email")?.value.trim() || "",
            subject: qs("#subject")?.value.trim() || "",
            message: qs("#message")?.value.trim() || "",
        };

        if (!fields.name || !fields.email || !fields.subject || !fields.message) {
            feedback.textContent = "Preencha todos os campos para iniciar a conversa.";
            feedback.style.color = "#c2410c";
            return;
        }

        const phone = "5583999251636";
        const text = [
            "Olá, Rodrigo!",
            "",
            `Meu nome é ${fields.name}.`,
            `Email: ${fields.email}`,
            `Assunto: ${fields.subject}`,
            "",
            fields.message,
        ].join("\n");

        feedback.textContent = "Abrindo WhatsApp com sua mensagem preenchida...";
        feedback.style.color = "";
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
        form.reset();
    });
}

function initCarousel() {
    const track = qs(".projects-carousel");
    const prevButton = qs(".carousel-btn.prev");
    const nextButton = qs(".carousel-btn.next");
    const indicators = qs(".carousel-indicators");
    if (!track || !indicators) return;

    const cards = qsa(".project-card", track);
    if (!cards.length) return;

    let currentIndex = 0;
    let cardsPerView = getCardsPerView();
    let maxIndex = Math.max(0, cards.length - cardsPerView);
    let autoPlayId = null;
    let startX = 0;
    let currentTranslate = 0;
    let previousTranslate = 0;
    let isDragging = false;

    function getCardsPerView() {
        if (window.innerWidth <= 640) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    function getStepWidth() {
        const gap = parseFloat(getComputedStyle(track).gap || "0");
        return cards[0].getBoundingClientRect().width + gap;
    }

    function renderIndicators() {
        indicators.innerHTML = "";
        const totalPages = Math.max(1, cards.length - cardsPerView + 1);

        for (let index = 0; index < totalPages; index += 1) {
            const button = document.createElement("button");
            button.type = "button";
            button.className = index === currentIndex ? "active" : "";
            button.setAttribute("aria-label", `Ir para o grupo ${index + 1}`);
            button.addEventListener("click", () => {
                currentIndex = index;
                updateCarousel();
                restartAutoPlay();
            });
            indicators.appendChild(button);
        }
    }

    function updateCarousel(animate = true) {
        maxIndex = Math.max(0, cards.length - cardsPerView);
        currentIndex = Math.min(currentIndex, maxIndex);
        track.style.transition = animate ? "transform 320ms ease" : "none";
        track.style.transform = `translateX(${-currentIndex * getStepWidth()}px)`;

        qsa("button", indicators).forEach((button, index) => {
            button.classList.toggle("active", index === currentIndex);
        });
    }

    function next() {
        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        updateCarousel();
    }

    function prev() {
        currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
        updateCarousel();
    }

    function stopAutoPlay() {
        if (autoPlayId) {
            clearInterval(autoPlayId);
            autoPlayId = null;
        }
    }

    function startAutoPlay() {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        stopAutoPlay();
        autoPlayId = setInterval(next, 4000);
    }

    function restartAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    function pointerDown(event) {
        isDragging = true;
        startX = event.clientX;
        previousTranslate = -currentIndex * getStepWidth();
        track.style.transition = "none";
        track.classList.add("dragging");
        stopAutoPlay();
    }

    function pointerMove(event) {
        if (!isDragging) return;
        currentTranslate = previousTranslate + (event.clientX - startX);
        track.style.transform = `translateX(${currentTranslate}px)`;
    }

    function pointerUp() {
        if (!isDragging) return;
        isDragging = false;
        track.classList.remove("dragging");

        const movedBy = currentTranslate - previousTranslate;
        if (movedBy < -60 && currentIndex < maxIndex) currentIndex += 1;
        if (movedBy > 60 && currentIndex > 0) currentIndex -= 1;

        updateCarousel();
        startAutoPlay();
    }

    prevButton?.addEventListener("click", () => {
        prev();
        restartAutoPlay();
    });

    nextButton?.addEventListener("click", () => {
        next();
        restartAutoPlay();
    });

    track.addEventListener("pointerdown", pointerDown);
    track.addEventListener("pointermove", pointerMove);
    track.addEventListener("pointerup", pointerUp);
    track.addEventListener("pointerleave", pointerUp);
    track.addEventListener("pointercancel", pointerUp);
    track.addEventListener("mouseenter", stopAutoPlay);
    track.addEventListener("mouseleave", startAutoPlay);

    window.addEventListener("resize", () => {
        cardsPerView = getCardsPerView();
        renderIndicators();
        updateCarousel(false);
    });

    renderIndicators();
    updateCarousel(false);
    startAutoPlay();
}

document.addEventListener("DOMContentLoaded", () => {
    initThemeToggle();
    initHeaderScrollEffect();
    initMenu();
    initSmoothScroll();
    initRevealOnScroll();
    initActiveNav();
    initMouseHighlight();
    initLoader();
    initCurrentYear();
    initParticles();
    initWhatsappForm();
    initCarousel();
});
