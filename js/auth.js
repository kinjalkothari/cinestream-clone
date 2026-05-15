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
                    { id: 1, name: 'Main', avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23e50914'/%3E%3Ctext x='50' y='65' font-size='50' font-weight='bold' text-anchor='middle' fill='white' font-family='Arial, sans-serif'%3EM%3C/text%3E%3C/svg%3E" },
                    { id: 2, name: 'Kids', avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%230071eb'/%3E%3Ctext x='50' y='65' font-size='50' font-weight='bold' text-anchor='middle' fill='white' font-family='Arial, sans-serif'%3EK%3C/text%3E%3C/svg%3E" }
                ];
                localStorage.setItem('cinestream_profiles', JSON.stringify(defaultProfiles));
            }

            // Redirect to profiles page
            window.location.href = 'profiles.html';
        });
    }
});
