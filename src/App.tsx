import { useEffect, useState } from "react";
import GamesCtr from "./components/Games.ctr";
import GamesFilter from "./components/GamesFilter";
import GamesGrid from "./components/GamesGrid";
import MainBody from "./components/MainBody";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";

//import axios, { AxiosError } from "axios"
import apiClient, { AxiosError } from "./services/api-client";
interface platform {
  platform: platform;
  id: number;
  name: string;
  slug: string;
}

interface game {
  id: number;
  name: string;
  metacritic: number;
  background_image: string;
  parent_platforms: platform[];
  genres: genre[];
  added:number;
  released:string;
  rating:number;
}

interface genre {
  id: number;
  image_background: string;
  name: string;
  games: game[];
}

function App() {
  const [gamesList, setGames] = useState<game[]>([]);
  const [genresList, setGenres] = useState<genre[]>([]);
  const [platformsList, setPlatforms] = useState<platform[]>([]);
  const [genre, setGenre] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState("All Platforms");
  const [searchText , setSearchText] = useState("");
  const [sortFilter , setSortFilter] = useState("");
  const [error , setError] = useState("");
  const [isLoading,setLoading] = useState(true);
 
  useEffect(() => {
    getGames();
    getGenres();
    getPlatforms();
    
  }, []);
  async function getGames() {
    try {
      let res = await apiClient.get("/games");

      if (res.status === 200) {
        //console.log(res.data.results[2]);
        setGames(res.data.results);
        setError("");
        setTimeout(()=>{
          setLoading(false);
        },3500);
      } else {
        throw new Error(res.statusText);
      }
    } catch (err) {
      //console.log((err as AxiosError).message);
      setError((err as AxiosError).message);
    }
  }

  async function getGenres() {
    try {
      let res = await apiClient.get("/genres");

      if (res.status === 200) {
        //console.log(res.data.results[1]);
        setGenres(res.data.results);
        setError("");
        setTimeout(()=>{
          setLoading(false);
        },3500);
        
      }
    } catch (err) {
      //console.log((err as AxiosError).message);
      setError((err as AxiosError).message);
    }
  }

  async function getPlatforms() {
    try {
      let res = await apiClient.get("/platforms");

      if (res.status === 200) {
        //console.log("video games platforms ", res.data.results);
        setPlatforms(res.data.results);
        setError("");
      }
    } catch (err) {
      //console.log((err as AxiosError).message);
      setError((err as AxiosError).message);
    }
  }

  


  return (
    <div className="app-ctr">
      <NavBar handleGameSearch={setSearchText} />

      <MainBody
        sideBar={<SideBar isLoading = {isLoading} errorMessage={error} handlGenreSelect={setGenre} genres={genresList} />}
        gamesCtr={
          <GamesCtr
            filterCtr={
              <GamesFilter handleSortFilterSelect={setSortFilter} platform={selectedPlatform}
                handlePlatformSelect={setSelectedPlatform}
                genre={genre}
                platforms={platformsList}
              />
            }
            gamesGrid={<GamesGrid isLoading = {isLoading} errorMessage={error} sortFilter={sortFilter} searchText={searchText} platformFilter={selectedPlatform} genresFilter={genre} games={gamesList} />}
          />
        }
      />
    </div>
  );
}

export default App;
