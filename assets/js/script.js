// Aplicar tema imediatamente para evitar flash de conteudo nao estilizado
(() => {
    try {
        const savedTheme = localStorage.getItem("theme");
        const systemPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        const theme = savedTheme || (systemPrefersDark ? "dark" : "light");

        if (theme === "dark") {
            document.documentElement.classList.add("dark-theme");
            if (document.body) {
                document.body.classList.add("dark-theme");
            } else {
                document.addEventListener("DOMContentLoaded", () => {
                    document.body.classList.add("dark-theme");
                });
            }
        }
    } catch (_) {
        // Ignorar erros de storage
    }
})();

const qs = (selector, root = document) => root.querySelector(selector);
const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

function updateParticlesColor(color) {
    if (typeof particlesJS !== "undefined" && window.pJSDom && window.pJSDom[0]) {
        window.pJSDom[0].pJS.particles.color.value = color;
        window.pJSDom[0].pJS.particles.line_linked.color = color;
        window.pJSDom[0].pJS.fn.draw();
    }
}

function initThemeToggle() {
    const body = document.body;
    const themeToggle = qs("#theme-toggle");
    const themeToggleMobile = qs("#theme-toggle-mobile");

    const getInitialTheme = () => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) return savedTheme;
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
        return "light";
    };

    const applyTheme = (theme) => {
        if (theme === "dark") {
            body.classList.add("dark-theme");
        } else {
            body.classList.remove("dark-theme");
        }
        localStorage.setItem("theme", theme);
        updateParticlesColor(theme === "dark" ? "#5b7fff" : "#6c63ff");
    };

    const toggleTheme = () => {
        const isDark = body.classList.contains("dark-theme");
        applyTheme(isDark ? "light" : "dark");
    };

    applyTheme(getInitialTheme());

    themeToggle?.addEventListener("click", toggleTheme);
    themeToggleMobile?.addEventListener("click", toggleTheme);

    const mediaQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
    if (mediaQuery && mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", (e) => {
            if (!localStorage.getItem("theme")) {
                applyTheme(e.matches ? "dark" : "light");
            }
        });
    }
}

function initWhatsappForm() {
    const whatsappForm = qs("#whatsapp-form");
    if (!whatsappForm) return;

    whatsappForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const nome = qs("#name")?.value || "";
        const email = qs("#email")?.value || "";
        const assunto = qs("#subject")?.value || "";
        const mensagem = qs("#message")?.value || "";

        const numero = "5583999251636";
        const texto = `Ola, meu nome e *${nome}*.\nEmail: ${email}\nAssunto: ${assunto}\nMensagem: ${mensagem}`;
        const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

        window.open(url, "_blank");
    });
}

function initLoader() {
    window.addEventListener("load", () => {
        const loader = qs(".loader");
        loader?.classList.add("hidden");
    });
}

function initMenu() {
    const burger = qs(".burger");
    const nav = qs(".nav-links");

    if (!burger || !nav) return;
    burger.addEventListener("click", () => {
        nav.classList.toggle("active");
        burger.classList.toggle("active");
    });
}

function initSmoothScroll() {
    qsa('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
            const href = anchor.getAttribute("href");
            if (!href || href === "#") return;

            const target = qs(href);
            if (!target) return;

            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        });
    });
}

function initHeaderScrollEffect() {
    const header = qs("header");
    if (!header) return;

    const onScroll = () => {
        if (window.scrollY > 100) header.classList.add("scrolled");
        else header.classList.remove("scrolled");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
}

function initRevealOnScroll() {
    const revealElements = qsa(".reveal");
    if (!revealElements.length) return;

    const revealOnScroll = () => {
        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 150) {
                element.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll, { passive: true });
    revealOnScroll();
}

function initParallax() {
    const parallaxElements = qsa(".parallax");
    if (!parallaxElements.length) return;

    const parallaxOnScroll = () => {
        parallaxElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < window.innerHeight - 150) {
                element.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", parallaxOnScroll, { passive: true });
    parallaxOnScroll();
}

function initMouseHighlight() {
    const cursor = qs(".highlight-effect");
    if (!cursor) return;
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return;

    document.addEventListener("mousemove", (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
    });
}

function initParticles() {
    const body = document.body;
    const particlesColor = body.classList.contains("dark-theme") ? "#5b7fff" : "#6c63ff";

    if (typeof particlesJS === "undefined") return;

    particlesJS("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: particlesColor },
            shape: { type: "circle" },
            opacity: { value: 0.6, random: false },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: particlesColor,
                opacity: 0.3,
                width: 1,
            },
            move: {
                enable: true,
                speed: 6,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false,
            },
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true,
            },
        },
        retina_detect: true,
    });
}

function initContactForm() {
    const contactForm = qs(".contact-form");
    if (!contactForm) return;

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Mensagem enviada com sucesso!");
        contactForm.reset();
    });
}

function initCarousel() {
    const track = qs(".projects-carousel");
    const originalCards = qsa(".projects-carousel .project-card");
    const totalOriginalCards = originalCards.length;
    const nextBtn = qs(".carousel-btn.next");
    const prevBtn = qs(".carousel-btn.prev");
    const indicatorsContainer = qs(".carousel-indicators");

    if (!track || totalOriginalCards === 0) return;

    let index = 0;
    let cardWidth = 0;
    let visibleCards = 0;
    let cloneCount = 0;
    let autoplayTimer;
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let dragMoved = false;

    const getGap = () => {
        const gap = getComputedStyle(track).gap;
        return gap ? parseFloat(gap) : 0;
    };

    const calculateVisibleCards = () => {
        const containerWidth = qs(".carousel-wrapper").clientWidth;

        if (containerWidth > 900) visibleCards = 3;
        else if (containerWidth > 600) visibleCards = 2;
        else visibleCards = 1;

        cloneCount = Math.min(visibleCards, totalOriginalCards);
        cardWidth = originalCards[0].getBoundingClientRect().width + getGap();
    };

    const clearClones = () => {
        qsa('.project-card[data-clone="true"]', track).forEach((node) => node.remove());
    };

    const rebuildClones = () => {
        clearClones();

        const before = originalCards.slice(-cloneCount).map((card) => {
            const clone = card.cloneNode(true);
            clone.setAttribute("data-clone", "true");
            clone.classList.remove("reveal");
            clone.classList.add("active");
            return clone;
        });

        const after = originalCards.slice(0, cloneCount).map((card) => {
            const clone = card.cloneNode(true);
            clone.setAttribute("data-clone", "true");
            clone.classList.remove("reveal");
            clone.classList.add("active");
            return clone;
        });

        track.innerHTML = "";
        const fragment = document.createDocumentFragment();
        before.forEach((node) => fragment.appendChild(node));
        originalCards.forEach((node) => fragment.appendChild(node));
        after.forEach((node) => fragment.appendChild(node));
        track.appendChild(fragment);
    };

    const setupIndicators = () => {
        if (!indicatorsContainer) return;
        indicatorsContainer.innerHTML = "";

        originalCards.forEach((_, i) => {
            const dot = document.createElement("div");
            if (i === 0) dot.classList.add("active");
            indicatorsContainer.appendChild(dot);
        });
    };

    const updateIndicators = () => {
        if (!indicatorsContainer) return;
        const dots = qsa("div", indicatorsContainer);
        dots.forEach((dot) => dot.classList.remove("active"));

        let realIndex = (index - cloneCount) % totalOriginalCards;
        if (realIndex < 0) realIndex += totalOriginalCards;

        dots[realIndex]?.classList.add("active");
    };

    const updatePosition = (animate = true) => {
        track.style.transition = animate ? ".45s ease" : "none";
        track.style.transform = `translateX(${-index * cardWidth}px)`;
        updateIndicators();
    };

    const handleSeamlessLoop = () => {
        const maxIndex = totalOriginalCards + cloneCount;
        if (index >= maxIndex) {
            index = cloneCount;
            updatePosition(false);
        } else if (index < cloneCount) {
            index = totalOriginalCards + cloneCount - 1;
            updatePosition(false);
        }
    };

    const startAutoplay = () => {
        stopAutoplay();
        autoplayTimer = setInterval(() => {
            index += 1;
            updatePosition();
        }, 3500);
    };

    const stopAutoplay = () => {
        clearInterval(autoplayTimer);
    };

    const pauseAutoplay = () => stopAutoplay();
    const resumeAutoplay = () => { if (!isDragging) startAutoplay(); };

    const getX = (e) => e.clientX;

    const dragStart = (e) => {
        if (e.button !== undefined && e.button !== 0) return;
        isDragging = true;
        dragMoved = false;
        startX = getX(e);
        prevTranslate = -(index * cardWidth);
        track.style.transition = "none";
        track.classList.add("dragging");
        track.setPointerCapture?.(e.pointerId);
        stopAutoplay();
    };

    const dragging = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const currentX = getX(e);
        const diff = currentX - startX;
        currentTranslate = prevTranslate + diff;
        if (Math.abs(diff) > 8) dragMoved = true;
        track.style.transform = `translateX(${currentTranslate}px)`;
    };

    const dragEnd = () => {
        if (!isDragging) return;
        isDragging = false;
        track.classList.remove("dragging");

        const moved = currentTranslate - prevTranslate;
        if (moved < -60) index += 1;
        else if (moved > 60) index -= 1;

        updatePosition();
        resumeAutoplay();
    };

    nextBtn?.addEventListener("click", () => { index += 1; updatePosition(); });
    prevBtn?.addEventListener("click", () => { index -= 1; updatePosition(); });

    track.addEventListener("transitionend", handleSeamlessLoop);
    track.addEventListener("mouseenter", pauseAutoplay);
    track.addEventListener("mouseleave", resumeAutoplay);

    track.addEventListener("pointerdown", dragStart);
    track.addEventListener("pointermove", dragging);
    track.addEventListener("pointerup", dragEnd);
    track.addEventListener("pointercancel", dragEnd);
    track.addEventListener("pointerleave", dragEnd);

    track.addEventListener(
        "click",
        (e) => {
            if (dragMoved) {
                e.preventDefault();
                e.stopPropagation();
                dragMoved = false;
            }
        },
        true
    );

    track.addEventListener("mouseover", (e) => {
        if (e.target.closest(".project-card")) pauseAutoplay();
    });

    track.addEventListener("mouseout", (e) => {
        if (e.target.closest(".project-card")) resumeAutoplay();
    });

    if (indicatorsContainer) {
        indicatorsContainer.addEventListener("click", (e) => {
            if (e.target.tagName !== "DIV") return;
            const dots = qsa("div", indicatorsContainer);
            const dotIndex = dots.indexOf(e.target);
            index = cloneCount + dotIndex;
            updatePosition();
        });
    }

    window.addEventListener("resize", () => {
        calculateVisibleCards();
        rebuildClones();
        index = cloneCount;
        updatePosition(false);
    });

    calculateVisibleCards();
    rebuildClones();
    setupIndicators();
    index = cloneCount;
    updatePosition(false);
    startAutoplay();
}

document.addEventListener("DOMContentLoaded", () => {
    initThemeToggle();
    initWhatsappForm();
    initLoader();
    initMenu();
    initSmoothScroll();
    initHeaderScrollEffect();
    initRevealOnScroll();
    initParallax();
    initMouseHighlight();
    initParticles();
    initContactForm();
    initCarousel();
});
