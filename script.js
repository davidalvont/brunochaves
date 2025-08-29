// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos do DOM
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const faqItems = document.querySelectorAll('.faq-item');
    const header = document.querySelector('.header');
    
    // Toggle do menu mobile com animação suave
    mobileMenuBtn.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        
        // Alterna ícone do menu com transição suave
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileNav.classList.contains('active')) {
            icon.style.transform = 'rotate(180deg)';
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.style.transform = 'rotate(0deg)';
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Fecha menu mobile ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.style.transform = 'rotate(0deg)';
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Navegação suave e indicação da seção ativa
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove classe active de todos os links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Adiciona classe active ao link correspondente
                const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Atualiza link ativo no scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Navegação suave ao clicar nos links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Funcionalidade do FAQ (accordion) com animação suave
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Fecha todos os itens do FAQ
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                const faqAnswer = faqItem.querySelector('.faq-answer');
                faqAnswer.style.maxHeight = '0px';
            });
            
            // Se o item não estava ativo, ativa ele
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
    
    // Efeito de scroll no header com transição suave
    let lastScrollTop = 0;
    let headerHidden = false;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100 && !headerHidden) {
            // Scrolling down - esconde header
            header.style.transform = 'translateY(-100%)';
            headerHidden = true;
        } else if (scrollTop < lastScrollTop && headerHidden) {
            // Scrolling up - mostra header
            header.style.transform = 'translateY(0)';
            headerHidden = false;
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Animação de entrada dos elementos com Intersection Observer
    function createIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        return observer;
    }
    
    // Aplica animações aos elementos
    function initAnimations() {
        const observer = createIntersectionObserver();
        const animatedElements = document.querySelectorAll('.benefit-card, .contact-card, .faq-item, .services-card');
        
        animatedElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            observer.observe(element);
        });
    }
    
    // Classe CSS para animação
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    
    // Inicializa animações
    initAnimations();
    
    // Efeitos de hover mais suaves
    function addHoverEffects() {
        const cards = document.querySelectorAll('.benefit-card, .contact-card, .services-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
                this.style.boxShadow = 'var(--shadow-2xl)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'var(--shadow-lg)';
            });
        });
    }
    
    addHoverEffects();
    
    // Efeito de parallax sutil no hero
    function addParallaxEffect() {
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', function() {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                hero.style.transform = `translateY(${rate}px)`;
            });
        }
    }
    
    addParallaxEffect();
    
    // Smooth scroll para links externos (WhatsApp) com feedback visual
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Adiciona efeito de ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Adiciona classe para indicar que JS está carregado
    document.body.classList.add('js-loaded');
    
    // Prevenção de scroll horizontal em mobile
    function preventHorizontalScroll() {
        const body = document.body;
        const html = document.documentElement;
        
        body.style.overflowX = 'hidden';
        html.style.overflowX = 'hidden';
    }
    
    preventHorizontalScroll();
    
    // Otimização para dispositivos touch
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Remove hover effects em dispositivos touch
        const touchStyle = document.createElement('style');
        touchStyle.textContent = `
            .touch-device .benefit-card:hover,
            .touch-device .contact-card:hover,
            .touch-device .faq-item:hover {
                transform: none !important;
                box-shadow: var(--shadow-lg) !important;
            }
        `;
        document.head.appendChild(touchStyle);
    }
    
    // Lazy loading para melhor performance
    function lazyLoadElements() {
        if ('IntersectionObserver' in window) {
            const lazyObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        element.classList.add('loaded');
                        lazyObserver.unobserve(element);
                    }
                });
            });
            
            const lazyElements = document.querySelectorAll('[data-lazy]');
            lazyElements.forEach(element => {
                lazyObserver.observe(element);
            });
        }
    }
    
    lazyLoadElements();
    
    // Feedback visual para formulários (se houver)
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Console log para debug (remover em produção)
    console.log('Site Bruno Chaves reformulado com sucesso! 🎨✨');
    
    // Performance monitoring (opcional)
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Tempo de carregamento: ${loadTime}ms`);
        });
    }
});

// Função para scroll to top (caso queira adicionar um botão)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Função utilitária para debounce (otimização de performance)
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Otimização do scroll listener
const optimizedScrollHandler = debounce(function() {
    // Função otimizada para scroll
}, 16);

// Adiciona estilos para efeitos visuais
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .cta-button {
        position: relative;
        overflow: hidden;
    }
    
    .header {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .faq-answer {
        transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .mobile-menu-btn i {
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;

document.head.appendChild(additionalStyles);


