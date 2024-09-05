// Function to show the schedule for a given day
function showSchedule(day) {
    // Hide all schedules
    const schedules = document.querySelectorAll('.schedule');
    schedules.forEach(schedule => {
        schedule.style.display = 'none';
    });

    // Show the schedule for the specified day
    const scheduleToShow = document.getElementById(day);
    if (scheduleToShow) {
        scheduleToShow.style.display = 'block';
    }
}

// Function to highlight the button of the current day
function highlightCurrentDay(day) {
    const days = ["sat", "sun", "mon", "tue", "wed", "thu", "fri"];

    // Remove 'active' class from all buttons
    const buttons = document.querySelectorAll('.day');
    buttons.forEach(button => button.classList.remove('active'));

    // Highlight the specified day's button
    const currentDayButton = document.querySelector(`.day[onclick="showSchedule('${day}')"]`);
    if (currentDayButton) {
        currentDayButton.classList.add('active');
    }
}

// Function to determine the current day and show the corresponding schedule
function setTodaySchedule() {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();
    const dayMap = {
        'sun': 'sun',
        'mon': 'mon',
        'tue': 'tue',
        'wed': 'wed',
        'thu': 'thu',
        'fri': 'fri',
        'sat': 'sat'
    };
    const day = dayMap[today] || 'tue'; // Default to 'tue' if today is not in the map

    showSchedule(day);
    highlightCurrentDay(day); // Pass the current day to highlight the button
}

// Call setTodaySchedule when the page loads
window.onload = function() {
    setTodaySchedule();
};

// Function to display today's date in the top-right corner
function displayCurrentDate() {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    document.getElementById("current-date").textContent = formattedDate;
}

// Save the schedule
document.getElementById("save-btn").addEventListener("click", function() {
    let courseData = {};

    // Loop through inputs and save the data
    document.querySelectorAll(".course-input").forEach(input => {
        let id = input.id;
        let value = input.innerText; // Use innerText to get the content of contenteditable elements
        courseData[id] = value;
    });

    // Save to localStorage (or send to a server)
    localStorage.setItem("schedule", JSON.stringify(courseData));
    alert("Schedule saved!");
});

// Function to clear the content of the third column
function clearThirdColumn() {
    // Assuming that the third column contains elements with a class of 'course-input'
    document.querySelectorAll('td:nth-child(3)').forEach(td => {
        td.textContent = ''; // Clear the content of each cell in the third column
    });

    // Optionally clear the saved data from localStorage
    localStorage.removeItem("schedule");
    alert("Notes Cleared!");
}

// Add event listener for the "Clear" button
document.getElementById("clear-btn").addEventListener("click", function() {
    clearThirdColumn();
});

// To load the data back after saving:
window.addEventListener("load", function() {
    let savedData = JSON.parse(localStorage.getItem("schedule"));
    if (savedData) {
        for (let id in savedData) {
            document.getElementById(id).innerText = savedData[id];
        }
    }

    // Highlight today's day button
    setTodaySchedule();

    // Display today's date
    displayCurrentDate();
});

// Example JavaScript to handle dropdown behavior if needed
document.addEventListener('DOMContentLoaded', function() {
    // Your dropdown behavior code here (if any)
});
