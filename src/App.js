import React from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Trending from "./Pages/Trending/Trending";
import Tv from "./Pages/TV/Tv";
import Search from "./Pages/Search/Search";
import Movies from "./Pages/Movies/Movies";
import Header from "./Components/Header/Header";
import Modal from "./Pages/Modal/Modal";
import WatchList from "./Pages/WatchList/WatchList";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/trending" element={<Trending />} />
        <Route path="/MOVIX" element={<Trending />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
        <Route path="/Modal/:id/:media_type" element={<Modal />} />
        <Route path="/watchList" element={<WatchList />} />
      </Routes>
      <Navbar />
    </>
  );
};

export default App;
