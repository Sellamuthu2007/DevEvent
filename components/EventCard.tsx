import Link from "next/link";
import Image from "next/image";


interface Props  {
    title : string,
    image : string,
    description : string,
    location : string,
    date : string,
    time : string,
}


const EventCard = ({
        title,
        image,
        description,
        location,
        date,
        time
    } : Props)=>{
    return (
        <>
            <Link href = {"/events"} id="event-card">
                <Image src = {image} alt = "Image" width = {410} height = {300} className = "poster"></Image>
                <div className="flex flex-row gap-2">
                    <img src="/icons/pin.svg" alt="" />
                    <p>{location}</p>
                </div>
                <h4>{title}</h4>
                <p>{description}</p>
                <div className="flex flex-row gap-2">
                    <img src="/icons/calendar.svg" alt="" /><p>{date}</p>
                    <p>|</p>
                    <img src="/icons/clock.svg" alt="" /><p>{time} </p>

                </div>
            </Link>
        </>
    )
}

export default EventCard;
