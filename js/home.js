document.addEventListener('DOMContentLoaded', () => {
    // --- Auth Check ---
    const activeProfile = JSON.parse(localStorage.getItem('cinestream_active_profile_v2'));
    if (!localStorage.getItem('cinestream_auth_v2') || !activeProfile) {
        window.location.href = 'index.html';
        return;
    }

    // --- State ---
    let watchlist = JSON.parse(localStorage.getItem(`watchlist_${activeProfile.id}`)) || [];
    let watchProgress = JSON.parse(localStorage.getItem(`progress_${activeProfile.id}`)) || {};
    let userRatings = JSON.parse(localStorage.getItem(`ratings_${activeProfile.id}`)) || {};

    // --- DOM Elements ---
    const navProfileName = document.getElementById('navProfileName');
    const navAvatar = document.getElementById('navAvatar');
    const cwProfileName = document.getElementById('cwProfileName');
    const logoutBtn = document.getElementById('logoutBtn');
    const themeToggle = document.getElementById('themeToggle');
    const navbar = document.getElementById('navbar');
    const watchlistCount = document.getElementById('watchlistCount');
    const toast = document.getElementById('toast');

    // --- Initialization ---
    navProfileName.textContent = activeProfile.name;
    navAvatar.src = activeProfile.avatar;
    cwProfileName.textContent = activeProfile.name;
    updateWatchlistCount();
    
    // Apply theme
    if (localStorage.getItem('cinestream_theme') === 'light') {
        document.body.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // --- Navbar Scroll ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Theme Toggle ---
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('cinestream_theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.body.setAttribute('data-theme', 'light');
            localStorage.setItem('cinestream_theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });

    // --- Logout ---
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('cinestream_auth_v2');
        localStorage.removeItem('cinestream_active_profile_v2');
        window.location.href = 'index.html';
    });

    // --- Helpers ---
    function showToast(msg) {
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    function updateWatchlistCount() {
        watchlistCount.textContent = watchlist.length;
    }

    function toggleWatchlist(item) {
        const index = watchlist.findIndex(w => w.id === item.id);
        if (index > -1) {
            watchlist.splice(index, 1);
            showToast(`Removed from My List`);
        } else {
            watchlist.push(item);
            showToast(`Added to My List`);
        }
        localStorage.setItem(`watchlist_${activeProfile.id}`, JSON.stringify(watchlist));
        updateWatchlistCount();
        renderContinueWatching(); // Update rows if needed
    }

    function createMovieCard(item, progress = null) {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.style.backgroundImage = `url('${item.poster}')`;
        
        // Ensure card overlay handles clicks cleanly
        let overlayHTML = `
            <div class="card-overlay">
                <h4>${item.title}</h4>
                <div class="card-actions">
                    <button class="icon-btn-round play-btn" data-id="${item.id}" title="Play"><i class="fas fa-play"></i></button>
                    <button class="icon-btn-round info-btn" data-id="${item.id}" title="Info"><i class="fas fa-info"></i></button>
                    <button class="icon-btn-round add-btn" data-id="${item.id}" title="Watchlist"><i class="${watchlist.some(w => w.id === item.id) ? 'fas fa-check' : 'fas fa-plus'}"></i></button>
                </div>
            </div>
        `;

        if (progress) {
            overlayHTML += `
                <div class="progress-bar-container">
                    <div class="progress-bar" style="width: ${progress}%"></div>
                </div>
            `;
        }

        card.innerHTML = overlayHTML;

        // Card click opens modal
        card.addEventListener('click', (e) => {
            if(e.target.closest('button')) return; // ignore if button clicked
            openModal(item);
        });

        // Action Buttons
        const playBtn = card.querySelector('.play-btn');
        const infoBtn = card.querySelector('.info-btn');
        const addBtn = card.querySelector('.add-btn');

        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openTrailer(item);
            // Simulate starting watch
            if(!progress) {
                watchProgress[item.id] = Math.floor(Math.random() * 30) + 10;
                localStorage.setItem(`progress_${activeProfile.id}`, JSON.stringify(watchProgress));
                renderContinueWatching();
            }
        });

        infoBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openModal(item);
        });

        addBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleWatchlist(item);
            addBtn.innerHTML = `<i class="${watchlist.some(w => w.id === item.id) ? 'fas fa-check' : 'fas fa-plus'}"></i>`;
        });

        return card;
    }

    // --- Content Rendering ---
    function renderRow(containerId, items, checkProgress = false) {
        const container = document.getElementById(containerId);
        if(!container) return;
        container.innerHTML = '';
        items.forEach(item => {
            let prog = checkProgress ? watchProgress[item.id] : null;
            container.appendChild(createMovieCard(item, prog));
        });
    }

    function renderContinueWatching() {
        const cRow = document.getElementById('continueRow');
        const inProgressIds = Object.keys(watchProgress);
        if (inProgressIds.length > 0) {
            cRow.style.display = 'block';
            const cwItems = contentData.filter(item => inProgressIds.includes(item.id));
            renderRow('continueContainer', cwItems, true);
        } else {
            cRow.style.display = 'none';
        }
    }

    // Setup Hero
    function setupHero() {
        const heroItem = contentData[Math.floor(Math.random() * contentData.length)];
        document.getElementById('heroBg').style.backgroundImage = `url('${heroItem.backdrop}')`;
        document.getElementById('heroTitle').textContent = heroItem.title;
        document.getElementById('heroMatch').textContent = `${Math.floor(Math.random() * 15 + 85)}% Match`;
        document.getElementById('heroYear').textContent = heroItem.year;
        document.getElementById('heroSynopsis').textContent = heroItem.synopsis;
        
        document.getElementById('heroPlayBtn').onclick = () => {
            openTrailer(heroItem);
            watchProgress[heroItem.id] = 15;
            localStorage.setItem(`progress_${activeProfile.id}`, JSON.stringify(watchProgress));
            renderContinueWatching();
        };
        document.getElementById('heroInfoBtn').onclick = () => openModal(heroItem);
    }

    // Initial Renders
    setupHero();
    renderRow('forYouContainer', getTrending());
    renderRow('trendingContainer', getTopRated());
    renderRow('actionContainer', getItemsByGenre("Action"));
    renderRow('comedyContainer', getItemsByGenre("Comedy"));
    renderContinueWatching();

    // --- Modal Logic ---
    const detailModal = document.getElementById('detailModal');
    let currentModalItem = null;

    function openModal(item) {
        currentModalItem = item;
        document.getElementById('modalBg').style.backgroundImage = `url('${item.backdrop}')`;
        document.getElementById('modalTitle').textContent = item.title;
        document.getElementById('modalYear').textContent = item.year;
        document.getElementById('modalImdb').textContent = item.imdb;
        document.getElementById('modalSynopsis').textContent = item.synopsis;
        document.getElementById('modalCast').textContent = item.cast.join(', ');
        document.getElementById('modalGenres').textContent = item.genres.join(', ');

        // Update buttons
        const watchBtn = document.getElementById('modalWatchlistBtn');
        watchBtn.innerHTML = `<i class="${watchlist.some(w => w.id === item.id) ? 'fas fa-check' : 'fas fa-plus'}"></i>`;
        
        // Rating
        const stars = document.querySelectorAll('.star-rating i');
        const userRating = userRatings[item.id] || 0;
        stars.forEach(star => {
            const rating = parseInt(star.getAttribute('data-rating'));
            if(rating <= userRating) {
                star.classList.replace('far', 'fas');
                star.classList.add('active');
            } else {
                star.classList.replace('fas', 'far');
                star.classList.remove('active');
            }
        });

        detailModal.style.display = 'flex';
    }

    document.querySelector('.close-modal').addEventListener('click', () => {
        detailModal.style.display = 'none';
    });

    // Close on click outside
    detailModal.addEventListener('click', (e) => {
        if(e.target === detailModal) detailModal.style.display = 'none';
    });

    // Modal Actions
    document.getElementById('modalPlayBtn').addEventListener('click', () => {
        if(currentModalItem) openTrailer(currentModalItem);
    });

    document.getElementById('modalWatchlistBtn').addEventListener('click', () => {
        if(currentModalItem) {
            toggleWatchlist(currentModalItem);
            document.getElementById('modalWatchlistBtn').innerHTML = `<i class="${watchlist.some(w => w.id === currentModalItem.id) ? 'fas fa-check' : 'fas fa-plus'}"></i>`;
        }
    });

    // Rating Logic
    document.querySelectorAll('.star-rating i').forEach(star => {
        star.addEventListener('click', (e) => {
            if(!currentModalItem) return;
            const rating = parseInt(e.target.getAttribute('data-rating'));
            userRatings[currentModalItem.id] = rating;
            localStorage.setItem(`ratings_${activeProfile.id}`, JSON.stringify(userRatings));
            
            document.querySelectorAll('.star-rating i').forEach(s => {
                const r = parseInt(s.getAttribute('data-rating'));
                if(r <= rating) {
                    s.classList.replace('far', 'fas');
                    s.classList.add('active');
                } else {
                    s.classList.replace('fas', 'far');
                    s.classList.remove('active');
                }
            });
            showToast(`Rated ${rating} stars`);
        });
    });

    // --- Trailer Logic ---
    const trailerModal = document.getElementById('trailerModal');
    const trailerIframe = document.getElementById('trailerIframe');

    function openTrailer(item) {
        trailerIframe.src = `${item.trailer}?autoplay=1&mute=0&controls=1`;
        trailerModal.style.display = 'flex';
    }

    document.getElementById('closeTrailer').addEventListener('click', () => {
        trailerIframe.src = "";
        trailerModal.style.display = 'none';
    });

    // --- Search Autocomplete ---
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        if(query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        const matches = contentData.filter(item => 
            item.title.toLowerCase().includes(query) || 
            item.genres.some(g => g.toLowerCase().includes(query)) ||
            item.cast.some(c => c.toLowerCase().includes(query))
        );

        if(matches.length > 0) {
            searchResults.innerHTML = '';
            matches.slice(0, 5).forEach(item => {
                const div = document.createElement('div');
                div.className = 'search-result-item';
                div.innerHTML = `
                    <img src="${item.poster}" class="search-result-img">
                    <div>
                        <div style="font-weight: bold">${item.title}</div>
                        <div style="font-size: 0.8rem; color: #aaa">${item.year} • ${item.type}</div>
                    </div>
                `;
                div.addEventListener('click', () => {
                    openModal(item);
                    searchInput.value = '';
                    searchResults.style.display = 'none';
                });
                searchResults.appendChild(div);
            });
            searchResults.style.display = 'block';
        } else {
            searchResults.style.display = 'none';
        }
    });

    // Hide search results on click outside
    document.addEventListener('click', (e) => {
        if(!e.target.closest('.search-box')) {
            searchResults.style.display = 'none';
        }
    });

    // --- AI Mood Discovery ---
    const moodBtn = document.getElementById('moodBtn');
    const moodInput = document.getElementById('moodInput');
    const moodBar = document.getElementById('moodBar');
    const closeMoodBtn = document.getElementById('closeMoodBtn');
    const moodResultsRow = document.getElementById('moodResultsRow');

    closeMoodBtn.addEventListener('click', () => {
        moodBar.style.display = 'none';
    });

    moodBtn.addEventListener('click', () => {
        const mood = moodInput.value.toLowerCase().trim();
        if(!mood) return;

        moodBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        
        // Simulate AI Processing delay
        setTimeout(() => {
            let matchedGenres = [];
            if(mood.includes('dark') || mood.includes('thrill') || mood.includes('scary')) matchedGenres = ['Thriller', 'Horror', 'Crime'];
            else if(mood.includes('laugh') || mood.includes('funny') || mood.includes('light')) matchedGenres = ['Comedy'];
            else if(mood.includes('action') || mood.includes('exciting')) matchedGenres = ['Action', 'Adventure'];
            else if(mood.includes('think') || mood.includes('mind')) matchedGenres = ['Sci-Fi', 'Mystery'];
            else matchedGenres = ['Drama', 'Action']; // fallback

            const results = contentData.filter(item => item.genres.some(g => matchedGenres.includes(g)));
            
            // Randomize and pick up to 8
            const finalResults = results.sort(() => 0.5 - Math.random()).slice(0, 8);

            renderRow('moodResultsContainer', finalResults);
            moodResultsRow.style.display = 'block';
            
            // Scroll to results
            moodResultsRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            moodBtn.innerHTML = 'Discover';
            showToast(`Found ${finalResults.length} titles matching your mood!`);
        }, 1200);
    });

});
