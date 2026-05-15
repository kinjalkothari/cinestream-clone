document.addEventListener('DOMContentLoaded', () => {
    // Check auth
    if (localStorage.getItem('cinestream_auth_v2') !== 'true') {
        window.location.href = 'index.html';
        return;
    }

    const profilesGrid = document.getElementById('profilesGrid');
    
    // Load profiles
    const profiles = JSON.parse(localStorage.getItem('cinestream_profiles_v2')) || [];
    
    function renderProfiles() {
        profilesGrid.innerHTML = '';
        
        profiles.forEach(profile => {
            const profileCard = document.createElement('a');
            profileCard.href = '#';
            profileCard.className = 'profile-card';
            profileCard.onclick = (e) => {
                e.preventDefault();
                selectProfile(profile);
            };
            
            profileCard.innerHTML = `
                <div class="avatar" style="background-image: url('${profile.avatar}')"></div>
                <span class="profile-name">${profile.name}</span>
            `;
            
            profilesGrid.appendChild(profileCard);
        });

        // Add "Add Profile" button if less than 4 profiles
        if (profiles.length < 4) {
            const addCard = document.createElement('a');
            addCard.href = '#';
            addCard.className = 'profile-card add-profile-btn';
            addCard.onclick = (e) => {
                e.preventDefault();
                addNewProfile();
            };
            
            addCard.innerHTML = `
                <div class="avatar"><i class="fas fa-plus"></i></div>
                <span class="profile-name">Add Profile</span>
            `;
            
            profilesGrid.appendChild(addCard);
        }
    }

    function selectProfile(profile) {
        // Set active profile
        localStorage.setItem('cinestream_active_profile_v2', JSON.stringify(profile));
        
        // Add zoom animation to selected profile
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '0';
        
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 500);
    }

    function addNewProfile() {
        const name = prompt('Enter profile name:');
        if (name && name.trim()) {
            const newId = profiles.length ? Math.max(...profiles.map(p => p.id)) + 1 : 1;
            const firstLetter = name.charAt(0).toUpperCase() || 'U';
            const colors = ['%2346d369', '%23e87c03', '%23b20710', '%230071eb', '%238c8c8c'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            const avatarSvg = `data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 100 100%27%3E%3Crect width=%27100%27 height=%27100%27 fill=%27${randomColor}%27/%3E%3Ctext x=%2750%27 y=%2765%27 font-size=%2750%27 font-weight=%27bold%27 text-anchor=%27middle%27 fill=%27white%27 font-family=%27Arial, sans-serif%27%3E${firstLetter}%3C/text%3E%3C/svg%3E`;
            
            
            profiles.push({
                id: newId,
                name: name.trim(),
                avatar: avatarSvg
            });
            
            localStorage.setItem('cinestream_profiles_v2', JSON.stringify(profiles));
            renderProfiles();
        }
    }

    renderProfiles();
});
