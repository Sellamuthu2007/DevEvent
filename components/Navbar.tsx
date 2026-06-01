import Link from "next/link";
import Image from "next/image";

const Navbar = ()=>{
    return (       
        <header>
            <nav>
                <Link href = '/' className = "logo">
                    <Image src = "/icons/logo.png" alt = "Logo" width = {24} height = {24}/>
                    <p>DevEvent</p>
                </Link>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/">Events</a></li>
                    <li><a href="/">Create Event</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar;