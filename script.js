const emotionBoxes = document.querySelectorAll(".emotion-box");
const tasksSection = document.querySelector(".tasks-section");
const progressCircleContainer = document.querySelector(".progress-circle-container");
const satisfactionQuestionContainer = document.querySelector(".satisfaction-question-container");
const taskCheckboxes = document.querySelectorAll(".task-checkbox");
const stressLevelSlider = document.getElementById("stress-level");
const energyLevelSlider = document.getElementById("energy-level");
const stressValue = document.getElementById("stress-value");
const energyValue = document.getElementById("energy-value");
const stressAdvice = document.getElementById("stress-advice");
const energyAdvice = document.getElementById("energy-advice");

const tasksData = {
    happy: ["Take a walk", "Listen to music", "Call a friend", "Do something creative", "Watch a funny show", "Exercise", "Meditate", "Eat something healthy", "Practice gratitude", "Read a book"],
    sad: ["Journal your feelings", "Talk to someone you trust", "Listen to music", "Cry if you need to", "Take a warm bath", "Practice self-compassion", "Watch a comforting movie", "Read a book", "Rest", "Draw or paint"],
    anxious: ["Deep breathing", "Go for a walk", "Talk to a therapist", "Write down your worries", "Do a calming activity", "Listen to calming music", "Practice mindfulness", "Drink water", "Do some stretches", "Meditate"],
    angry: ["Take deep breaths", "Go for a run", "Talk to someone you trust", "Do a physical activity", "Write about your feelings", "Take a break", "Practice self-compassion", "Drink water", "Do some stretches", "Watch a calming video"],
    depressed: ["Call a friend", "Talk to a therapist", "Go for a walk", "Write in a journal", "Listen to uplifting music", "Practice mindfulness", "Eat a healthy meal", "Do something creative", "Rest", "Do something kind for someone"],
    stressed: ["Take deep breaths", "Go for a walk", "Meditate", "Take a break", "Talk to someone you trust", "Listen to music", "Practice mindfulness", "Do a relaxing activity", "Drink water", "Do some stretches"]
};

// Show tasks and progress bar when an emotion is clicked
emotionBoxes.forEach((box) => {
    box.addEventListener("click", () => {
        const emotion = box.dataset.emotion;
        
        // Show tasks and progress circle when emotion box is clicked
        tasksSection.style.display = 'block'; // Show tasks section
        progressCircleContainer.style.display = 'block'; // Show progress circle

        // Clear previous tasks
        const tasksContainer = tasksSection.querySelector(".tasks-container");
        tasksContainer.innerHTML = `<div class="tasks-left"></div><div class="tasks-right"></div>`;

        const tasksLeft = tasksContainer.querySelector(".tasks-left");
        const tasksRight = tasksContainer.querySelector(".tasks-right");

        tasksData[emotion].forEach((task, index) => {
            const taskItem = document.createElement("div");
            taskItem.classList.add("task-item");
            taskItem.innerHTML = `${task} <input type="checkbox" class="task-checkbox">`;
            if (index < 5) {
                tasksLeft.appendChild(taskItem);
            } else {
                tasksRight.appendChild(taskItem);
            }
        });

        updateProgressCircle(); // Update the progress bar initially
        checkTasksCompletion(); // Check if all tasks are checked
    });
});

// Update progress when task checkboxes are changed
tasksSection.addEventListener('change', (event) => {
    if (event.target.classList.contains("task-checkbox")) {
        updateProgressCircle();
        checkTasksCompletion();
    }
});

// Function to update the progress circle
function updateProgressCircle() {
    const totalTasks = document.querySelectorAll(".task-checkbox").length;
    const checkedTasks = Array.from(document.querySelectorAll(".task-checkbox")).filter(checkbox => checkbox.checked).length;
    const progress = (checkedTasks / totalTasks) * 100;
    const progressCircle = document.querySelector(".progress-circle");
    const progressText = document.querySelector(".progress-circle-text");

    progressCircle.style.background = `conic-gradient(#4caf50 ${progress}%, #ddd ${progress}%)`;
    progressText.textContent = `${Math.round(progress)}%`;
}

// Check if all tasks are checked and show satisfaction question
function checkTasksCompletion() {
    const allChecked = Array.from(document.querySelectorAll(".task-checkbox")).every(checkbox => checkbox.checked);
    if (allChecked) {
        satisfactionQuestionContainer.style.display = 'block'; // Show satisfaction question
    } else {
        satisfactionQuestionContainer.style.display = 'none'; // Hide satisfaction question
    }
}

// Update stress advice based on the stress level slider
function updateStressAdvice() {
    const stressLevel = stressLevelSlider.value;
    stressValue.textContent = stressLevel;

    if (stressLevel <= 3) {
        stressAdvice.textContent = "You are feeling relaxed. Keep it up!";
    } else if (stressLevel <= 7) {
        stressAdvice.textContent = "You're a bit stressed. Try some relaxation techniques.";
    } else {
        stressAdvice.textContent = "You're feeling stressed. Consider taking a break.";
    }
}

// Update energy advice based on the energy level slider
function updateEnergyAdvice() {
    const energyLevel = energyLevelSlider.value;
    energyValue.textContent = energyLevel;

    if (energyLevel <= 3) {
        energyAdvice.textContent = "You have low energy. Consider resting.";
    } else if (energyLevel <= 7) {
        energyAdvice.textContent = "You're feeling somewhat energetic. Keep going!";
    } else {
        energyAdvice.textContent = "You're full of energy! Use it wisely.";
    }
}
