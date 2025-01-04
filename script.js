// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Booking button functionality
document.querySelector('.cta-button').addEventListener('click', function () {
    alert('Booking system coming soon!');
});

// Add animation when menu items come into view
const menuItems = document.querySelectorAll('.menu-item');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

menuItems.forEach(item => {
    item.style.opacity = 0;
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.5s ease-in-out';
    observer.observe(item);
});

document.addEventListener('DOMContentLoaded', function () {
    const reservationForm = document.querySelector('.reservation-form');

    if (reservationForm) {
        reservationForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Collect form data
            const formData = new FormData(this);
            const reservationData = Object.fromEntries(formData);

            // You would typically send this data to a server
            console.log('Reservation Details:', reservationData);

            // Show success message
            alert('Thank you for your reservation! We will contact you shortly to confirm.');

            // Reset form
            this.reset();
        });
    }

    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', function () {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });

    const aboutToggle = document.querySelector('.about-toggle');
    const aboutDetails = document.querySelector('.about-details');
    const aboutImage = document.querySelector('.about-image');

    aboutToggle.addEventListener('click', function () {
        aboutToggle.classList.toggle('active');
        aboutDetails.classList.toggle('hidden');
        aboutImage.classList.toggle('hidden');
    });

    const quickContactBtn = document.getElementById('quick-contact');
    const contactPopup = document.getElementById('contact-popup');
    const closePopupBtn = document.querySelector('.close-popup');

    // Open popup when quick contact button is clicked
    quickContactBtn.addEventListener('click', function (e) {
        e.preventDefault();
        contactPopup.style.display = 'block';
    });

    // Close popup when close button is clicked
    closePopupBtn.addEventListener('click', function () {
        contactPopup.style.display = 'none';
    });

    // Close popup when clicking outside
    window.addEventListener('click', function (e) {
        if (e.target === contactPopup) {
            contactPopup.style.display = 'none';
        }
    });

    // Add event listeners to all order buttons
    document.querySelectorAll('.order-now-btn').forEach(button => {
        button.addEventListener('click', function () {
            const itemName = this.dataset.item;
            const itemPrice = this.dataset.price;

            // Scroll to order section
            document.querySelector('#order').scrollIntoView({ behavior: 'smooth' });

            // Pre-select the item in the order form
            const foodItems = document.querySelector('#food-items');
            for (let option of foodItems.options) {
                if (option.value === itemName) {
                    option.selected = true;
                    // Trigger change event to update total
                    foodItems.dispatchEvent(new Event('change'));
                    break;
                }
            }
        });
    });

    // Contact section toggle
    document.querySelector('a[href="#contact"]').addEventListener('click', function (e) {
        e.preventDefault();
        const contactSection = document.querySelector('.contact-section');
        contactSection.classList.remove('hidden');
        contactSection.classList.add('show');

        // Scroll to contact section
        contactSection.scrollIntoView({ behavior: 'smooth' });
    });
});

function calculateTotal() {
    const selectedItems = document.getElementById('food-items').selectedOptions;
    let foodCost = 0;
    const deliveryCost = 5.00;

    // Calculate food cost
    for (let item of selectedItems) {
        foodCost += parseFloat(item.dataset.price);
    }

    // Update display
    document.getElementById('food-cost').textContent = `$${foodCost.toFixed(2)}`;
    document.getElementById('delivery-cost').textContent = `$${deliveryCost.toFixed(2)}`;

    // Calculate and display total
    const total = foodCost + deliveryCost;
    document.getElementById('total-cost').textContent = `$${total.toFixed(2)}`;
} 