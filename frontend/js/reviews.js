const API_URL = "http://localhost:3000/reviews";

const reviewForm = document.getElementById("reviewForm");
const reviewList = document.getElementById("reviewList");
const message = document.getElementById("message");
const loadReviewsBtn = document.getElementById("loadReviews");

function getToken() {
  return localStorage.getItem("token");
}

// Hämta reviews
async function loadReviews() {
  reviewList.innerHTML = "";

  try {
    const response = await fetch(API_URL);
    const reviews = await response.json();

    reviews.forEach(review => {
      const li = document.createElement("li");

      li.innerHTML = `
        <strong>${review.title}</strong>
        (${review.rating}/5)
        <br>
        ${review.content}
        <br>
        ${new Date(review.createdAt).toLocaleString()}
        <br>
        <button onclick="deleteReview('${review._id}')">Delete</button>
        <hr>
      `;

      reviewList.appendChild(li);
    });

  } catch (error) {
    message.textContent = "Kunde inte hämta reviews";
  }
}

// Skapa review
reviewForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const token = getToken();
  if (!token) {
    message.textContent = "Du måste vara inloggad.";
    return;
  }

  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  const rating = document.getElementById("rating").value;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
      body: JSON.stringify({
        title,
        content,
        rating
      })
    });

    if (!response.ok) {
      throw new Error();
    }

    message.textContent = "Review skapad!";
    reviewForm.reset();
    loadReviews();

  } catch {
    message.textContent = "Fel vid skapande av review";
  }
});

// Ta bort review
async function deleteReview(id) {
  const token = getToken();
  if (!token) {
    alert("Du måste vara inloggad.");
    return;
  }

  try {
    await fetch(API_URL + "/" + id, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    loadReviews();
  } catch {
    alert("Kunde inte ta bort review");
  }
}

loadReviewsBtn.addEventListener("click", loadReviews);

// Ladda reviews direkt
loadReviews();
