import SearchBar from "../SearchBar/SearchBar";
import { useState, useEffect } from "react";
import css from "./App.module.css";
import MovieModal from "../MovieModal/MovieModal";
import axios from "axios";

export default function App() {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {}, []);

  const handleSearch = async (item: string) => {
    console.log("handleSearch", item);

    // const response = axios.get("https://api.themoviedb.org/3/search/}");
    // console.log(response.data);
  };

  // const openModal = () => setIsModalOpen(true);
  // const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <SearchBar onSearch={handleSearch} />
      {/* <MovieModal onClose={closeModal} /> */}
    </div>
  );
}

// https://api.themoviedb.org/3/search/movie
