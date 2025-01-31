document.addEventListener('DOMContentLoaded', function() {
    const supabaseUrl = 'https://vxyztjpclxfcnlphhuwg.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4eXp0anBjbHhmY25scGhodXdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxNTIwMzQsImV4cCI6MjA1MzcyODAzNH0.H-ni1o02i93i0uigvUXsA3h5duYpztr3mDvMVGJn8IQ';
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
    document.getElementById('login').addEventListener('submit', async (e) => {
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
    document.getElementById('signup').addEventListener('submit', async (e) => {
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

    // Show user profile
    document.getElementById('myProfile').addEventListener('click', async () => {
        const user = supabase.auth.user();
        if (user) {
            alert(`Name: ${user.name}\nEmail: ${user.email}`);
        } else {
            alert('Please log in first.');
        }
    });

    // Toggle between login and signup forms
    document.getElementById('signupLink').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('loginForm').classList.add('hidden');
        document.getElementById('signupForm').classList.remove('hidden');
    });

    document.getElementById('loginLink').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('signupForm').classList.add('hidden');
        document.getElementById('loginForm').classList.remove('hidden');
    });
});
