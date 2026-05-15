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
                `https://api.dicebear.com/9.x/avataaars/svg?seed=${name}1`,
                `https://api.dicebear.com/9.x/avataaars/svg?seed=${name}2`,
                `https://api.dicebear.com/9.x/avataaars/svg?seed=${name}3`
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
