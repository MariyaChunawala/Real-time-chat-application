const socket = io();
let name;
let textarea = document.querySelector('#textarea');
let chat_area = document.querySelector('.chat_area');

do {
    name = prompt('Enter your name:');
} while (!name);

textarea.addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {
        sendMessage(e.target.value);
    }
});

function sendMessage(message) {
    let msg = {
        user: name,
        message: message
    }

    appendMessage(msg, 'outgoing');
    textarea.value = '';
    scrollTop();

    socket.emit('message', msg);
}

function appendMessage(msg, type) {
    let div = document.createElement('div');
    let className = type;
    div.classList.add(className, 'message');
    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;
    div.innerHTML = markup;
    chat_area.appendChild(div);
}

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollTop();
})

function scrollTop(){
    chat_area.scrollTop = chat_area.scrollHeight;
}