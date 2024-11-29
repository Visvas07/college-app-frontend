import Classes from "./Classes/Classes"
import { useEffect } from "react"
import { Link } from "react-router-dom";

function Home(){
    useEffect(()=>{
        document.title="CSE Institute";
    })
    return(
        <div className="container">
            <h2 className="text-center mt-5">Available classes<Link to={'/all-classes'} className="float-end">See All</Link></h2>
            <Classes/>
        </div>
    )
}

export default Home