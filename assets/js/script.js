// Aplicar tema imediatamente para evitar flash de conteúdo não estilizado
(function() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    // Aplicar classe no html e body
    if (theme === 'dark') {
        document.documentElement.classList.add('dark-theme');
        if (document.body) {
            document.body.classList.add('dark-theme');
        } else {
            // Se body ainda não existe, esperar um pouco
            document.addEventListener('DOMContentLoaded', function() {
                document.body.classList.add('dark-theme');
            });
        }
    }
})();

// Função para atualizar cores das partículas
function updateParticlesColor(color) {
    if (typeof particlesJS !== 'undefined' && window.pJSDom && window.pJSDom[0]) {
        window.pJSDom[0].pJS.particles.color.value = color;
        window.pJSDom[0].pJS.particles.line_linked.color = color;
        window.pJSDom[0].pJS.fn.draw();
    }
}

// Theme Toggle - Executar quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Verificar tema salvo no localStorage ou preferência do sistema
    function getInitialTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        // Verificar preferência do sistema
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    // Aplicar tema
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
        }
        localStorage.setItem('theme', theme);
        // Atualizar cores das partículas se já estiverem inicializadas
        updateParticlesColor(theme === 'dark' ? '#5b7fff' : '#6c63ff');
    }

    // Aplicar tema ao carregar a página
    const initialTheme = getInitialTheme();
    applyTheme(initialTheme);

    // Função para alternar tema
    function toggleTheme() {
        const isDark = body.classList.contains('dark-theme');
        if (isDark) {
            applyTheme('light');
        } else {
            applyTheme('dark');
        }
    }

    // Alternar tema - Botão do header
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Alternar tema - Botão mobile fixo
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    if (themeToggleMobile) {
        themeToggleMobile.addEventListener('click', toggleTheme);
    }

    // Escutar mudanças na preferência do sistema (apenas se não houver preferência salva)
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                applyTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    // Mensagem whatsapp
    const whatsappForm = document.getElementById("whatsapp-form");
    if (whatsappForm) {
        whatsappForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const nome = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const assunto = document.getElementById("subject").value;
            const mensagem = document.getElementById("message").value;

            const numero = "5583999251636";
            const texto = `Olá, meu nome é *${nome}*.\nEmail: ${email}\nAssunto: ${assunto}\nMensagem: ${mensagem}`;
            const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

            window.open(url, "_blank");
        });
    }

    // Loader
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.classList.add('hidden');
        }
    });

    // Menu Mobile
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    
    if (burger && nav) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('active');
            burger.classList.toggle('active');
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Header Scroll Effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Reveal on Scroll
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // Parallax Effect
    const parallaxElements = document.querySelectorAll('.parallax');
    const parallaxOnScroll = () => {
        parallaxElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', parallaxOnScroll);
    parallaxOnScroll();

    // Mouse Effect
    const cursor = document.querySelector('.highlight-effect');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    }

    // Particles.js - Inicializar com cor baseada no tema atual
    const particlesColor = body.classList.contains('dark-theme') ? '#5b7fff' : '#6c63ff';
    
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: particlesColor
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.6,
                    random: false
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: particlesColor,
                    opacity: 0.3,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
    }

    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Adicione aqui a lógica de envio do formulário
            alert('Mensagem enviada com sucesso!');
            contactForm.reset();
        });
    }
});
/* -------------------------------------------------
    CARROSSEL DE PROJETOS - OTIMIZADO C/ LOOP SUAVE
---------------------------------------------------*/

const track = document.querySelector(".projects-carousel");
const originalCards = [...document.querySelectorAll(".project-card")];
const totalOriginalCards = originalCards.length;
const nextBtn = document.querySelector(".carousel-btn.next");
const prevBtn = document.querySelector(".carousel-btn.prev");
const indicatorsContainer = document.querySelector(".carousel-indicators");

let index = 0;
let cardWidth = 0;
let visibleCards = 0;
let autoplayTimer;
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;

// ... (Funções calculateVisibleCards, setupIndicators, updateIndicators permanecem as mesmas)

/* -------------------------------------------------
    1) CALCULAR QUANTOS CARDS CABEM NA TELA
---------------------------------------------------*/
function calculateVisibleCards() {
    const containerWidth = document.querySelector(".carousel-wrapper").clientWidth;

    if (containerWidth > 900) visibleCards = 3;
    else if (containerWidth > 600) visibleCards = 2;
    else visibleCards = 1;

    if (originalCards.length > 0) {
        cardWidth = originalCards[0].offsetWidth + 20; 
    }
}

/* -------------------------------------------------
    2) CONFIGURAR INDICADORES
---------------------------------------------------*/
function setupIndicators() {
    indicatorsContainer.innerHTML = "";

    originalCards.forEach((_, i) => {
        const dot = document.createElement("div");
        if (i === 0) dot.classList.add("active");
        indicatorsContainer.appendChild(dot);
    });

    index = 0;
    updatePosition();
}

/* -------------------------------------------------
    3) ATUALIZA POSIÇÃO E INDICA O ÍNDICE ORIGINAL
---------------------------------------------------*/
function updatePosition(animate = true) {
    if (animate) track.style.transition = ".45s ease";
    else track.style.transition = "none";

    let moveX = -(index * cardWidth);
    track.style.transform = `translateX(${moveX}px)`;

    updateIndicators();
}

function updateIndicators() {
    const dots = document.querySelectorAll(".carousel-indicators div");
    dots.forEach(dot => dot.classList.remove("active"));

    // Garante que o índice real sempre esteja entre 0 e totalOriginalCards - 1
    let realIndex = index % totalOriginalCards;
    if (realIndex < 0) realIndex += totalOriginalCards;

    if (dots[realIndex]) {
        dots[realIndex].classList.add("active");
    }
}

/* -------------------------------------------------
    4) HANDLER DO LOOP SUAVE
---------------------------------------------------*/
function handleSeamlessLoop() {
    const lastVisibleIndex = totalOriginalCards - visibleCards;

    // Se o índice for maior ou igual ao número total de cards (após o loop suave)
    if (index >= totalOriginalCards) {
        // Resetamos o índice para o primeiro card (0)
        index = 0; 
        updatePosition(false); // Move sem animação
    } 
    // Se o índice for menor que zero (após o loop suave reverso)
    else if (index < 0) {
        // Resetamos o índice para o último card visível
        index = lastVisibleIndex;
        updatePosition(false); // Move sem animação
    }
}

/* -------------------------------------------------
    5) BOTÕES - ATUALIZADO
---------------------------------------------------*/
nextBtn.onclick = () => {
    // Se o índice atual for o último card visível, o próximo será o totalOriginalCards
    // que fará o carrossel se mover para a esquerda, simulando um "clone virtual"
    if (index === totalOriginalCards - visibleCards) {
        index = totalOriginalCards;
    } else {
        index++;
    }
    updatePosition();
};

prevBtn.onclick = () => {
    // Se o índice atual for 0, o anterior será -1
    // que fará o carrossel se mover para a direita, simulando um "clone virtual"
    if (index === 0) {
        index = -1; 
    } else {
        index--;
    }
    updatePosition();
};

/* -------------------------------------------------
    6) RESET SEM ANIMAÇÃO
---------------------------------------------------*/
// Ao terminar a transição, verificamos se precisamos resetar a posição.
track.addEventListener("transitionend", handleSeamlessLoop);

/* -------------------------------------------------
    7) INDICADORES
---------------------------------------------------*/
indicatorsContainer.addEventListener("click", (e) => {
    if (e.target.tagName !== "DIV") return;

    const dots = [...document.querySelectorAll(".carousel-indicators div")];
    const dotIndex = dots.indexOf(e.target);

    index = dotIndex; 
    updatePosition();
});

/* -------------------------------------------------
    8) AUTOPLAY - ATUALIZADO
---------------------------------------------------*/
function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
        // Usa a mesma lógica do botão 'next'
        if (index === totalOriginalCards - visibleCards) {
             index = totalOriginalCards; // Move para a posição que aciona o loop
        } else {
            index++;
        }
        updatePosition();
    }, 3500);
}

function stopAutoplay() {
    clearInterval(autoplayTimer);
}

track.addEventListener("mouseenter", stopAutoplay);
track.addEventListener("mouseleave", startAutoplay);

/* -------------------------------------------------
    9) SWIPE + ARRASTAR
---------------------------------------------------*/
track.addEventListener("mousedown", dragStart);
track.addEventListener("mousemove", dragging);
track.addEventListener("mouseup", dragEnd);
track.addEventListener("mouseleave", dragEnd);

track.addEventListener("touchstart", dragStart);
track.addEventListener("touchmove", dragging);
track.addEventListener("touchend", dragEnd);

function getX(e) {
    return e.touches ? e.touches[0].clientX : e.clientX;
}

function dragStart(e) {
    isDragging = true;
    startX = getX(e);
    prevTranslate = -(index * cardWidth); 
    track.style.transition = "none";
    stopAutoplay();
}

function dragging(e) {
    if (!isDragging) return;
    const currentX = getX(e);
    let diff = currentX - startX;
    currentTranslate = prevTranslate + diff;

    track.style.transform = `translateX(${currentTranslate}px)`;
}

function dragEnd() {
    if (!isDragging) return;
    isDragging = false;

    let moved = currentTranslate - prevTranslate;

    // A lógica de arrasto agora também usa os índices -1 e totalOriginalCards
    if (moved < -60) {
        // Move para a próxima posição, permitindo o loop suave
        index = index === totalOriginalCards - visibleCards ? totalOriginalCards : index + 1;
    } else if (moved > 60) {
        // Move para a posição anterior, permitindo o loop suave reverso
        index = index === 0 ? -1 : index - 1;
    } 
    
    // Se não houver movimento suficiente, ele retorna à posição anterior do índice
    
    updatePosition();
    startAutoplay();
}

/* -------------------------------------------------
    10) REINICIAR AO REDIMENSIONAR
---------------------------------------------------*/
window.addEventListener("resize", () => {
    calculateVisibleCards();
    setupIndicators(); 
    updatePosition(false); 
});

/* -------------------------------------------------
    INICIAR
---------------------------------------------------*/
calculateVisibleCards();
setupIndicators();
startAutoplay();