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

function toggleChat() {
  const container = document.getElementById('chat-container');
  container.classList.toggle('chat-hidden');
}

function handleKeyPress(event) {
  if (event.key === 'Enter') sendMessage();
}

async function sendMessage() {
  const inputField = document.getElementById('user-input');
  const messageText = inputField.value.trim();

  if (!messageText) return;

  // Add User Message
  appendMessage(messageText, 'user-message');
  inputField.value = '';

  // Add Loading State
  const loadingDiv = appendMessage('Thinking...', 'bot-message');

  try {
    const response = await fetch('https://omoralimahim.vercel.app/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: messageText })
    });

    const data = await response.json();

    if (response.ok) {
      loadingDiv.textContent = data.reply;
    } else {
      loadingDiv.textContent = "Sorry, I ran into an error. Please try again later.";
    }
  } catch (err) {
    loadingDiv.textContent = "Unable to connect. Feel free to contact me directly via the form!";
  }
}

function appendMessage(text, className) {
  const chatBox = document.getElementById('chat-box');
  const msg = document.createElement('div');
  msg.className = `message ${className}`;
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
  return msg;
}

window.addEventListener('scroll', () => {
  const contactSection = document.getElementById('contact'); // Apnar contact section er ID
  const chatBtn = document.getElementById('chat-toggle-btn');
  const chatContainer = document.getElementById('chat-container');

  if (contactSection && chatBtn && chatContainer) {
    // Contact section er position ebong screen height hisab
    const rect = contactSection.getBoundingClientRect();
    
    // Contact section screen-er vetor ashle detect korbe
    if (rect.top < window.innerHeight && rect.bottom >= -100) {
      chatBtn.classList.add('chat-scroll-hidden');
      chatContainer.classList.add('chat-scroll-hidden');
    } else {
      chatBtn.classList.remove('chat-scroll-hidden');
      chatContainer.classList.remove('chat-scroll-hidden');
    }
  }
});
