import { ReactNode } from "react";

interface Props
{
    filterCtr : ReactNode;
    gamesGrid : ReactNode;
}
function GamesCtr({filterCtr,gamesGrid}:Props)
{
    return <>
     <div className="games-ctr">
        {filterCtr}
        {gamesGrid}
     </div>
    </>
}

export default GamesCtr;