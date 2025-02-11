import { useState } from "react";
import { getMoviesByGenre } from "../api/tmdb";

const genres = [
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 27, name: "Horror" },
    { id: 10749, name: "Romance" }
];

function MoviePicker() {
    const [genre, setGenre] = useState("");
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [movies, setMovies] = useState([]);

    const fetchMovie = async () => {
        if (!genre) return;
        const movieList = await getMoviesByGenre(genre);
        setMovies(movieList);
    };

    const pickRandomMovie = () => {
        if (movies.length === 0) return;
        const randomIndex = Math.floor(Math.random() * movies.length);
        setSelectedMovie(movies[randomIndex]); // ✅ Fixed
    };

    return (
        <div className="picker-container">
            <h1>🎬 Movie Night Picker</h1>
            <select onChange={(e) => setGenre(e.target.value)}>
                <option value="">Select a Genre</option>
                {genres.map((g) => (
                    <option value={g.id} key={g.id}>{g.name}</option> // ✅ Fixed
                ))}
            </select>
            <button onClick={fetchMovie}>Fetch Movies</button>
            <button onClick={pickRandomMovie}>Pick a Movie</button>

            {selectedMovie && (
                <div className="movie-info">
                    <h2>{selectedMovie.title}</h2>
                    <img
                        src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                        alt={selectedMovie.title}
                    />
                    <p>⭐ {selectedMovie.vote_average}/10</p>
                    <p>{selectedMovie.overview}</p>
                </div>
            )}
        </div>
    );
}

export default MoviePicker;
