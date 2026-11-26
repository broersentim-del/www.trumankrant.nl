const form = document.querySelector("#poll-form");
const results = document.querySelector("#poll-results");
const storageKey = "truman-poll-results";

const storedVotes = JSON.parse(localStorage.getItem(storageKey) || "{}");
const votes = {
  leuk: storedVotes.leuk || 0,
  stom: storedVotes.stom || 0,
  saai: storedVotes.saai || 0,
};

function showResults() {
  const total = Object.values(votes).reduce((sum, count) => sum + count, 0);

  results.replaceChildren();

  for (const [label, count] of Object.entries(votes)) {
    const percentage = total ? Math.round((count / total) * 100) : 0;
    const row = document.createElement("div");
    row.className = "result-row";
    row.innerHTML = `
      <span><strong>${label[0].toUpperCase() + label.slice(1)}</strong><b>${percentage}%</b></span>
      <div class="bar" aria-hidden="true">
        <div class="bar-fill" style="width: ${percentage}%"></div>
      </div>
    `;
    results.append(row);
  }

  results.hidden = false;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const selected = new FormData(form).get("answer");
  if (!selected) return;

  votes[selected] += 1;
  localStorage.setItem(storageKey, JSON.stringify(votes));
  showResults();

  form.querySelector("button").textContent = "Bedankt voor je stem";
  form.querySelectorAll("input").forEach((input) => {
    input.disabled = true;
  });
  form.querySelector("button").disabled = true;
});
