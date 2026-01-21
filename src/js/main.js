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

    // ==================================================
    // 4. CHATBOT INTEGRADO COM N8N
    // ==================================================

    /**
     * Chatbot Widget
     */
    const chatWidget = document.createElement('div');
    chatWidget.id = 'chatWidget';
    chatWidget.innerHTML = `
        <div id="chatButton" class="chat-button">
            <i class="fas fa-comments"></i>
        </div>
        <div id="chatWindow" class="chat-window">
            <div class="chat-header">
                <div class="chat-header-info">
                    <i class="fas fa-robot"></i>
                    <span>Assistente Virtual</span>
                </div>
                <button id="closeChatBtn" class="close-chat-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div id="chatMessages" class="chat-messages">
                <div class="message bot-message">
                    <div class="message-avatar">
                        <i class="fas fa-robot"></i>
                    </div>
                    <div class="message-content">
                        Olá! 👋 Sou o assistente virtual do Grupo FS. Como posso ajudá-lo hoje?
                    </div>
                </div>
            </div>
            <div class="chat-input-container">
                <input type="text" id="chatInput" placeholder="Digite sua mensagem..." autocomplete="off">
                <button id="sendMessageBtn" class="send-message-btn">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(chatWidget);

    // Elementos do Chat
    const chatButton = document.getElementById('chatButton');
    const chatWindow = document.getElementById('chatWindow');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const chatInput = document.getElementById('chatInput');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const chatMessages = document.getElementById('chatMessages');
    const openChatBtn = document.getElementById('openChatBtn');

    // Toggle Chat Window
    function toggleChat() {
        chatWindow.classList.toggle('active');
        if (chatWindow.classList.contains('active')) {
            chatInput.focus();
        }
    }

    chatButton.addEventListener('click', toggleChat);
    closeChatBtn.addEventListener('click', toggleChat);

    // Se existe o botão "Falar com Especialista" na página
    if (openChatBtn) {
        openChatBtn.addEventListener('click', (e) => {
            e.preventDefault();
            chatWindow.classList.add('active');
            chatInput.focus();
        });
    }

    // Função para adicionar mensagem ao chat
    function addMessage(message, isBot = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isBot ? 'bot-message' : 'user-message'}`;

        messageDiv.innerHTML = `
            ${isBot ? '<div class="message-avatar"><i class="fas fa-robot"></i></div>' : ''}
            <div class="message-content">${message}</div>
        `;

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Função para enviar mensagem para n8n
    async function sendToN8N(message) {
        try {
            // Mostrar indicador de digitação
            const typingDiv = document.createElement('div');
            typingDiv.className = 'message bot-message typing-indicator';
            typingDiv.innerHTML = `
                <div class="message-avatar"><i class="fas fa-robot"></i></div>
                <div class="message-content">
                    <div class="typing-dots">
                        <span></span><span></span><span></span>
                    </div>
                </div>
            `;
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            const response = await fetch('https://n8n.automaai.org/webhook/neoprag-site', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    timestamp: new Date().toISOString()
                })
            });

            // Remover indicador de digitação
            typingDiv.remove();

            if (response.ok) {
                const data = await response.json();
                // A resposta do n8n pode vir em diferentes formatos, adaptando:
                const botResponse = data.response || data.message || data.output || 'Desculpe, não consegui processar sua mensagem.';
                addMessage(botResponse, true);
            } else {
                throw new Error('Erro na resposta');
            }
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            // Remover indicador se ainda existir
            const typing = document.querySelector('.typing-indicator');
            if (typing) typing.remove();

            addMessage('Desculpe, ocorreu um erro. Por favor, tente novamente.', true);
        }
    }

    // Enviar mensagem
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message === '') return;

        addMessage(message, false);
        chatInput.value = '';

        // Enviar para n8n
        sendToN8N(message);
    }

    sendMessageBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // ==================================================
    // 5. BOTÕES DE PLANOS -> ABRIR CHATBOT COM MENSAGEM
    // ==================================================

    /**
     * Captura cliques nos botões de planos e abre o chatbot
     * com a mensagem pré-preenchida do data-message
     */
    const planButtons = document.querySelectorAll('.btn-plan-chat');

    planButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            // Pega a mensagem do atributo data-message
            const planMessage = btn.getAttribute('data-message');

            // Abre o chatbot
            chatWindow.classList.add('active');

            // Adiciona a mensagem do usuário ao chat
            if (planMessage) {
                addMessage(planMessage, false);
                // Envia automaticamente para o n8n
                sendToN8N(planMessage);
            }

            // Foca no input para continuar a conversa
            chatInput.focus();
        });
    });

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