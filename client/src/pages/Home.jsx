import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import FoundItems from "../components/FoundItems";
import LostItems from "../components/LostItems";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <SearchBar />
      <Categories />
      <FoundItems />
      <LostItems />
      <Footer />
    </>
  );
}

export default Home;