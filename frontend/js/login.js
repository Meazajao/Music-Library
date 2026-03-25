const errorText = document.getElementById("error");

// login kod
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  errorText.textContent = "";

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Login failed");

    localStorage.setItem("token", data.token);

    window.location.href = "index.html"; // eller dashboard kanske?

  } catch (err) {
    errorText.textContent = err.message;
  }
});

// register kod
document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    errorText.textContent = "";

    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    try {
        const res = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

     if (!res.ok) throw new Error(data.message || "Registration failed");

     // om backend skickar token direkt efter
     if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "index.html";
     } else {
        errorText.textContent = "Registrering lyckades! Logga in nu.";
     }
    } catch (err) {
        errorText.textContent = err.message;
    }
});
