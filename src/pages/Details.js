import React, {useEffect,useState} from 'react'
import { readDetails } from '../helpers/firebase';
import "./Details.css"

export default function Details(props) {

    const [data, setData] = useState()

   
    
    console.log(window.location.pathname.split("details/")[1]);
    
    useEffect(() => {
        readDetails(setData,window.location.pathname.split("details/")[1])
    }, [])


    return (

        data ? 
        <div className="details-container">
            <div className="details-img-container" style={{ backgroundImage: `url(${data.image})` }}></div>
            <div className="details-title"><h1>{data.title}</h1></div>
            <div className="details-author"><span>By</span>{data.author}</div>
            <div className="details-date">{data.published_date}</div>
            <div className="details-content"><p>{data.content}</p></div>
            <div className="details-author-options">
                <button>Update</button>
                <button>Delete</button>
            </div>
            <div className="details-comments">COMMENTS</div>
        </div>
        :
        <div style={{textAlign:"center"}}>Loading</div>
    )
}
