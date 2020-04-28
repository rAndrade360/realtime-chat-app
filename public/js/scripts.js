let socket = io("http://localhost:3333");
let button = document.querySelector("button");
let form = document.querySelector("form");
let inputMessage = document.querySelector("#message");
let inputUser = document.querySelector("#user");
let divMessages = document.querySelector("#messageContainer");
let localsMessages = [];

function renderMessages() {
  let userMessage = document.createTextNode;
  let textMessage = document.createTextNode;
  let boxMessage = document.createTextNode;
  boxMessage = divMessages.value || "";

  for (message of localsMessages) {
    textMessage = message.message;
    userMessage = message.user;
    boxMessage =
      boxMessage + `<div><strong>${userMessage}</strong>: ${textMessage}</div>`;
    divMessages.innerHTML = boxMessage;
  }
}

socket.on("previousMessages", (messages) => {
  localsMessages = messages;
  renderMessages();
});

socket.on("receivedMessage", (messages) => {
  localsMessages.push(messages);
  renderMessages();
});

form.onsubmit = (e) => {
  e.preventDefault();
  let message = {
    user: inputUser.value,
    message: inputMessage.value,
  };
  localsMessages.push(message);
  renderMessages();
  socket.emit("sendMessage", message);
};
