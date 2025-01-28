// script.js
document.addEventListener('DOMContentLoaded', () => {
    const businessBtn = document.getElementById('businessBtn');
    const userBtn = document.getElementById('userBtn');
    const businessDropdown = document.getElementById('businessDropdown');
    const userDropdown = document.getElementById('userDropdown');

    // Toggle business dropdown
    businessBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        businessDropdown.classList.toggle('show');
        userDropdown.classList.remove('show');
    });

    // Toggle user dropdown
    userBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle('show');
        businessDropdown.classList.remove('show');
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        businessDropdown.classList.remove('show');
        userDropdown.classList.remove('show');
    });

    // Prevent dropdown from closing when clicking inside
    businessDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    userDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Add click animation to bottom nav buttons
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 100);
        });
    });
});
