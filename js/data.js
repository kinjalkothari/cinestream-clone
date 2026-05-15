// Simulated Dataset with real trailer links (mostly YouTube embed codes)
const contentData = [
    {
        id: "m1",
        title: "Inception",
        type: "movie",
        genres: ["Action", "Sci-Fi", "Thriller"],
        year: 2010,
        rating: 4.8,
        imdb: 8.8,
        poster: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
        synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"],
        trailer: "https://www.youtube.com/embed/YoHD9XEInc0"
    },
    {
        id: "m2",
        title: "The Dark Knight",
        type: "movie",
        genres: ["Action", "Crime", "Drama"],
        year: 2008,
        rating: 4.9,
        imdb: 9.0,
        poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
        synopsis: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
        trailer: "https://www.youtube.com/embed/EXeTwQWrcwY"
    },
    {
        id: "s1",
        title: "Stranger Things",
        type: "series",
        genres: ["Drama", "Fantasy", "Horror"],
        year: 2016,
        rating: 4.7,
        imdb: 8.7,
        poster: "https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
        synopsis: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
        cast: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"],
        trailer: "https://www.youtube.com/embed/b9EkMc79ZSU"
    },
    {
        id: "m3",
        title: "Interstellar",
        type: "movie",
        genres: ["Adventure", "Drama", "Sci-Fi"],
        year: 2014,
        rating: 4.8,
        imdb: 8.6,
        poster: "https://image.tmdb.org/t/p/w500/gEU2QlsEOVhN4c1jWzI1hlX2B3W.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/pbrkL804c8yAv3zBZR4QPEafpAR.jpg",
        synopsis: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
        trailer: "https://www.youtube.com/embed/zSWdZVtXT7E"
    },
    {
        id: "s2",
        title: "Breaking Bad",
        type: "series",
        genres: ["Crime", "Drama", "Thriller"],
        year: 2008,
        rating: 4.9,
        imdb: 9.5,
        poster: "https://image.tmdb.org/t/p/w500/ggFHVNu6YYI5L9pCfOacjizRk1.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
        synopsis: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
        cast: ["Bryan Cranston", "Aaron Paul", "Anna Gunn"],
        trailer: "https://www.youtube.com/embed/HhesaQXLuRY"
    },
    {
        id: "m4",
        title: "Avengers: Endgame",
        type: "movie",
        genres: ["Action", "Adventure", "Sci-Fi"],
        year: 2019,
        rating: 4.7,
        imdb: 8.4,
        poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
        synopsis: "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
        cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"],
        trailer: "https://www.youtube.com/embed/TcMBFSGVi1c"
    },
    {
        id: "m5",
        title: "Spider-Man: Across the Spider-Verse",
        type: "movie",
        genres: ["Animation", "Action", "Adventure"],
        year: 2023,
        rating: 4.8,
        imdb: 8.7,
        poster: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
        synopsis: "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence. When the heroes clash on how to handle a new threat, Miles must redefine what it means to be a hero.",
        cast: ["Shameik Moore", "Hailee Steinfeld", "Oscar Isaac"],
        trailer: "https://www.youtube.com/embed/cqGjhVJWtEg"
    },
    {
        id: "s3",
        title: "The Mandalorian",
        type: "series",
        genres: ["Action", "Adventure", "Sci-Fi"],
        year: 2019,
        rating: 4.6,
        imdb: 8.7,
        poster: "https://image.tmdb.org/t/p/w500/sWgBv7LV2PRoQgkxwlibdGXKz1S.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/9ijMGlJKqcslswWlTpPOZNcABAK.jpg",
        synopsis: "The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.",
        cast: ["Pedro Pascal", "Carl Weathers", "Giancarlo Esposito"],
        trailer: "https://www.youtube.com/embed/aOC8E8z_ifw"
    },
    {
        id: "m6",
        title: "Joker",
        type: "movie",
        genres: ["Crime", "Drama", "Thriller"],
        year: 2019,
        rating: 4.7,
        imdb: 8.4,
        poster: "https://image.tmdb.org/t/p/w500/udDclJoHjfpt8MvSMzNDemO1Oxa.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/n6bUvigpRFqSwmwpF1peFC1mrxP.jpg",
        synopsis: "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime.",
        cast: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz"],
        trailer: "https://www.youtube.com/embed/zAGVQLHvwOY"
    },
    {
        id: "s4",
        title: "The Office",
        type: "series",
        genres: ["Comedy"],
        year: 2005,
        rating: 4.8,
        imdb: 9.0,
        poster: "https://image.tmdb.org/t/p/w500/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/A5YvXqLtePweS6U2T6F5QvR87vP.jpg",
        synopsis: "A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.",
        cast: ["Steve Carell", "Jenna Fischer", "John Krasinski"],
        trailer: "https://www.youtube.com/embed/2iKZn8plQhw"
    },
    {
        id: "m7",
        title: "Parasite",
        type: "movie",
        genres: ["Comedy", "Drama", "Thriller"],
        year: 2019,
        rating: 4.8,
        imdb: 8.5,
        poster: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/hiKQCcgvcsGflL6xHvxFaURiE0w.jpg",
        synopsis: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
        cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"],
        trailer: "https://www.youtube.com/embed/5xH0HfJHsaY"
    },
    {
        id: "m8",
        title: "Oppenheimer",
        type: "movie",
        genres: ["Biography", "Drama", "History"],
        year: 2023,
        rating: 4.9,
        imdb: 8.6,
        poster: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/fm6KqXpk3M2HVveHwCrBRoOoA0i.jpg",
        synopsis: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
        cast: ["Cillian Murphy", "Emily Blunt", "Matt Damon"],
        trailer: "https://www.youtube.com/embed/uYPbbksJxIg"
    },
    {
        id: "s5",
        title: "Game of Thrones",
        type: "series",
        genres: ["Action", "Adventure", "Drama"],
        year: 2011,
        rating: 4.7,
        imdb: 9.2,
        poster: "https://image.tmdb.org/t/p/w500/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/suopoADq0k8YZr4dQXcU6pToj6s.jpg",
        synopsis: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
        cast: ["Emilia Clarke", "Peter Dinklage", "Kit Harington"],
        trailer: "https://www.youtube.com/embed/KPLWWIOCOOQ"
    },
    {
        id: "m9",
        title: "Dune: Part One",
        type: "movie",
        genres: ["Action", "Adventure", "Sci-Fi"],
        year: 2021,
        rating: 4.6,
        imdb: 8.0,
        poster: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/lzWHmYdfeFiMIY4JaMmtR7GEli3.jpg",
        synopsis: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.",
        cast: ["Timothée Chalamet", "Rebecca Ferguson", "Zendaya"],
        trailer: "https://www.youtube.com/embed/8g18jFHjc4I"
    },
    {
        id: "m10",
        title: "The Matrix",
        type: "movie",
        genres: ["Action", "Sci-Fi"],
        year: 1999,
        rating: 4.9,
        imdb: 8.7,
        poster: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
        backdrop: "https://image.tmdb.org/t/p/original/icmmSD4vTTDKOq2vvdulafOGw93.jpg",
        synopsis: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
        cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
        trailer: "https://www.youtube.com/embed/vKQi3bBA1y8"
    }
];

// Helper to get random subset of items for different sections
const getRandomItems = (count) => {
    const shuffled = [...contentData].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

const getItemsByGenre = (genre) => {
    return contentData.filter(item => item.genres.includes(genre));
};

const getTrending = () => getRandomItems(8);
const getTopRated = () => [...contentData].sort((a, b) => b.imdb - a.imdb).slice(0, 8);
