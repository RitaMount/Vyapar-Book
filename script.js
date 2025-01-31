document.addEventListener('DOMContentLoaded', async function() {
    const { createClient } = supabase;
    const supabaseUrl = 'https://vxyztjpclxfcnlphhuwg.supabase.co';
    const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // DOM Elements
    const userDropdown = document.getElementById('userDropdown');
    const myProfile = document.getElementById('myProfile');
    const logoutBtn = document.getElementById('logoutBtn');
    const loginSignupLink = document.getElementById('loginSignup');

    async function checkAuth() {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            loginSignupLink.style.display = 'none';
            myProfile.style.display = 'block';
            logoutBtn.style.display = 'block';
        } else {
            myProfile.style.display = 'none';
            logoutBtn.style.display = 'none';
        }
    }
    checkAuth();

    // Login Form
    document.getElementById('login')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return alert(error.message);
        window.location.href = '/MuneemJi/index.html';
    });

    // Signup Form
    document.getElementById('signup')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) return alert(error.message);
        
        if (data.user) {
            await supabase.from('Users').insert([{ id: data.user.id, name, email }]);
        }
        window.location.href = '/MuneemJi/index.html';
    });

    // Profile View
    myProfile?.addEventListener('click', async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            alert(`Name: ${user.user_metadata?.name || 'Unknown'}\nEmail: ${user.email}`);
        } else {
            alert('Please log in first.');
        }
    });

    // Logout
    logoutBtn?.addEventListener('click', async () => {
        await supabase.auth.signOut();
        window.location.href = '/MuneemJi/auth.html';
    });

    // UI Enhancements
    document.querySelectorAll('.circle-button').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.backgroundColor = '#ddd';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.backgroundColor = '#f8f9fa';
        });
    });

    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = '#e9ecef';
        });
        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = 'white';
        });
    });
});
