document.addEventListener('DOMContentLoaded', () => {
    const businessBtn = document.getElementById('businessBtn');
    const userBtn = document.getElementById('userBtn');
    const businessDropdown = document.getElementById('businessDropdown');
    const userDropdown = document.getElementById('userDropdown');

    const toggleDropdown = (dropdown, otherDropdown) => {
        const isVisible = dropdown.style.display === 'block';
        dropdown.style.display = isVisible ? 'none' : 'block';
        otherDropdown.style.display = 'none';
    };

    businessBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown(businessDropdown, userDropdown);
    });

    userBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown(userDropdown, businessDropdown);
    });

    document.addEventListener('click', (e) => {
        if (!businessBtn.contains(e.target) && !businessDropdown.contains(e.target)) {
            businessDropdown.style.display = 'none';
        }
        if (!userBtn.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.style.display = 'none';
        }
    });
});
