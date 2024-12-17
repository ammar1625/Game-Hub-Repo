import { ChangeEvent , ChangeEventHandler } from "react";
interface platform
{ 
   id:number;
   name : string;
   slug : string;
}

interface Props
{
    platforms: platform[];
    genre:string;
    platform:string;
    handlePlatformSelect : (platform:string)=>void;
    handleSortFilterSelect:(sortFilter:string)=>void ;
}
function GamesFilter({platforms , genre , handlePlatformSelect , platform , handleSortFilterSelect}:Props)
{
    const SelectPlatform:ChangeEventHandler<HTMLSelectElement> =(event:ChangeEvent)=>
    {
        const target = (event.target as HTMLSelectElement);
        handlePlatformSelect(target.value)
    }
    return <>
        <div className="games-filter-ctr">
            <h1 className="filtered-games-title">{platform==="All Platforms"?"":platform+" "} {genre===""&& (platform==="All Platforms")?"All ":genre} Games</h1>
            <div className="select-filters-ctr">
                <select onChange={SelectPlatform} className="platform-options">
                  
                    <option  key={0}>All Platforms</option>
                    {platforms.map(platform=> <option key={platform.id}>{platform.name}</option>)}
                </select>

                <select onChange={(e)=>handleSortFilterSelect(e.target.value)} className="order-options">
                    <option value="">releavnce</option>
                    <option value="added">date added</option>
                    <option value="name" >name</option>
                    <option value="released" >release date</option>
                    <option value="" >popularity</option>
                    <option value="rating">Rating</option>
                    
                    
                </select>

            </div>
        </div>
    </>
}

export default GamesFilter;