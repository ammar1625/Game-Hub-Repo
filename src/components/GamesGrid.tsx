import imoji from "../images/bulls-eye.webp";
import { FaWindows } from "react-icons/fa";
import {
  BsPlaystation,
  BsXbox,
  BsNintendoSwitch,
  BsApple,
  BsAndroid,
} from "react-icons/bs";
import { SiWii , SiNintendogamecube } from "react-icons/si";
import { useEffect, useState } from "react";

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
  [key: string]: any;  
}

interface genre {
  id: number;
  image_background: string;
  name: string;
  games: game[];
}

interface Props {
  games: game[];
  genresFilter: string;
  platformFilter:string;
  searchText:string;
  sortFilter:string;
  errorMessage:string;
  isLoading:boolean;
}
function GamesGrid({ games, genresFilter , platformFilter ,searchText ,sortFilter ,errorMessage , isLoading}: Props) {
    /* the game card jsx element to get rendered dinamiclly */
    function getGamesCards(game:game)
    {
       return <div key={game.id} className="game">
       <img className="game-pic" src={game.background_image} />
       <div className="platform-rating-ctr">
         <div className="platforms-ctr">
           {/* rendering platforms icons based on the platforms in the game object */}
           {game.parent_platforms.map(
             (plat) =>
               plat.platform.name.includes("PC") && (
                 <FaWindows key={game.id} size={25} color="gray" />
               )
           )}
           {game.parent_platforms.map(
             (plat) =>
               (plat.platform.name.includes("Play") ||
                 plat.platform.name.includes("PSP")) && (
                 <BsPlaystation key={game.id} size={25} color="gray" />
               )
           )}
           {game.parent_platforms.map(
             (plat) =>
               plat.platform.name.includes("Xb") && (
                 <BsXbox size={25} key={game.id} color="gray" />
               )
           )}
           {game.parent_platforms.map(
             (plat) =>
               plat.platform.name.includes("iOS") && (
                 <BsApple size={25} key={game.id} color="gray" />
               )
           )}
           {game.parent_platforms.map(
             (plat) =>
               plat.platform.name.includes("Ni") && (
                 <BsNintendoSwitch
                   key={game.id}
                   size={25}
                   color="gray"
                 />
               )
           )}
           {game.parent_platforms.map(
             (plat) =>
               plat.platform.name.includes("And") && (
                 <BsAndroid key={game.id} size={25} color="gray" />
               )
           )}
            {game.parent_platforms.map(
             (plat) =>
               plat.platform.name.includes("Wii") && (
                 <SiWii key={game.id} size={25} color="gray" />
               )
           )}
            {game.parent_platforms.map(
             (plat) =>
               plat.platform.name.includes("GameCube") && (
                 <SiNintendogamecube key={game.id} size={25} color="gray" />
               )
           )}
         </div>
         <h2 className="rating">{game.metacritic}</h2>
       </div>

       <h2 className="game-name">{game.name}</h2>
       <img className="imoji" src={imoji} />
       {/* but if we have a filter set we render the games that match the filter selected */}
     </div>
    }

    function handelSorting(a:game,b:game)
    {
      // Retrieve the values to compare
      const valueA = a[sortFilter];
      const valueB = b[sortFilter];
    
      // Handle sorting based on the type of the property
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        if (sortFilter === "released") {
          // If it's a date string, convert to Date object for proper comparison
          const dateA = new Date(valueA);
          const dateB = new Date(valueB);
          if (dateA < dateB) return -1;
          if (dateA > dateB) return 1;
          return 0;
        } else {
          // For regular strings (e.g., name), use localeCompare
          return valueA.localeCompare(valueB);
        }
      } else if (typeof valueA === 'number' && typeof valueB === 'number') {
        // Handle numeric comparison
        if (valueA < valueB) return -1;
        if (valueA > valueB) return 1;
        return 0;
      }
      return 0;  // If types don't match (this case shouldn't happen with correct data)
    }

    function loadingSkeleton()
    {
       let skeletons =  [1,2,3,4,5,6];
       return skeletons.map(sk=><div key={sk} className="skeleton-ctr">
        <div className="bg-neutral-500 h-48 w-full rounded-md mb-4"></div>
        <div className="space-y-4">
          <div className="skeleton-l1"></div>
          <div className="skeleton-l2"></div>
          <div className="skeleton-l3"></div>
          <div className="skeleton-l4"></div>
        </div>
      </div>) ;
    }
    
  return (
    <>
      <div className="games-grid">
        {/* this is an error message in case something went wrong */}
        {errorMessage&&<p className="error-msg">{errorMessage}</p>}

        {/* this is a spinner to simulate data loading from the api */}
        {(isLoading && !errorMessage) &&  loadingSkeleton()}
        
        {/* in case no filter is specified we fetch all the games list */}
        {(genresFilter === "" && platformFilter==="All Platforms" && !isLoading)&&  games
        .filter(game=> searchText!==""? game.name.toLowerCase().includes(searchText.toLowerCase()):true)
        .sort((a,b)=>handelSorting(a,b))
        .map((game) => (
        
           getGamesCards(game) 
            ))}

        {(genresFilter !==""&&  platformFilter==="All Platforms")&&games
          /* if we have a genre filter we filter the games base on it */
              .filter((game) =>
                (game.genres.some((genre) => genre.name === genresFilter))&&
                (searchText!=""? game.name.toLowerCase().includes(searchText.toLowerCase()):true)
              )
              .sort((a,b)=>handelSorting(a,b))
              .map((game) => (
                getGamesCards(game)
                
              ))}

        {(genresFilter==="" && platformFilter !=="")&&games
          /* if we have a platform filter we filter the games base on it */
              .filter((game) =>
                (game.parent_platforms.some((plat) => plat.platform.name.includes(platformFilter.slice(0,4))))&&
              (searchText!=""? game.name.toLowerCase().includes(searchText.toLowerCase()):true)
              )
              .sort((a,b)=>handelSorting(a,b))
              .map((game) => (
                getGamesCards(game)
              ))}

        {games.filter((game) =>
                /* in case we have both genre and platform filters we filter games based on both of them */
               ( (game.parent_platforms.some((plat) => plat.platform.name.includes(platformFilter.slice(0,4))))&&
              game.genres.some(genre=>genre.name === genresFilter))&&
              (searchText!=""? game.name.toLowerCase().includes(searchText.toLowerCase()):true)
              )
              .sort((a,b)=>handelSorting(a,b))
              .map((game) => (
                getGamesCards(game)
              ))}
           
      </div>
    </>
  );
}

export default GamesGrid;
