// Existing clock logic
function updateClock() {
    const now = new Date();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayIndex = now.getDay(); // Get current day index (0 - 6)
    const currentDay = daysOfWeek[dayIndex];

    let currentTime = now.toLocaleTimeString(); // Default to local time format

    // Custom 12-hour format (AM/PM)
    let timeFormat = '12hr'; // You can make this dynamic based on user preference
    if (timeFormat === '12hr') {
        currentTime = now.toLocaleString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    } else {
        currentTime = now.toLocaleTimeString(); // 24-hour format
    }
    
// dropdown.js
document.addEventListener('DOMContentLoaded', () => {
    const clockElement = document.querySelector('.clock-container'); // Select the entire clock container
    const dropDownMenu = document.getElementById('dropdown-menu');

    clockElement.addEventListener('click', (e) => {
        // Check if the click was on the time or anywhere else inside the clock container
        if (e.target !== dropDownMenu && !dropDownMenu.contains(e.target)) {
            dropDownMenu.classList.toggle('visible'); // Toggle visibility
        }
    });
});

    // Update the time in the #date-time element
    document.getElementById("date-time").innerHTML = `${currentDay} ${currentTime}`;

    // Update the days' appearance based on the current day
    const dayElements = document.querySelectorAll(".day");
    dayElements.forEach(day => {
        if (day.id === currentDay.toLowerCase()) {
            day.classList.add("active"); // Add glow effect to current day
        } else {
            day.classList.remove("active"); // Remove glow effect from other days
        }
    });

    // Check and display alarm if set (from alarm.js)
    checkAlarm(currentTime);

    // Update background based on the time of day (from background.js)
    updateBackground();

    // Apply time change animation (from animation.js)
    animateTimeChange();
}

// Function to check alarm status (you'll implement this logic in alarm.js)
function checkAlarm(currentTime) {
    // Example of checking if the alarm time matches current time
    // Alarm logic goes here
}

// This function will update the background based on time of day
function updateBackground() {
    const body = document.body;
    const hour = new Date().getHours();

    // Remove any existing time-of-day classes before adding the new one
    body.classList.remove('sunrise', 'afternoon', 'evening', 'moonlit');

    // Apply class based on the time of day
    if (hour >= 6 && hour < 12) {
        body.classList.add('sunrise');  // Sunrise (Morning)
    } else if (hour >= 12 && hour < 18) {
        body.classList.add('afternoon');  // Afternoon
    } else if (hour >= 18 && hour < 22) {
        body.classList.add('evening');  // Evening (Sunset)
    } else {
        body.classList.add('moonlit');  // Night (Midnight to Early Morning)
    }
}

// Call updateBackground on page load and every minute (60000 ms) to handle time transitions
window.onload = function() {
    updateBackground();  // Apply the correct background when the page loads
    setInterval(updateBackground, 60000);  // Update every minute
};

// In app.js or your main JavaScript file

document.addEventListener('DOMContentLoaded', () => {
    const clockElement = document.getElementById('date-time');
    const dropDownMenu = document.getElementById('dropdown-menu');

    clockElement.addEventListener('click', () => {
        dropDownMenu.classList.toggle('visible'); // Toggle visibility when clicked
    });
});



// Call updateClock every second (1000 milliseconds)
setInterval(updateClock, 1000);
