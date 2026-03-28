document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. NAVBAR SCROLL EFFECT
    // ==========================================
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(26, 26, 46, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(26, 26, 46, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // ==========================================
    // 2. TYPEWRITER EFFECT (HERO)
    // ==========================================
    const words = [
        "24 horas por dia",
        "enquanto você dorme",
        "pelo WhatsApp",
        "com inteligência artificial"
    ];
    let i = 0;
    let timer;
    const textElement = document.getElementById("typewriter-text");

    function typingEffect() {
        let word = words[i].split("");
        let loopTyping = function() {
            if (word.length > 0) {
                textElement.innerHTML += word.shift();
            } else {
                setTimeout(deletingEffect, 2000);
                return;
            }
            timer = setTimeout(loopTyping, 80);
        };
        loopTyping();
    }

    function deletingEffect() {
        let word = words[i].split("");
        let loopDeleting = function() {
            if (word.length > 0) {
                word.pop();
                textElement.innerHTML = word.join("");
            } else {
                i = (i + 1) % words.length;
                setTimeout(typingEffect, 500);
                return;
            }
            timer = setTimeout(loopDeleting, 40);
        };
        loopDeleting();
    }
    
    // Clear initial placeholder and start
    setTimeout(() => {
        textElement.innerHTML = "";
        typingEffect();
    }, 1000);


    // ==========================================
    // 3. GSAP SCROLL ANIMATIONS
    // ==========================================
    gsap.registerPlugin(ScrollTrigger);

    // Hero Fade Up
    gsap.from(".fade-up", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

    // Section Titles
    gsap.utils.toArray(".section-title").forEach(title => {
        gsap.fromTo(title, 
            { y: 30, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: title,
                    start: "top 95%",
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out"
            }
        );
    });

    // Sections Grids Staggers (Problem, Benefits, Niche)
    const staggerConfigs = [
        { trigger: ".problem-grid", target: ".problem-card" },
        { trigger: ".benefits-grid", target: ".benefit-card" },
        { trigger: ".niche-grid", target: ".niche-card" }
    ];

    staggerConfigs.forEach(st => {
        gsap.fromTo(st.target, 
            { y: 50, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: st.trigger,
                    start: "top 95%",
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "back.out(1.2)"
            }
        );
    });

    // Timeline How It Works
    gsap.fromTo(".timeline-step", 
        { x: -50, opacity: 0 },
        {
            scrollTrigger: {
                trigger: ".timeline",
                start: "top 90%",
            },
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.3,
            ease: "power2.out"
        }
    );

    // Pricing Cards
    gsap.fromTo(".plan-card", 
        { scale: 0.8, opacity: 0 },
        {
            scrollTrigger: {
                trigger: ".pricing-grid",
                start: "top 90%",
            },
            scale: 1,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.2)"
        }
    );


    // ==========================================
    // 4. WHATSAPP MOCKUP ANIMATION
    // ==========================================
    const chatContainer = document.getElementById('chat-container');
    const messages = [
        { type: 'msg-in', text: 'Oi, boa noite! Vocês têm creatina?' },
        { type: 'msg-out', text: 'Oi João, tudo bem? 😊 Tenho sim! A Creatina Monohidratada 300g está por R$89,90. É a mais vendida da loja! Você treina há quanto tempo?' },
        { type: 'msg-in', text: 'Uns 2 anos já. Tô querendo algo pra melhorar meu rendimento' },
        { type: 'msg-out', text: 'Show! Dois anos é um ótimo tempo. Pra quem já treina assim, a creatina vai fazer diferença real na força e recuperação. Quer que eu adicione ao seu carrinho?' },
        { type: 'msg-in', text: 'Sim! E vocês têm whey também?' },
        { type: 'msg-out', text: 'Temos! O Whey Protein Concentrado 900g está por R$149,90. Com dois anos de treino, a combinação creatina + whey é o combo mais eficiente que existe pra hipertrofia. Adiciono também?' },
        { type: 'msg-in', text: 'Adiciona!' },
        { type: 'msg-out', text: 'Perfeito! Seu carrinho:<br>🛒 1x Creatina 300g — R$89,90<br>🛒 1x Whey Protein 900g — R$149,90<br>💰 Total: R$239,80<br>Ah, João — quem leva creatina + whey geralmente pega um BCAA pra completar o stack. Temos o BCAA 120 cáps por R$59,90. Quer aproveitar?' },
        { type: 'msg-in', text: 'Hmm, aí fica caro pra mim' },
        { type: 'msg-out', text: 'Entendo! Tenho um cupom especial pra você: COMBO15 dá 15% de desconto no carrinho inteiro. Com os 3 produtos sai de R$299,70 por R$254,75. Quer que eu aplique?' },
        { type: 'msg-in', text: 'Opa, aí sim! Aplica' },
        { type: 'msg-out', text: 'Pronto! Carrinho atualizado:<br>🛒 1x Creatina 300g — R$89,90<br>🛒 1x Whey Protein 900g — R$149,90<br>🛒 1x BCAA 120 cáps — R$59,90<br>🏷️ Cupom COMBO15: -15%<br>💰 Total: R$254,75<br>Como quer pagar? Pix à vista ou cartão?' },
        { type: 'msg-in', text: 'Pix!' },
        { type: 'msg-out', text: 'Aqui está seu Pix! ⬇️<br>[QR CODE PIX]<br>Chave: pix@loja.com.br<br>Valor: R$254,75<br>Válido por 30 minutos.<br>Me manda o comprovante quando pagar que eu já confirmo aqui! 😉' },
        { type: 'msg-in', text: '[envia comprovante]' },
        { type: 'msg-out', text: 'Pagamento confirmado! ✅ Seu pedido #4521 foi registrado. Prazo de entrega: 3-5 dias úteis. Vou te enviar o código de rastreio assim que sair pra entrega. Bons treinos, João! 💪' },
        { type: 'msg-system', text: '— 3 dias depois —' },
        { type: 'msg-out', text: '🎉 João, seu pedido #4521 saiu pra entrega! Rastreio: BR123456789. Acompanhe aqui: [link]. Previsão: amanhã até as 18h!' },
        { type: 'msg-system', text: '— Após entrega confirmada —' },
        { type: 'msg-out', text: 'Oi João! Seus suplementos chegaram? Tá tudo certinho? Se precisar de qualquer coisa é só chamar! 😊' },
        { type: 'msg-in', text: 'Chegou sim, tudo perfeito!' },
        { type: 'msg-out', text: '🔊 [áudio com voz humanizada]: "Que bom, João! Fico feliz que chegou tudo certo. Quando quiser repor é só me chamar que já sei tudo que você gosta. Bons treinos!"' }
    ];

    let hasStartedChat = false;

    ScrollTrigger.create({
        trigger: ".whatsapp-mockup",
        start: "top 70%",
        onEnter: () => {
            if(!hasStartedChat) {
                hasStartedChat = true;
                playChatAnimation();
            }
        }
    });

    async function playChatAnimation() {
        for (let j = 0; j < messages.length; j++) {
            const msgObj = messages[j];

            // Helper to prevent scrolling lag / freezing when user tries to scroll up manually
            const smoothScrollIfNearBottom = () => {
                const distanceToBottom = chatContainer.scrollHeight - chatContainer.scrollTop - chatContainer.clientHeight;
                if (distanceToBottom < 150) {
                    chatContainer.scrollTop = chatContainer.scrollHeight;
                }
            };

            if (msgObj.type !== 'msg-system') {
                // Add typing indicator
                const typingIndicator = document.createElement('div');
                typingIndicator.className = `msg ${msgObj.type} typing-indicator`;
                typingIndicator.innerHTML = '<i>digitando...</i>';
                typingIndicator.style.opacity = 0;
                chatContainer.appendChild(typingIndicator);
                
                gsap.to(typingIndicator, {opacity: 1, duration: 0.3, y: -5});
                smoothScrollIfNearBottom();
                
                // 3 sec delay as requested
                await new Promise(r => setTimeout(r, 3000));
                
                if (chatContainer.contains(typingIndicator)) {
                    chatContainer.removeChild(typingIndicator);
                }
            } else {
                // System message 3 sec wait
                await new Promise(r => setTimeout(r, 3000));
            }
            
            const msgEl = document.createElement('div');
            msgEl.className = `msg ${msgObj.type}`;
            msgEl.innerHTML = msgObj.text;
            chatContainer.appendChild(msgEl);
            
            // Pop in animation optimized for performance (translating Y is lighter than scaling)
            gsap.fromTo(msgEl, 
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.3, ease: "power2.out", clearProps: "transform" }
            );
            
            smoothScrollIfNearBottom();
        }
    }

    // ==========================================
    // 5. FAQ ACCORDION
    // ==========================================
    const accordions = document.querySelectorAll('.accordion-header');
    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            // Close others
            accordions.forEach(otherAcc => {
                if (otherAcc !== this) {
                    otherAcc.classList.remove('active');
                    otherAcc.nextElementSibling.style.maxHeight = null;
                }
            });

            // Toggle current
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

});
