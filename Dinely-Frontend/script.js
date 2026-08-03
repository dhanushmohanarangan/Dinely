const form = document.getElementById("meal-form");
const formMessage = document.getElementById("form-message");

const breakfastButton = document.getElementById("breakfast-button");
const lunchButton = document.getElementById("lunch-button");
const dinnerButton = document.getElementById("dinner-button");

const breakfastCount = document.getElementById("breakfast-count");
const lunchCount = document.getElementById("lunch-count");
const dinnerCount = document.getElementById("dinner-count");

const startNewDayButton = document.getElementById("start-new-day");

const ADMIN_PASSWORD = "admin123";

const selectedMeals = {
    breakfast: false,
    lunch: false,
    dinner: false
};

breakfastButton.onclick = () => {
    selectedMeals.breakfast = !selectedMeals.breakfast;
    breakfastButton.classList.toggle("active");
};

lunchButton.onclick = () => {
    selectedMeals.lunch = !selectedMeals.lunch;
    lunchButton.classList.toggle("active");
};

dinnerButton.onclick = () => {
    selectedMeals.dinner = !selectedMeals.dinner;
    dinnerButton.classList.toggle("active");
};

loadDashboard();

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const studentName = document.getElementById("student-name").value.trim();

    if (studentName === "") {
        formMessage.textContent = "Please enter your name.";
        return;
    }

    if (
        !selectedMeals.breakfast &&
        !selectedMeals.lunch &&
        !selectedMeals.dinner
    ) {
        formMessage.textContent = "Please select at least one meal.";
        return;
    }

    formMessage.textContent = "";

    await fetch("http://localhost:8080/meals", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            studentName: studentName,
            breakfast: selectedMeals.breakfast,
            lunch: selectedMeals.lunch,
            dinner: selectedMeals.dinner
        })
    });

    form.reset();
    resetButtons();
    loadDashboard();

    alert("Meal preference submitted successfully.");
});

async function loadDashboard() {

    const response = await fetch("http://localhost:8080/meals");

    const data = await response.json();

    let breakfast = 0;
    let lunch = 0;
    let dinner = 0;

    data.forEach(item => {

        if (item.breakfast) breakfast++;
        if (item.lunch) lunch++;
        if (item.dinner) dinner++;

    });

    breakfastCount.textContent = breakfast + " Students";
    lunchCount.textContent = lunch + " Students";
    dinnerCount.textContent = dinner + " Students";
}

function resetButtons() {

    selectedMeals.breakfast = false;
    selectedMeals.lunch = false;
    selectedMeals.dinner = false;

    breakfastButton.classList.remove("active");
    lunchButton.classList.remove("active");
    dinnerButton.classList.remove("active");
}

startNewDayButton.addEventListener("click", async function () {

    const password = prompt("Enter Admin Password");

    if (password !== ADMIN_PASSWORD) {
        alert("Incorrect Password");
        return;
    }

    await fetch("http://localhost:8080/meals", {
        method: "DELETE"
    });

    loadDashboard();

    alert("New Day Started Successfully.");
});