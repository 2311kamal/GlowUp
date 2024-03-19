function redirectToUserSignup() {
    window.location.href = 'user_signup.html'; // Replace with the URL of your user signup page
  }
  
// Function to handle user signup form submission
document.getElementById("user-signup-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
    // Get form data
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const address = document.getElementById("address").value;
  
    // Perform form validation (you can customize this according to your needs)
    if (!fullName || !email || !password || !address) {
      alert("Please fill in all the required fields.");
      return;
    }
  
    // Create an object to store user data (you can customize this structure)
    const userData = {
      fullName: fullName,
      email: email,
      password: password,
      address: address,
    };
  
    // Assuming you have an API endpoint to handle user signup, you can make a POST request here
    // Replace 'http://localhost:2000/user/v1/auth/signup' with the actual URL of your backend API
    fetch("http://localhost:2000/user/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        if (data.status) {
          alert("User signup successful! You will now be redirected to the login page.");
          window.location.href = 'login.html'; // Replace 'login.html' with the URL of your login page
        } else {
          alert("User signup failed. Please try again later.");
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("An error occurred. Please try again later.");
      });
  });
  