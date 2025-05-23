document.addEventListener("DOMContentLoaded", () => {
    // Select all bubble elements and the container they reside in
    const bubbles = document.querySelectorAll(".bubble");
    const container = document.querySelector(".bubble-container");

    // Initialize an array with random position and movement data for each bubble
    const bubbleData = Array.from(bubbles).map((bubble) => {
        return {
            el: bubble, // Store the bubble element
            x: Math.random() * (container.clientWidth - bubble.offsetWidth), // Random horizontal position
            y: Math.random() * (container.clientHeight - bubble.offsetHeight), // Random vertical position
            dx: (Math.random() - 0.5) * 2, // Random horizontal movement direction and speed
            dy: (Math.random() - 0.5) * 2, // Random vertical movement direction and speed
        };
    });

    // Function to animate the bubbles' movement
    function animate() {
        bubbleData.forEach((b) => {
            b.x += b.dx; // Update the bubble's horizontal position
            b.y += b.dy; // Update the bubble's vertical position

            // Reverse direction if bubble hits the container's boundaries
            if (b.x <= 0 || b.x + b.el.offsetWidth >= container.clientWidth) b.dx *= -1;
            if (b.y <= 0 || b.y + b.el.offsetHeight >= container.clientHeight) b.dy *= -1;

            // Apply the new position to the bubble
            b.el.style.left = b.x + "px";
            b.el.style.top = b.y + "px";
        });

        // Continue the animation with the next frame
        requestAnimationFrame(animate);
    }

    // Start the animation
    animate();

    // Initialize calendar, countdown, modal, and form functionality if specific elements are present
    if (document.getElementById('calendar-container')) {
    }
});

// Function to generate and display a simple calendar in the 'calendar-container'
function initializeCalendar() {
    const calendarContainer = document.getElementById('calendar-container');
    if (!calendarContainer) return;

    // Populate the calendar with the days of the week and the days of the month
    calendarContainer.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px; text-align: center;">
            <div style="font-weight: bold;">Sun</div>
            <div style="font-weight: bold;">Mon</div>
            <div style="font-weight: bold;">Tue</div>
            <div style="font-weight: bold;">Wed</div>
            <div style="font-weight: bold;">Thu</div>
            <div style="font-weight: bold;">Fri</div>
            <div style="font-weight: bold;">Sat</div>
            ${generateCalendarDays()} <!-- Call to function that generates the calendar days -->
        </div>
    `;
}

// Function to set up scroll animations for elements with the 'scroll-animation' class
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-animation');
    if (animatedElements.length === 0) return;

    // Create an IntersectionObserver to trigger animations when elements scroll into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Add 'visible' class when element is in view
            }
        });
    }, { threshold: 0.1 });

    // Observe all animated elements
    animatedElements.forEach(item => {
        observer.observe(item);
    });
}


