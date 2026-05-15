document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const errorMsg = document.getElementById('errorMsg');

    // Check if already logged in
    if (localStorage.getItem('cinestream_auth') === 'true') {
        window.location.href = 'profiles.html';
    }

    // Toggle password visibility
    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePassword.classList.toggle('fa-eye');
            togglePassword.classList.toggle('fa-eye-slash');
        });
    }

    // Handle login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = emailInput.value.trim();
            const password = passwordInput.value;

            // Simple validation simulation
            if (email.length < 5 || password.length < 4) {
                errorMsg.textContent = "Please enter a valid email and password.";
                errorMsg.style.display = 'block';
                return;
            }

            // Simulate successful login
            errorMsg.style.display = 'none';
            
            // Set session in localStorage
            localStorage.setItem('cinestream_auth', 'true');
            localStorage.setItem('cinestream_user', email);
            
            // Initialize empty profile data if it doesn't exist
            if (!localStorage.getItem('cinestream_profiles')) {
                const defaultProfiles = [
                    { id: 1, name: 'Main', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Main' },
                    { id: 2, name: 'Kids', avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Kids' }
                ];
                localStorage.setItem('cinestream_profiles', JSON.stringify(defaultProfiles));
            }

            // Redirect to profiles page
            window.location.href = 'profiles.html';
        });
    }
});
