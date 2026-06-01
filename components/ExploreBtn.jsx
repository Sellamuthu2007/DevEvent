"use-clinet"

import Image from "next/image";

const ExploreBtn = ()=>{
    return (        
        <button id = "explore-btn" className="mt-7 mx-auto ">
            <a href="#events">Explore Events</a>
            <Image src="icons/arrow-down.svg" alt="arrow-down" width = {24} height = {24} className="mx-2"/>
        </button>
        
        
    )
}

export default ExploreBtn;