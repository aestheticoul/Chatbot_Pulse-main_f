class Chatbox {
    constructor(){
    this.args = {
    openButton: document. querySelector('.chatbox __ button'),
    chatBox: document.querySelector('.chatbox __ support'),
    sendButton: document.querySelector('.send __ button')
    }
    
    this.state = false;
    this.messages = [];
}
display() {
    const {openButton, chatBox, sendButton} = this.args;
    
    openButton.addEventListener('click',  () => this.toggleState(chatBox))
    
    sendButton.addEventListener('click',  () => this.onSendButton(chatBox))
    
    const node = chatBox.querySelector( 'input');
    node.addEventListener( "keyup",  ({key : string }) => {
    if (key === "Enter") {
    this. onSendButton(chatBox)
    }
})
}
    toggleState(chatbox){
        this.state = !this.state;

        if(this.state){
            chatbox.classList.add('chatbox--active')
        } else{
            chatbox.classList.remove('chatbox--active')
        }

    }

    onSendButton(chatbox){
    var textField = chatbox.querySelector('input');
let text1 = textField.value
if (text1 === "") {
return;
}

let msg1 = { name: "User", message: text1 }
this.messages. push(msg1);

// 'http://127.0.0.1:5000/predict
fetch( $SCRIPT_ROOT + '/predict', {
method: 'POST',
body: JSON. stringify( { message: text1 }),
mode: 'cors',
headers: {
'Content-Type': 'application/json'
},
})
. then(r => r. json())
. then(r => {
let msg2 = { name: "Sam", message: r.answer };
this.messages.push(msg2);
this. updateChatText(chatbox)
textField.value = ''

}).catch((error) => {
console. error('Error:', error);
this. ypdateChatText(chatbox)
textField.value = ''
});
}
updateChatText (chatbox) {
    var html = '';
    this.messages.slice(). reverse().forEach(function(item,number ) {
    if (item.name === "Sam")
    {
    
    html += '<div class="messages __ item messages __ item -- visitor">' + item.message + '</div>'
    }
    else{
    
    html += '<div class="messages __ item messages __ item -- operator">' + item.message + '</div>'
    }
});
    const chatmessage = chatbox.querySelector('.chatbox __ messages');
    chatmessage.innerHTML = html;
}}

const chatbox = new Chatbox();
chatbox.display()