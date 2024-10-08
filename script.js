// JavaScript code to handle form submission and input bar interactions

// Handle the submit event for the user form
document.getElementById('user-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
  
    // Get the user's name and organisation from the form inputs
    const userName = document.getElementById('vc-name').value.trim();
    const fundName = document.getElementById('fund-name').value.trim();
  
    if (userName === '' || fundName === '') {
      alert('Please enter both your name and organisation.');
      return;
    }
  
    // Update the list headings with the user's information
    const listHeadings = document.querySelectorAll('.list h2');
    listHeadings[0].textContent = `${userName} @ ${fundName}`;
    listHeadings[1].textContent = `Other User @ Other Organisation`;
  
    // Hide the user form after submission
    document.getElementById('user-form').style.display = 'none';
  });
  
  // Handle the submit button click in the input bar
  const chatInput = document.getElementById('chat-input');
  const sendButton = document.getElementById('send-button');
  
  // Event listener for the send button
  sendButton.addEventListener('click', function () {
    const message = chatInput.value.trim();
    if (message !== '') {
      // For now, add the message to the user's list
      addMessageToList(message, 'user');
      // Clear the input field
      chatInput.value = '';
    }
  });
  
  // Optional: Allow pressing "Enter" to submit the message
  chatInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission if inside a form
      sendButton.click();
    }
  });
  
  // Function to add a message to the list with a delete button
  function addMessageToList(message, sender) {
    let list;
    if (sender === 'user') {
      // Add to the first user's list
      list = document.querySelector('.list:nth-child(1) ul');
    } else if (sender === 'other') {
      // Add to the other user's list
      list = document.querySelector('.list:nth-child(2) ul');
    }
  
    if (list) {
      const listItem = document.createElement('li');
      listItem.textContent = message;
  
      // Create the delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '×';
      deleteBtn.className = 'delete-btn';
  
      // Add event listener to the delete button
      deleteBtn.addEventListener('click', function() {
        list.removeChild(listItem);
      });
  
      // Append the delete button to the list item
      listItem.appendChild(deleteBtn);
  
      // Append the list item to the list
      list.appendChild(listItem);
    }
  }
  
  // Function to add delete functionality to existing list items
  function addDeleteFunctionalityToExistingItems() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        const listItem = button.parentElement;
        listItem.parentElement.removeChild(listItem);
      });
    });
  }
  
  // Call the function after the DOM content is loaded
  document.addEventListener('DOMContentLoaded', function() {
    addDeleteFunctionalityToExistingItems();
  });
  
  // For demonstration purposes, simulate the other user adding messages
  // In a real application, this would be handled via a backend and real-time updates
  setTimeout(function() {
    addMessageToList('Company D', 'other');
  }, 5000);
  
  setTimeout(function() {
    addMessageToList('Company E', 'other');
  }, 10000);
  