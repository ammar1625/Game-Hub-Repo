import { KeyboardEventHandler, useEffect, useState  } from "react";
import { useRef } from "react";
import logo from "../images/logo.webp"
import { IoIosSearch } from "react-icons/io";

interface Props
{
    handleGameSearch:(searchText:string)=>void;
}
function NavBar({handleGameSearch}:Props)
{
    const SwitcherRef  = useRef<HTMLInputElement>(null);
    const SearchInputRef  = useRef<HTMLInputElement>(null);
    const SearchBtnRef  = useRef<HTMLButtonElement>(null);
    const [isDark ,setDark] = useState(true);
    const [value , setValue] =useState("100");
    function switchDarkMode()
    {
       // SwitcherRef.current?.value === "100"? setValue("0"):setValue("100");

        if(SwitcherRef.current?.value==="100")
            {
                SwitcherRef.current?.classList.add("disabled");
                document.documentElement.classList.remove("dark");
                setValue("0");
            }
            else if(SwitcherRef.current?.value === "0")
            {
                SwitcherRef.current?.classList.remove("disabled");
                document.documentElement.classList.add("dark");
                setValue("100");
            }
    }

    const SubmitSearchByEnterBtn:KeyboardEventHandler<HTMLInputElement>=(e, text:string = SearchInputRef.current?.value ? SearchInputRef.current?.value:"")=>
    {
           if(!text)
            return;
            //if the enter key is pressed we trigger the click event of the search button which triggers the search function

             if(e.key === "Enter")
                {
                   
                    handleGameSearch(text);
                    //clear the search input after the data is sent to app component
                    if(SearchInputRef.current)
                    SearchInputRef.current.value = "";
                }
    }

    function searchGame(text:string)
    {
        handleGameSearch(text);
        //clear the input search input field after submiting the search text
        if(SearchInputRef.current)
            SearchInputRef.current.value = "";
    }



    

    return <> 
        <nav className="nav-bar ">
            {/* logo */}
            <img className="w-20" src = {logo}/>

            {/* search field */}
            <div className="input-ctr">
                <button ref={SearchBtnRef} onClick={()=>searchGame(SearchInputRef.current?.value ? SearchInputRef.current?.value:"")} className="search-btn"><IoIosSearch size={40} color={value==="100"?"white":"black"}/></button>
            <input onKeyDown={(e)=>SubmitSearchByEnterBtn(e)} ref={SearchInputRef} placeholder="Search games..." className="search-input" type="text"/>
            </div>  

            {/* mode control container */} 
            <div className="mode-ctr">
                <input onClick={switchDarkMode} ref = {SwitcherRef} min={0} max={100} step={100} value={value} type="range" className="mode-switcher"/>
                <h2 className="mode-label">DARK MODE</h2>
            </div>
        </nav>
    </>
}


export default NavBar;
