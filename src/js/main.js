document.addEventListener('DOMContentLoaded', () => {
    console.log('Branct System: Initializing...');

    // ==================================================
    // 1. LÓGICA GLOBAL UI (Menu, Scroll, Smooth Anchor)
    // ==================================================

    /**
     * Mobile Menu Toggle
     */
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const header = document.getElementById('main-header');
    // Adicionando suporte ao overlay se existir (usado na Pulsar/Neoagro)
    const overlay = document.getElementById('overlay'); 

    function toggleMenu() {
        if(mobileMenu) mobileMenu.classList.toggle('active');
        if(hamburgerBtn) hamburgerBtn.classList.toggle('active');
        if(overlay) overlay.classList.toggle('active');
    }

    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', toggleMenu);
    }

    // Fechar menu ao clicar no overlay
    if (overlay) {
        overlay.addEventListener('click', toggleMenu);
    }

    // Fechar menu ao clicar em links
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(mobileMenu) mobileMenu.classList.remove('active');
            if(hamburgerBtn) hamburgerBtn.classList.remove('active');
            if(overlay) overlay.classList.remove('active');
        });
    });

    /**
     * Header Scroll Effect
     */
    window.addEventListener('scroll', () => {
        if (!header) return;
        
        if (window.scrollY > 50) {
            // Verifica se não é o header específico da Pulsar ou Neoagro para aplicar estilo padrão
            if (!header.classList.contains('header--pulsar') && !header.classList.contains('header--neoagro')) {
                header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.1)";
                header.style.background = "rgba(26, 46, 74, 0.98)";
                if(header.classList.contains('header--white')) {
                    header.style.background = "rgba(255, 255, 255, 0.98)";
                }
            }
        } else {
            if (!header.classList.contains('header--pulsar') && !header.classList.contains('header--neoagro')) {
                 header.style.boxShadow = "none";
                 header.style.background = ""; // Volta ao CSS original
            }
        }
    });

    /**
     * Smooth Scroll
     */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;

            e.preventDefault();
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // ==================================================
    // 2. FORMULÁRIOS & NOTIFICAÇÕES (Neoprag, Neoagro, Pulsar)
    // ==================================================

    /**
     * Contact Form Handler
     * Funciona para todos os formulários com ID 'contactForm'
     */
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Feedback UI (Loading)
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            const loadingText = '<i class="fas fa-spinner fa-spin"></i> Processando...';
            
            btn.innerHTML = loadingText;
            btn.disabled = true;

            // Simula envio para API (1.5 segundos)
            setTimeout(() => {
                // Mostrar Toast Notification
                const toast = document.getElementById('toast');
                if (toast) {
                    toast.classList.add('show');
                    setTimeout(() => {
                        toast.classList.remove('show');
                    }, 4000);
                }

                // Resetar Formulário
                contactForm.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
                
                console.log('Formulário enviado com sucesso.');
            }, 1500);
        });
    }

    // ==================================================
    // 3. LÓGICA ESPECÍFICA DE PRODUTOS (Pulsar-X)
    // ==================================================

    /**
     * Pulsar-X: Pré-preenchimento de Interesse
     */
    const demoButtons = document.querySelectorAll('.btn-demo-trigger');
    const formSubjectInput = document.querySelector('input[name="assunto"]');
    const formMessageInput = document.querySelector('textarea[name="mensagem"]');

    if (demoButtons.length > 0) {
        demoButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const product = btn.getAttribute('data-product');
                
                // Rolar até o formulário
                const contactSection = document.getElementById('contato');
                if (contactSection) {
                    const headerOffset = 100;
                    const elementPosition = contactSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }

                // Preencher campos automaticamente
                if (formSubjectInput) {
                    formSubjectInput.value = `Interesse em: ${product}`;
                }
                
                if (formMessageInput) {
                    formMessageInput.value = `Olá, gostaria de solicitar uma demonstração técnica do equipamento ${product}.`;
                    
                    // Efeito visual de foco
                    formMessageInput.focus();
                    formMessageInput.style.borderColor = "#4cc9f0"; // Pulsar Cyan
                    setTimeout(() => formMessageInput.style.borderColor = "", 2000);
                }
            });
        });
    }

    console.log('Branct System: Core loaded successfully.');
});
/* =========================================
   LÓGICA DO BANNER DE COOKIES
   ========================================= */

document.addEventListener("DOMContentLoaded", function() {
    const cookieBanner = document.getElementById("cookieBanner");
    const btnAccept = document.getElementById("btnAcceptCookies");

    // Verifica se já existe o consentimento no navegador
    if (!localStorage.getItem("cookiesAceitos")) {
        // Se NÃO tiver, espera 1 segundo e mostra o banner
        setTimeout(() => {
            cookieBanner.classList.add("show");
        }, 1000);
    }

    // Ao clicar no botão "Aceitar"
    if(btnAccept){
        btnAccept.addEventListener("click", () => {
            // Salva a informação no navegador do usuário
            localStorage.setItem("cookiesAceitos", "true");
            
            // Remove o banner visualmente
            cookieBanner.classList.remove("show");
        });
    }
});