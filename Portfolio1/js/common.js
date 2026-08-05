const floatingButton = document.getElementById("floating-button");

window.addEventListener("scroll", function () {

    if (window.scrollY > 0) {
        floatingButton.classList.add("show");
    }

    if (window.scrollY === 0) {
        floatingButton.classList.remove("show");
    }

});

floatingButton.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

document.addEventListener('copy', function(e) {
    e.preventDefault();
});

document.addEventListener('cut', function(e) {
    e.preventDefault();});

// Personal Knowledge Base provided to the AI context
const systemContext = `
You are an AI assistant for my portfolio website. 
Here is my information:
- Education: BSc in Computer Science / High School background
- Skills: HTML, CSS, JavaScript, Web Development
- Projects: E-commerce web app, Personal Portfolio, Task Manager
- Goal: Help visitors learn about my work and contact me.
Always answer politely and concisely as my personal AI agent.
`;

function toggleChat() {
  const chatContainer = document.getElementById('chat-container');
  chatContainer.classList.toggle('chat-hidden');
}

function handleKeyPress(event) {
  if (event.key === 'Enter') sendMessage();
}

async function sendMessage() {
  const inputField = document.getElementById('user-input');
  const chatBox = document.getElementById('chat-box');
  const userText = inputField.value.trim();

  if (!userText) return;

  // Render User Message
  appendMessage(userText, 'user-message');
  inputField.value = '';

  // Render Loading Placeholder
  const loadingDiv = appendMessage('Typing...', 'bot-message');

  try {
    // Call your serverless endpoint or API wrapper here
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: userText,
        context: systemContext
      })
    });
    const data = await response.json();
    loadingDiv.textContent = data.reply;
  } catch (error) {
    loadingDiv.textContent = "Sorry, I couldn't process that right now. Feel free to contact me directly!";
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}

function appendMessage(text, className) {
  const chatBox = document.getElementById('chat-box');
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${className}`;
  messageDiv.textContent = text;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
  return messageDiv;
}
