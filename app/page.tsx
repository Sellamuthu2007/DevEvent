import EventCard from '@/components/EventCard';
import ExploreBtn from '../components/ExploreBtn';
import events from '@/lib/constants';



const homePage = ()=>{
    return (
        <>
          <section className = 'text-center'>
            <h1>This is a Hub for Every Dev <br/>Event that you don't miss!</h1>
            <p className = 'text-center mt-5'>[Meetups,Hackathons and Conferences All in One Place!]</p>
            <ExploreBtn/>
          </section>
          <div className = "mt-10 space-y-3">
            <h3>Featured Events</h3>
            <ul className = "events">
              {events.map((event)=>
                  <li key = {event.title} >
                    <EventCard {...event}/>
                  </li>  
                )}
            </ul>
          </div>
        </>
    )
}

export default homePage;