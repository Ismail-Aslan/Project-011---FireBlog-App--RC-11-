import React, { useState, useContext } from "react";
import "./BlogCard.css";
import moment from "moment";
import { AuthContext } from "../contexts/AuthContext";
import { useHistory } from "react-router-dom";




export default function BlogCard(props) {
  const [like, setLike] = useState(props.like);
  const [comment_count, setComment_count] = useState(props.comment_count);
  const { currentUser } = useContext(AuthContext);
  const history = useHistory()

  // console.log("currentUser:",currentUser);

 

  const openDetails = (e) => {

    // const commentX = prompt("yorum giriniz:")
    // updateComment(props.id,commentX,currentUser.email);
    // setComment_count(comment_count + 1);

    
    // readDetails(e.target.parentNode.id)
    // console.log(e.target.id);
    history.push("/details/" + e.target.id)

  };
 


  
  return (
    <div className="blog-card-container" >
      <div
        className="blog-card blog-card-img-container"
        style={{ backgroundImage: `url(${props.image})` }}
      >
        {/* <img src={props.image} alt="blog image" /> */}
      </div>
      <div className="blog-card blog-card-main-container " >
        <h2>{props.title}</h2>
        {/* <h3>{props.date}</h3> */}
        <h3>{moment(props.date).format("MMM DD, YYYY")}</h3>
        {/* <p>{props.content}</p> */}
        <p>{props.content.length>80 ?props.content.substring(0,80) + "...":props.content}</p>
      </div>
      <div className="blog-card blog-card-footer-container ">
        <h2>
          By {props.author}
        </h2>
        
        <div className="blog-card-btn-container">
        <div>
          <button className="blog-card-btn" >
            <i  className={like.find(el => el===currentUser.email) ? "bi bi-heart-fill" : "bi bi-heart"} style={{color:"red"}} ></i> 
          </button>{like.length}
          </div>
          <div>
          <button className="blog-card-btn" style={{color:"gray"}}>
            <i className="far fa-comment" ></i> 
          </button>{comment_count}</div>
        </div>
      </div>
    <div className="blog-card-layer" id={props.id} onClick={(e)=>openDetails(e)}></div>
    </div>
  );
}
