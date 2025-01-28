document.addEventListener('DOMContentLoaded', function() {
    const businessBtn = document.getElementById('businessBtn');
    const userBtn = document.getElementById('userBtn');
    const businessDropdown = document.getElementById('businessDropdown');
    const userDropdown = document.getElementById('userDropdown');

    function toggleDropdown(dropdown, otherDropdown) {
        if (dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
        } else {
            dropdown.style.display = 'block';
            otherDropdown.style.display = 'none';
        }
    }

    businessBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleDropdown(businessDropdown, userDropdown);
    });

    userBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleDropdown(userDropdown, businessDropdown);
    });

    document.addEventListener('click', function(e) {
        if (!businessBtn.contains(e.target) && !businessDropdown.contains(e.target)) {
            businessDropdown.style.display = 'none';
        }
        if (!userBtn.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.style.display = 'none';
        }
    });
});
