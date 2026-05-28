/**
 * Script do Site Agro Sustentável - Versão com Chatbot Encadeado
 * Gerencia o fluxo de conversa dinâmico
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 0. Efeito de Scroll (Reveal)
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Executa uma vez no início

    // Efeito de Header no Scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    
    // 1. Estrutura de Dados do Chatbot (Fluxo Encadeado)
    const chatFlow = {
        "inicio": {
            message: "Olá, estudante! Sou o AgroBot. Sobre qual tema do Agro Sustentável você quer aprender hoje?",
            options: [
                { text: "Agricultura Sustentável", next: "sustentabilidade" },
                { text: "Tecnologia no Campo", next: "tecnologia" },
                { text: "Importância Econômica", next: "economia" }
            ]
        },
        "sustentabilidade": {
            message: "A sustentabilidade busca produzir sem esgotar a natureza. O que mais quer saber sobre isso?",
            options: [
                { text: "O que são defensivos biológicos?", next: "biologicos" },
                { text: "Como economizar água?", next: "agua" },
                { text: "Voltar ao início", next: "inicio" }
            ]
        },
        "tecnologia": {
            message: "A tecnologia transforma o campo em um lugar digital e eficiente. Qual área te interessa?",
            options: [
                { text: "Uso de Drones", next: "drones" },
                { text: "Sensores de Solo", next: "sensores" },
                { text: "Voltar ao início", next: "inicio" }
            ]
        },
        "economia": {
            message: "O Agro é vital para o Brasil, alimentando o mundo e gerando empregos. Quer saber mais?",
            options: [
                { text: "Quantas pessoas o Brasil alimenta?", next: "alimentos" },
                { text: "Empregos no setor", next: "empregos" },
                { text: "Voltar ao início", next: "inicio" }
            ]
        },
        "biologicos": {
            message: "Defensivos biológicos usam a própria natureza (fungos/bactérias) para combater pragas, sem químicos tóxicos!",
            options: [
                { text: "Exemplos de biológicos", next: "exemplos_bio" },
                { text: "Voltar para Sustentabilidade", next: "sustentabilidade" }
            ]
        },
        "agua": {
            message: "Com irrigação de precisão e sensores, é possível economizar até 40% da água usada na plantação.",
            options: [
                { text: "O que é irrigação de precisão?", next: "irrigacao" },
                { text: "Voltar para Sustentabilidade", next: "sustentabilidade" }
            ]
        },
        "drones": {
            message: "Drones mapeiam falhas na plantação e podem até aplicar produtos apenas onde é necessário, economizando recursos.",
            options: [
                { text: "Outras tecnologias?", next: "tecnologia" },
                { text: "Voltar ao início", next: "inicio" }
            ]
        },
        // Respostas Finais / Folhas
        "exemplos_bio": {
            message: "Um exemplo é o uso de vespas minúsculas para controlar lagartas em plantações de cana-de-açúcar!",
            options: [{ text: "Recomeçar", next: "inicio" }]
        },
        "irrigacao": {
            message: "É um sistema que libera a quantidade exata de água que a planta precisa, no momento certo, direto na raiz.",
            options: [{ text: "Recomeçar", next: "inicio" }]
        },
        "alimentos": {
            message: "O Brasil produz comida suficiente para alimentar cerca de 1 bilhão de pessoas em todo o planeta!",
            options: [{ text: "Recomeçar", next: "inicio" }]
        },
        "empregos": {
            message: "1 em cada 3 empregos no Brasil está direta ou indiretamente ligado ao agronegócio.",
            options: [{ text: "Recomeçar", next: "inicio" }]
        },
        "sensores": {
            message: "Sensores enterrados no solo medem umidade e nutrientes em tempo real, enviando tudo para o celular do produtor.",
            options: [{ text: "Recomeçar", next: "inicio" }]
        }
    };

    // 2. Elementos do Chatbot
    const chatWindow = document.getElementById('chat-window');
    const chatOptions = document.getElementById('chat-options');

    // Função para adicionar mensagem ao chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender === 'bot' ? 'bot-message' : 'user-message');
        messageDiv.textContent = text;
        chatWindow.appendChild(messageDiv);
        
        // Rolar para o final
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    // Função para limpar e carregar novas opções
    function loadOptions(nodeKey) {
        chatOptions.innerHTML = ''; // Limpa opções atuais
        const node = chatFlow[nodeKey];
        
        node.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.classList.add('option-btn');
            btn.textContent = opt.text;
            btn.onclick = () => {
                addMessage(opt.text, 'user');
                setTimeout(() => {
                    const nextNode = chatFlow[opt.next];
                    addMessage(nextNode.message, 'bot');
                    loadOptions(opt.next);
                }, 500);
            };
            chatOptions.appendChild(btn);
        });
    }

    // 3. Menu Mobile
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Estilo simples inline para o toggle funcionar sem mudar o CSS drasticamente
            if(navLinks.classList.contains('active')) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = 'white';
                navLinks.style.padding = '20px';
            } else {
                navLinks.style.display = 'none';
            }
        });
    }

    // Inicialização do Chat
    setTimeout(() => {
        addMessage(chatFlow["inicio"].message, 'bot');
        loadOptions("inicio");
    }, 1000);

    // Efeito de scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
