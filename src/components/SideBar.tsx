import { MouseEventHandler, useRef } from "react";
import logo from "../images/logo.webp"

interface platform
{ 
   platform  :platform;
   id:number;
   name : string;
   slug : string;

}

interface game
{
   id:number;
   name : string;
   metacritic:number;
   background_image:string;
   parent_platforms: platform[];
   added:number;
   released:string;
   rating:number;
   
   
}

interface genre
{
   id:number;
   image_background:string;
   name:string;
   games:game[];
}

interface Props
{
    genres:genre[];
    handlGenreSelect :(genre:string)=>void;
    errorMessage:string;
    isLoading:boolean;
}

function SideBar({genres , handlGenreSelect,errorMessage , isLoading}:Props)
{
  
   const selectGenre:MouseEventHandler<HTMLSpanElement>=(event)=>
   {
      let target = (event.target as HTMLSpanElement);
      handlGenreSelect(target.textContent? target.textContent:"");
   }
     return <>
        <div className="side-bar">
            <h2 className="side-bar-title">Genres</h2>

            {/* this is an error message in case there is something wrong */}
            {errorMessage&&<p className="error-msg side-bar-error-msg">{errorMessage}</p>}

            {/* this a spinner to simulate data loading */}
            {(isLoading && !errorMessage) &&  <div className="spinner-ctr side-spinner-ctr">
               <div className="spinner side-bar-spinner"> </div>
            </div>}
            <ul className="genres-list">
                {!isLoading&& genres.map(genre=><li key={genre.id} className="genre-item">
                    <img className="genre-pic" src={genre.image_background}/>
                      <span  onClick={selectGenre} className="genre-name">{genre.name}</span></li>)}
                 {/* <li className="genre-item"><img className="genre-pic" src={logo}/> {" "} <span className="genre-name">Action</span></li> */}
            
            </ul>
           
        
        </div>
     </>
}

export default SideBar;