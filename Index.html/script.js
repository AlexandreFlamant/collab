// Initialize Materialize components
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Sidenav (if using)
  var sidenavs = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sidenavs);

  // Handle the submit event for the user form
  document.getElementById('user-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the user's name and organisation from the form inputs
    const userName = document.getElementById('vc-name').value.trim();
    const fundName = document.getElementById('fund-name').value.trim();

    if (userName === '' || fundName === '') {
      M.toast({html: 'Please enter both your name and organisation.'});
      return;
    }

    // Update the list headings with the user's information
    document.getElementById('user-list-title').textContent = `${userName} @ ${fundName}`;
    document.getElementById('other-list-title').textContent = `Other User @ Other Organisation`;

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
      // Add the message to the user's list
      addMessageToList(message, 'user');
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

  // Function to add a message to the list with a delete button
  function addMessageToList(message, sender) {
    let listSelector;
    if (sender === 'user') {
      // Add to the first user's list
      listSelector = '.list-container .col.s12.m6:first-child ul.collection';
    } else if (sender === 'other') {
      // Add to the other user's list
      listSelector = '.list-container .col.s12.m6:last-child ul.collection';
    }

    const list = document.querySelector(listSelector);

    if (list) {
      const listItem = document.createElement('li');
      listItem.className = 'collection-item';

      const div = document.createElement('div');
      div.textContent = message;

      // Create the delete button
      const deleteBtn = document.createElement('a');
      deleteBtn.href = '#!';
      deleteBtn.className = 'secondary-content delete-btn';
      deleteBtn.innerHTML = '<i class="material-icons">close</i>';

      // Add event listener to the delete button
      deleteBtn.addEventListener('click', function() {
        list.removeChild(listItem);
      });

      // Append the delete button to the div
      div.appendChild(deleteBtn);

      // Append the div to the list item
      listItem.appendChild(div);

      // Append the list item to the list
      list.appendChild(listItem);
    }
  }

  // Function to add delete functionality to existing list items
  function addDeleteFunctionalityToExistingItems() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        const listItem = button.parentElement.parentElement;
        listItem.parentElement.removeChild(listItem);
      });
    });
  }

  // Call the function to add delete functionality to existing items
  addDeleteFunctionalityToExistingItems();

  // For demonstration purposes, simulate the other user adding messages
  // In a real application, this would be handled via a backend and real-time updates
  setTimeout(function() {
    addMessageToList('Company D', 'other');
  }, 5000);

  setTimeout(function() {
    addMessageToList('Company E', 'other');
  }, 10000);
});
