/**
 * Script do Site Agro Sustentável
 * Gerencia o Chatbot e interações básicas
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Dados do Chatbot (Perguntas e Respostas)
    const chatData = [
        {
            question: "O que é agricultura sustentável?",
            answer: "A agricultura sustentável é um modelo que busca produzir alimentos sem esgotar os recursos naturais, preservando a biodiversidade, o solo e a água para as gerações futuras."
        },
        {
            question: "Como a tecnologia ajuda no campo?",
            answer: "A tecnologia, como drones, GPS e sensores de solo, permite o uso preciso de insumos, reduzindo desperdícios e aumentando a produtividade de forma ecológica."
        },
        {
            question: "O que são defensivos biológicos?",
            answer: "São produtos feitos a partir de organismos vivos (como fungos ou bactérias do bem) para combater pragas, sendo muito menos agressivos ao meio ambiente que os químicos tradicionais."
        },
        {
            question: "Qual a importância do Agro para o Brasil?",
            answer: "O agronegócio é um dos principais motores da economia brasileira, gerando milhões de empregos e garantindo a segurança alimentar do país e do mundo."
        }
    ];

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

    // Função para processar a escolha do usuário
    function handleChoice(item) {
        // Adiciona a pergunta do usuário
        addMessage(item.question, 'user');
        
        // Pequeno delay para simular o bot "pensando"
        setTimeout(() => {
            addMessage(item.answer, 'bot');
        }, 600);
    }

    // Inicializar opções do chat
    function initChat() {
        chatData.forEach(item => {
            const btn = document.createElement('button');
            btn.classList.add('option-btn');
            btn.textContent = item.question;
            btn.addEventListener('click', () => handleChoice(item));
            chatOptions.appendChild(btn);
        });
    }

    // 3. Menu Mobile (Simples)
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = 'white';
            navLinks.style.padding = '20px';
        });
    }

    // Inicialização
    initChat();

    // Efeito de scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
