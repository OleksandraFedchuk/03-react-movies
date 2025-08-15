import SearchBar from "../SearchBar/SearchBar";
import { useState, useEffect } from "react";
import css from "./App.module.css";
import MovieModal from "../MovieModal/MovieModal";
import toast, { Toaster } from "react-hot-toast";
import MovieGrid from "../MovieGrid/MovieGrid";
import { fetchMovies } from "../../services/movieService";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { type Movie } from "../../types/movie";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const handleSearch = async (query: string) => {
    setMovies([]);
    setIsLoading(true);
    setIsError(false);
    try {
      const result = await fetchMovies(query);

      if (result.length === 0) {
        toast("No movies found for your request.");
        setMovies([]);
        return;
      }
      setMovies(result);
    } catch {
      setIsError(true);
      toast.error("Something went wrong, try again later.");
    } finally {
      await delay(1000);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch("popular");
  }, []);

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={css.app}>
      <Toaster position="top-center" />
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {!isLoading && !isError && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}
