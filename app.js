const habitForm = document.getElementById("habitForm"); // The form element
const habitInput = document.getElementById("habitInput"); // The text input for new habits
const habitList = document.getElementById("habitList"); // The <ul> element to hold the list of habits
const errorText = document.getElementById("errorText"); // The element to display error messages
const addBtn = document.getElementById("addBtn"); // 

let habits = []; // Array to hold habit objects
let nextId = 1; // Incremental ID for new habits

function setError(message) { // Set error message
    errorText.textContent = message; // Display the error message
}

function clearError() { // Clear error message
    setError("");
}

function isValidInput(value) {
    return value.trim().length > 0;
}

function syncAddButton() {
    addBtn.disabled = !isValidInput(habitInput.value);
}

function renderHabits() {
    habitList.replaceChildren();

    for (const habit of habits) {
        const li = document.createElement("li");
        li.className = "habit-item";
        li.dataset.id = String(habit.id);

        if (habit.done) li.classList.add("done");

        const label = document.createElement("label");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = habit.done;

        const span = document.createElement("span");
        span.textContent = habit.text;

        label.appendChild(checkbox);
        label.appendChild(span);
        li.appendChild(label);

        habitList.appendChild(li);
    }
}

// Enable/disable button live (also clears error once user types something valid)
habitInput.addEventListener("input", () => {
    syncAddButton();
    if (isValidInput(habitInput.value)) clearError();
});

habitForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const text = habitInput.value.trim();

    if (!text) {
        setError("Please enter a habit name.");
        habitInput.focus();
        syncAddButton();
        return;
    }

    clearError();

    habits.push({
        id: nextId++,
        text,
        done: false,
    });

    renderHabits();

    habitInput.value = "";
    habitInput.focus();
    syncAddButton();
});

// Event delegation: one listener for all checkboxes
habitList.addEventListener("change", (e) => {
    if (!e.target.matches('input[type="checkbox"]')) return;

    const li = e.target.closest("li");
    if (!li) return;

    const id = Number(li.dataset.id);
    const habit = habits.find((h) => h.id === id);
    if (!habit) return;

    habit.done = e.target.checked;
    li.classList.toggle("done", habit.done);
});

// Initial state
habitInput.focus();
syncAddButton();