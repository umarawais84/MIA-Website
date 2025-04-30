// JavaScript for the about_us.html/events page
document.addEventListener("DOMContentLoaded", () => {
    // Initialize event page functionality
    initializeCalendar();
    initializeCountdownTimer();
    setupModalFunctionality();
    setupFormSubmissions();
    setupScrollAnimations();
});

// Function to initialize the calendar display
function initializeCalendar() {
    const calendarContainer = document.getElementById('calendar-container');
    if (!calendarContainer) return;

    calendarContainer.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 5px; text-align: center;">
            <div style="font-weight: bold;">Sun</div>
            <div style="font-weight: bold;">Mon</div>
            <div style="font-weight: bold;">Tue</div>
            <div style="font-weight: bold;">Wed</div>
            <div style="font-weight: bold;">Thu</div>
            <div style="font-weight: bold;">Fri</div>
            <div style="font-weight: bold;">Sat</div>
            ${generateCalendarDays()}
        </div>
    `;
}

// Helper function to generate calendar days
function generateCalendarDays() {
    let days = '';
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
    const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        days += `<div></div>`;
    }

    // Add cells for each day of the month
    for (let i = 1; i <= daysInMonth; i++) {
        if (i === 15) {
            days += `<div style="background-color: #d4af37; color: black; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; margin: auto;">${i}</div>`;
        } else if (i === 22) {
            days += `<div style="background-color: #628e75; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; margin: auto;">${i}</div>`;
        } else {
            days += `<div>${i}</div>`;
        }
    }

    return days;
}

// Function to initialize the countdown timer
function initializeCountdownTimer() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;

    // Set the date we're counting down to (May 15, 2025)
    const countDownDate = new Date("May 15, 2025 15:00:00").getTime();

    // Update the countdown every 1 second
    const x = setInterval(function () {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

        if (distance < 0) {
            clearInterval(x);
            countdownElement.innerHTML = "EXPIRED";
        }
    }, 1000);
}

// Function to setup scroll animations
function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-animation');
    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(item => {
        observer.observe(item);
    });
}

// Function to setup modal functionality
function setupModalFunctionality() {
    const modal = document.getElementById('contact-modal');
    const btn = document.getElementById('contact-modal-button');
    const span = document.querySelector('.close');

    if (!modal || !btn || !span) return;

    btn.onclick = function () {
        modal.style.display = "block";
    }

    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

// Function to setup form submissions
function setupFormSubmissions() {
    const eventSignupForm = document.getElementById('event-signup');
    const contactForm = document.getElementById('contact-form');

    if (eventSignupForm) {
        eventSignupForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for your interest! We will contact you with more details.');
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thanks for your message! We will get back to you soon.');
            document.getElementById('contact-modal').style.display = "none";
        });
    }
}
