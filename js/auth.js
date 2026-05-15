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
                    { id: 1, name: 'Main', avatar: 'https://occ-0-4857-2164.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXz4LMjMiMacKUdfl3879fL8g-A58b7Pz1I4fN2yXFjJ2Bssw1v-aD0H-76-2h5K20l1A2t-rNhh14QY6Z8s2Yg3n1Ld8eW.png?r=1d4' },
                    { id: 2, name: 'Kids', avatar: 'https://occ-0-4857-2164.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABQww-PjUv3Y-MvF5R_GgW_E3-L7ZkF4q8_u-V37X1i2lZfK6zB4Z0eKqG5p7B-nJ1e2e9H2o4N_t4n1n4X5N3_O1j2o3c4v5.png?r=2b1' }
                ];
                localStorage.setItem('cinestream_profiles', JSON.stringify(defaultProfiles));
            }

            // Redirect to profiles page
            window.location.href = 'profiles.html';
        });
    }
});
