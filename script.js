// script.js
document.getElementById('businessBtn').addEventListener('click', function(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('businessDropdown');
    const userDropdown = document.getElementById('userDropdown');
    userDropdown.style.display = 'none';
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

document.getElementById('userBtn').addEventListener('click', function(event) {
    event.stopPropagation();
    const dropdown = document.getElementById('userDropdown');
    const businessDropdown = document.getElementById('businessDropdown');
    businessDropdown.style.display = 'none';
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    const businessBtn = document.getElementById('businessBtn');
    const userBtn = document.getElementById('userBtn');
    const businessDropdown = document.getElementById('businessDropdown');
    const userDropdown = document.getElementById('userDropdown');

    if (!businessBtn.contains(event.target) && !businessDropdown.contains(event.target)) {
        businessDropdown.style.display = 'none';
    }
    if (!userBtn.contains(event.target) && !userDropdown.contains(event.target)) {
        userDropdown.style.display = 'none';
    }
});
