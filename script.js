// MuneemJi/script.js
document.addEventListener('DOMContentLoaded', function() {
    const supabaseUrl = 'YOUR_SUPABASE_URL';
    const supabaseKey = 'YOUR_SUPABASE_KEY';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // DOM Elements
    const businessBtn = document.getElementById('businessBtn');
    const userBtn = document.getElementById('userBtn');
    const businessDropdown = document.getElementById('businessDropdown');
    const userDropdown = document.getElementById('userDropdown');
    const toggleFooterBtn = document.getElementById('toggleFooterBtn');
    const footerButtons = document.getElementById('footerButtons');

    // Toggle business dropdown
    businessBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const isVisible = businessDropdown.style.display === 'block';
        // Hide user dropdown
        userDropdown.style.display = 'none';
        // Toggle business dropdown
        businessDropdown.style.display = isVisible ? 'none' : 'block';
    });

    // Toggle user dropdown
    userBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        const isVisible = userDropdown.style.display === 'block';
        // Hide business dropdown
        businessDropdown.style.display = 'none';
        // Toggle user dropdown
        userDropdown.style.display = isVisible ? 'none' : 'block';
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        businessDropdown.style.display = 'none';
        userDropdown.style.display = 'none';
    });

    // Prevent dropdown from closing when clicking inside it
    businessDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    userDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Toggle footer
    toggleFooterBtn.addEventListener('click', function() {
        const isHidden = footerButtons.style.maxHeight === '0px';
        footerButtons.style.maxHeight = isHidden ? '150px' : '0px';
        toggleFooterBtn.textContent = isHidden ? 'v' : '^';
    });

    // Initialize footer
    footerButtons.style.maxHeight = '150px';

    // Handle login
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const { user, error } = await supabase.auth.signIn({
                email,
                password
            });
            if (error) throw error;
            console.log('User logged in:', user);
            // Redirect to dashboard or another page after successful login
            window.location.href = '/MuneemJi/index.html';
        } catch (error) {
            alert(error.message);
        }
    });

    // Handle signup
    document.getElementById('signupForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const { user, error } = await supabase.auth.signUp({
                email,
                password
            });
            if (error) throw error;
            console.log('User signed up:', user);
            // Save additional user details to the database
            await supabase.from('Users').insert([
                { name, email, password }
            ]);
            // Redirect to dashboard or another page after successful signup
            window.location.href = '/MuneemJi/index.html';
        } catch (error) {
            alert(error.message);
        }
    });
});
