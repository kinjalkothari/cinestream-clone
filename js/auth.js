document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const errorMsg = document.getElementById('errorMsg');

    // Check if already logged in
    if (localStorage.getItem('cinestream_auth_v2') === 'true') {
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
            localStorage.setItem('cinestream_auth_v2', 'true');
            localStorage.setItem('cinestream_user_v2', email);
            
            // Initialize empty profile data if it doesn't exist
            if (!localStorage.getItem('cinestream_profiles_v2')) {
                const defaultProfiles = [
                    { id: 1, name: 'Main', avatar: "data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Crect width=%27100%27 height=%27100%27 fill=%27%23e50914%27/%3E%3Ctext x=%2750%27 y=%2765%27 font-size=%2750%27 font-weight=%27bold%27 text-anchor=%27middle%27 fill=%27white%27 font-family=%27Arial, sans-serif%27%3EM%3C/text%3E%3C/svg%3E" },
                    { id: 2, name: 'Kids', avatar: "data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Crect width=%27100%27 height=%27100%27 fill=%27%230071eb%27/%3E%3Ctext x=%2750%27 y=%2765%27 font-size=%2750%27 font-weight=%27bold%27 text-anchor=%27middle%27 fill=%27white%27 font-family=%27Arial, sans-serif%27%3EK%3C/text%3E%3C/svg%3E" }
                ];
                localStorage.setItem('cinestream_profiles_v2', JSON.stringify(defaultProfiles));
            }

            // Redirect to profiles page
            window.location.href = 'profiles.html';
        });
    }
});
