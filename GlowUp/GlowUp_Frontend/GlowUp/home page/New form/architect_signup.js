// Function to handle architect signup form submission
function redirectToArchitectSignup() {
    window.location.href = 'architect_signup.html'; // Replace with the URL of your architect signup page
  }
  
document.getElementById("architect-signup-form").addEventListener("submit", function (event) {
    event.preventDefault();
  
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const address = document.getElementById("address").value;
    const professionalTitle = document.getElementById("professionalTitle").value;
    const cname = document.getElementById("cname").value;
    const experience = document.getElementById("experience").value;
  
    // Create the architect object to send to the backend
    const architectData = {
      name: fullName,
      email: email,
      phone: phone,
      password: password,
      address: address,
      professional_title: professionalTitle,
      cname: cname,
      experience: experience
    };
  
    // Send the architect signup data to the backend API
    fetch("http://localhost:2000/architect/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(architectData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        if (data.status) {
          alert("Architect signup successful! You will now be redirected to the login page.");
          window.location.href = 'login.html'; // Replace 'login.html' with the URL of your login page
        } else {
          alert("Architect signup failed. Please try again later.");
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert("An error occurred. Please try again later.");
      });
  });
  