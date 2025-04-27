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

interface Planet {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    residents: string[];
    films: string[];
    created: string;
    edited: string;
    url: string;
}

interface PlanetInfo {
    name: string;
    header: Header;
    stats: StatsItem[];
    subtitle: {
        type: 'planet';
        climate: string;
        terrain: string;
    };
}

interface Person {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld: string;
    films: string[];
    species: string[];
    vehicles: string[];
    starships: string[];
    created: string;
    edited: string;
    url: string;
}

interface PersonInfo {
    name: string;
    header: Header;
    stats: StatsItem[];
    subtitle: {
        type: 'person';
        height: string;
        mass: string;
    };
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

let fetchPlanets = async ({ queryKey }: { queryKey: [string, { search: string; page_id?: string }] }) => {
    const [_key, { search, page_id }] = queryKey;
    try {
        let baseUrl = "https://swapi.py4e.com/api/planets"
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
        console.log('Planets data:', data);
        let planetInfo: PlanetInfo[] = data.results.map((planet: Planet) => ({
            name: planet.name,
            header: {
                title: {
                    text: planet.name.toLowerCase(),
                    icon: 'public',
                },
                complementaryInfo: {
                    text: planet.population === 'unknown' ? '0' : planet.population,
                    icon: 'people',
                },
            },
            subtitle: {
                type: 'planet',
                climate: planet.climate,
                terrain: planet.terrain
            },
            stats: [
                { name: 'población', icon: 'people', value: planet.population === 'unknown' ? 0 : parseInt(planet.population) },
                { name: 'diámetro', icon: 'straighten', value: parseInt(planet.diameter) },
                { name: 'período de rotación', icon: 'rotate-right', value: parseInt(planet.rotation_period) },
                { name: 'período orbital', icon: 'public', value: parseInt(planet.orbital_period) },
                { name: 'superficie de agua', icon: 'water', value: parseInt(planet.surface_water) },
            ],
        }));
        return planetInfo;
    } catch (error) {
        console.error('Error fetching planets:', error);
        throw error;
    }
};

let fetchPeople = async ({ queryKey }: { queryKey: [string, { search: string; page_id?: string }] }) => {
    const [_key, { search, page_id }] = queryKey;
    try {
        let baseUrl = "https://swapi.py4e.com/api/people"
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
        console.log('People data:', data);
        let personInfo: PersonInfo[] = data.results.map((person: Person) => ({
            name: person.name,
            header: {
                title: {
                    text: person.name.toLowerCase(),
                    icon: 'person',
                },
                complementaryInfo: {
                    text: person.gender.toLowerCase(),
                    icon: 'wc',
                },
            },
            subtitle: {
                type: 'person',
                height: person.height === 'unknown' ? 'Desconocida' : `${person.height} cm`,
                mass: person.mass === 'unknown' ? 'Desconocido' : `${person.mass} kg`
            },
            stats: [
                { name: 'color de pelo', icon: 'content-cut', value: person.hair_color === 'n/a' ? 'N/A' : person.hair_color },
                { name: 'color de piel', icon: 'palette', value: person.skin_color === 'n/a' ? 'N/A' : person.skin_color },
                { name: 'color de ojos', icon: 'visibility', value: person.eye_color === 'n/a' ? 'N/A' : person.eye_color },
                { name: 'año de nacimiento', icon: 'cake', value: person.birth_year === 'unknown' ? 'Desconocido' : person.birth_year },
                { name: 'películas', icon: 'movie', value: person.films.length },
            ],
        }));
        return personInfo;
    } catch (error) {
        console.error('Error fetching people:', error);
        throw error;
    }
};

export { fetchMovies, fetchPlanets, fetchPeople };