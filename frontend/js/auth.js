const authLink = document.getElementById("authLink");

const token = localStorage.getItem("token");

if (token) {
  authLink.textContent = "Logout";
  authLink.href = "#";

  authLink.addEventListener("click", (e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");

    window.location.href = "index.html";
  });
} else {
  authLink.textContent = "Login";
  authLink.href = "login.html";
}