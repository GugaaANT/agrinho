/* ============================================================
   AGROBOT – Integração com Google AI SDK (ESM)
   Agricultura & Meio Ambiente | Agrinho 2026
   ============================================================ */

// Importando o SDK do Google diretamente via CDN para funcionar no navegador
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

const API_KEY = "AIzaSyBUlaktv0Qe0DIJd-ymCuuaJHDmpZZvYHk";
const genAI = new GoogleGenerativeAI(API_KEY);

// Configuração do Modelo (usando o solicitado pelo usuário)
const model = genAI.getGenerativeModel({ 
    model: "gemini-3-flash-preview",
    systemInstruction: "Você é o AgroBot, assistente do projeto Agrinho 2026. Tema: Agro forte, futuro sustentável. Responda em Português do Brasil com emojis e foco em sustentabilidade."
});

/* ============================================================
   FUNÇÃO DE CHAMADA (ESTRUTURA SOLICITADA)
   ============================================================ */
async function getBotResponse(userInput) {
    try {
        const result = await model.generateContent(userInput);
        const response = await result.response;
        const text = response.text();
        
        return formatResponse(text);
    } catch (error) {
        console.error("Erro no AgroBot:", error);
        return `❌ **Erro:** ${error.message}. Verifique se sua chave está ativa e se o modelo 'gemini-3-flash-preview' está disponível para você.`;
    }
}

/* ============================================================
   AUXILIARES E INTERFACE
   ============================================================ */

function formatResponse(text) {
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    formatted = formatted.replace(/\n/g, '<br>');
    return formatted;
}

function escapeHtml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function sendMessage() {
    const input = document.getElementById("chatInput");
    const text = input.value.trim();
    if (!text) return;

    addMessage("chatMessages", text, "user");
    input.value = "";

    const suggestions = document.getElementById("chatSuggestions");
    if (suggestions) suggestions.style.display = "none";

    showTyping("chatMessages");
    const response = await getBotResponse(text);
    removeTyping("chatMessages");
    addMessage("chatMessages", response, "bot");
}

async function sendFloatingMessage() {
    const input = document.getElementById("floatingInput");
    const text = input.value.trim();
    if (!text) return;

    addMessage("floatingMessages", text, "user");
    input.value = "";

    showTyping("floatingMessages");
    const response = await getBotResponse(text);
    removeTyping("floatingMessages");
    addMessage("floatingMessages", response, "bot");
}

// Tornando as funções globais para o HTML conseguir chamar
window.sendMessage = sendMessage;
window.sendFloatingMessage = sendFloatingMessage;
window.sendSuggestion = (el) => {
    document.getElementById("chatInput").value = el.textContent;
    sendMessage();
};
window.toggleFloatingChat = () => {
    document.getElementById("floatingChat").classList.toggle("open");
};

function addMessage(containerId, text, type) {
    const container = document.getElementById(containerId);
    const div = document.createElement("div");
    div.className = `message ${type === "bot" ? "bot-message" : "user-message"}`;
    if (type === "bot") {
        div.innerHTML = `<div class="message-avatar">🌱</div><div class="message-bubble">${text}</div>`;
    } else {
        div.innerHTML = `<div class="message-bubble">${escapeHtml(text)}</div><div class="message-avatar">👤</div>`;
    }
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function showTyping(containerId) {
    const container = document.getElementById(containerId);
    const div = document.createElement("div");
    div.className = "message bot-message typing-indicator";
    div.id = `typing-${containerId}`;
    div.innerHTML = `<div class="message-avatar">🌱</div><div class="message-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function removeTyping(containerId) {
    const el = document.getElementById(`typing-${containerId}`);
    if (el) el.remove();
}

// Event Listeners
document.getElementById("chatInput").addEventListener("keydown", (e) => { if (e.key === "Enter") sendMessage(); });
document.getElementById("floatingInput").addEventListener("keydown", (e) => { if (e.key === "Enter") sendFloatingMessage(); });
document.getElementById("sendBtn").addEventListener("click", sendMessage);
