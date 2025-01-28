document.getElementById('businessBtn').addEventListener('click', function () {
    const dropdown = document.getElementById('businessDropdown');
    const userDropdown = document.getElementById('userDropdown');
    userDropdown.style.display = 'none';
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

document.getElementById('userBtn').addEventListener('click', function () {
    const dropdown = document.getElementById('userDropdown');
    const businessDropdown = document.getElementById('businessDropdown');
    businessDropdown.style.display = 'none';
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', function (event) {
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

const toggleFooterBtn = document.getElementById('toggleFooterBtn');
const footerButtons = document.getElementById('footerButtons');

toggleFooterBtn.addEventListener('click', function () {
    const isHidden = footerButtons.style.maxHeight === '0px';
    footerButtons.style.maxHeight = isHidden ? '150px' : '0px';
});
