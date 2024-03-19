document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const email = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Get the selected role value
  let role;
  const roleRadios = document.getElementsByName('role');
  console.log(roleRadios);
  for (const radio of roleRadios) {
    if (radio.checked) {
      role = radio.value;
      break;
    }
  }
  console.log(role);

  // Ensure a role is selected before proceeding
  if (!role) {
    console.log('Please select a role.');
    return;
  }

  let apiUrl = '';

  // Determine the API endpoint based on the selected role
  if (role === 'user') {
    apiUrl = 'http://localhost:2000/user/v1/auth/signin'; // Replace with the URL for user login API
  } else if (role === 'client') {
    apiUrl = 'http://localhost:2000/client/v1/auth/signin'; // Replace with the URL for client login API
  } else if (role === 'admin') {
    apiUrl = '/admin_login'; // Replace with the URL for admin login API
  }
  console.log(apiUrl);

  // Send the login data to the appropriate backend API
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.status) {
      console.log(data.status);
      // Login successful, redirect to the appropriate dashboard
      alert("Login successful! You will now be redirected to the Dashboard.");
      if (role === 'user') {
        window.location.href = 'Admin/index.html';
      } else if (role === 'client') {
        window.location.href = 'client_dashboard.html';
      } else if (role === 'admin') {
        window.location.href = 'admin_dashboard.html';
      }
    } else {
      // Login failed, show error message or handle appropriately
      alert("Login failed. Please try again later.");
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});

function redirectToSignup() {
  // Replace 'signup.html' with the URL of your signup page
  window.location.href = 'signup.html';
}
