document.addEventListener('DOMContentLoaded', () => {
    // Check auth
    if (localStorage.getItem('cinestream_auth') !== 'true') {
        window.location.href = 'index.html';
        return;
    }

    const profilesGrid = document.getElementById('profilesGrid');
    
    // Load profiles
    const profiles = JSON.parse(localStorage.getItem('cinestream_profiles')) || [];
    
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
        localStorage.setItem('cinestream_active_profile', JSON.stringify(profile));
        
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
            // Generate a random avatar from Netflix CDN
            const avatars = [
                'https://occ-0-4857-2164.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABfjwXqIYd3kCEU6KWsiHSHvkft8VhZg0yyD50a_pHXku4dz9VvWjoKIJHLhXZ-80470_x1B0B82sD7z0-T64-X2rX1v-wz1uMw.png?r=a41',
                'https://occ-0-4857-2164.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABcUJz897vY6xS8O66rM5T9hZfK98xO8s4BvN1rW-0tZJqWwO2r31_sR2xO0d-Xm3wG92c10b4s6yK4x_0kR9X7k0mN3r18b.png?r=e6e',
                'https://occ-0-4857-2164.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABY5cwIbM7shRfcXmfQg98cqMqiZZ8sReZnj4y_keCAHeXmG_SoqLD8SXYistPtesdq0.png?r=229'
            ];
            
            profiles.push({
                id: newId,
                name: name.trim(),
                avatar: avatars[Math.floor(Math.random() * avatars.length)]
            });
            
            localStorage.setItem('cinestream_profiles', JSON.stringify(profiles));
            renderProfiles();
        }
    }

    renderProfiles();
});
