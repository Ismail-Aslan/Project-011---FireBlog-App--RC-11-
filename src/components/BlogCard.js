import { Timestamp } from "@firebase/firestore";
import React, { useState } from "react";
import { updateLike } from "../helpers/firebase";
import "./BlogCard.css";


export default function BlogCard(props) {
  const [like, setLike] = useState(props.like);
  const [comment, setsetComment] = useState(props.comment);

  const updateLikes = () => {
    updateLike(props.id);
    setLike(like + 1);
  };


  const x = new Timestamp(props.date).toDate()
console.log(x);
  return (
    <div className="blog-card-container">
      <div
        className="blog-card blog-card-img-container"
        style={{ backgroundImage: `url(${props.image})` }}
      >
        {/* <img src={props.image} alt="blog image" /> */}
      </div>
      <div className="blog-card blog-card-main-container ">
        <h2>{props.title}</h2>
        <h3>{props.date}</h3>
        <p>{props.content}</p>
      </div>
      <div className="blog-card blog-card-footer-container ">
        <h2>
          <i className="fas fa-user-circle"></i> {props.author}
        </h2>
        
        <div className="blog-card-btn-container">
        <div>
          <button className="blog-card-btn" onClick={updateLikes}>
            <i className="fas fa-heart" style={like>0 ? {color:"red"} : {color:"black"}}></i> 
          </button>{like}
          </div>
          <div>
          <button className="blog-card-btn" onClick={updateLikes}>
            <i className="far fa-comment" style={like>0 ? {color:"red"} : {color:"black"}}style={like>0 ? {color:"red"} : {color:"black"}}></i> 
          </button>{like}</div>
        </div>
      </div>
    </div>
  );
}
