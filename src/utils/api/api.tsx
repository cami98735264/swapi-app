interface Header {
    title: {
        text: string;
        icon: string;
    }
    complementaryInfo: {
        text: string;
        icon: string;
    };
}

interface Subtitle {
    producer: string;
    director: string;
}

interface StatsItem {
    name: string;
    icon: string;
    value: number;
}






interface Movie {
    characters: string[];
    created: string;
    director: string;
    episode_id: number;
    opening_crawl: string;
    planets: string[];
    producer: string;
    release_date: string;
    species: string[];
    starships: string[];
    title: string;
    url: string;
    vehicles: string[];
}

interface MovieInfo {
    episode_id: number;
    header: Header;
    subtitle: Subtitle;
    description: string;
    movieStats: StatsItem[];
  }


let fetchMovies = async ({ queryKey }: { queryKey: [string, { search: string; page_id?: string }] }) => {
    const [_key, { search, page_id }] = queryKey;
    try {
        let baseUrl = "https://swapi.py4e.com/api/films"
        if (search) {
            baseUrl += `?search=${search}`;
        }
        if (page_id && !search) {
            baseUrl += "/" + page_id;
        }
        let response = await fetch(baseUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        let data = await response.json();
        console.log('Movies data:', data);
        let movieInfo: MovieInfo[] = data.results.map((movie: Movie) => ({
            episode_id: movie.episode_id,
            header: {
                title: {
                    text: movie.title.toLowerCase(),
                    icon: 'videocam',
                },
                complementaryInfo: {
                    text: movie.release_date,
                    icon: 'calendar-today',
                },
            },
            subtitle: {
                producer: movie.producer.toLowerCase(),
                director: movie.director.toLowerCase(),
            },
            description: movie.opening_crawl.toLowerCase(),
            movieStats: [
                { name: 'personajes', icon: 'person', value: movie.characters.length },
                { name: 'naves', icon: 'rocket-launch', value: movie.starships.length },
                { name: 'vehículos', icon: 'directions-car', value: movie.vehicles.length },
                { name: 'especies', icon: 'pets', value: movie.species.length },
                { name: 'planetas', icon: 'public', value: movie.planets.length },
            ],
        }));
        return movieInfo;
    } catch (error) {
        console.error('Error fetching movies:', error);
        throw error;
    }
};


export { fetchMovies };