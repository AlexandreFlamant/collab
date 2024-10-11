// Initialize Materialize components
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Sidenav (if using)
  var sidenavs = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sidenavs);

  // Define sender and receiver names
  const senderName = 'Alex @ HCVC';
  const receiverName = 'Bob @ Nope Capital';
  const receiverInitials = getInitials(receiverName);

  // Handle the submit button click in the input bar
  const chatInput = document.getElementById('chat-input');
  const sendButton = document.getElementById('send-button');
  const chatMessages = document.querySelector('.chat-messages');

  // Event listener for the send button
  sendButton.addEventListener('click', function () {
    const message = chatInput.value.trim();
    if (message !== '') {
      // Add the message to the chat
      addMessageToChat(message, 'sender');
      // Clear the input field
      chatInput.value = '';
      // Re-focus on the input field
      chatInput.focus();
    } else {
      M.toast({html: 'Please enter a message.'});
    }
  });

  // Allow pressing "Enter" to submit the message
  chatInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission if inside a form
      sendButton.click();
    }
  });

  // Function to add a message to the chat with optional avatar
  function addMessageToChat(message, senderType) {
    const listItem = document.createElement('li');
    listItem.className = senderType === 'sender' ? 'sender-message' : 'receiver-message';

    // Avatar for receiver
    let avatar = null;
    if (senderType === 'receiver') {
      avatar = document.createElement('div');
      avatar.className = 'avatar';
      avatar.textContent = receiverInitials;
    }

    // Message content wrapper
    const messageContentWrapper = document.createElement('div');
    messageContentWrapper.className = 'message-content-wrapper';

    // Message content
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = message;

    // Delete button
    const deleteBtn = document.createElement('span');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = '×'; // Use '×' character for 'X' icon

    // Add event listener to the delete button
    deleteBtn.addEventListener('click', function() {
      chatMessages.removeChild(listItem);
    });

    // Append message content and delete button to message content wrapper
    messageContentWrapper.appendChild(messageContent);
    messageContentWrapper.appendChild(deleteBtn);

    // Append avatar and message content wrapper to list item
    if (avatar) {
      listItem.appendChild(avatar);
    }
    listItem.appendChild(messageContentWrapper);

    // Append the list item to the chat messages
    chatMessages.appendChild(listItem);

    // Scroll to the bottom of the chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Function to get the initial of the first name
  function getInitials(name) {
    const names = name.split(' ');
    for (let i = 0; i < names.length; i++) {
      const word = names[i];
      if (word !== '@') {
        // Return the first letter of the first word that's not '@'
        return word.charAt(0).toUpperCase();
      }
    }
    return ''; // Return empty string if no valid name found
  }

  // Simulate receiving messages from the other user
  setTimeout(function() {
    addMessageToChat('Hello Alex! How are you?', 'receiver');
  }, 3000);

  setTimeout(function() {
    addMessageToChat('Did you check the latest updates?', 'receiver');
  }, 8000);
});
