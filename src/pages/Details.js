import React, { useEffect, useState, useContext } from "react";
import { readComments, readDetails, updateComment,deleteBlog } from "../helpers/firebase";
import "./Details.css";
import { AuthContext } from "../contexts/AuthContext";
import { useHistory } from "react-router";
import {toast} from "react-toastify"
import moment from "moment";



export default function Details(props) {
  const [data, setData] = useState([]);
  const [comments, setComments] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [newComment, setNewComment] = useState("")
  const history = useHistory()

  const handleCommentSubmit = async(e)=>{
    if (currentUser===null) {
      alert("Please login to write comment!")
    }else if (e.keyCode == 13 && e.target.value) {
      await updateComment(window.location.pathname.split("details/")[1],e.target.value,currentUser.email);
      setNewComment(e.target.value)
      e.target.value=""
    }
  }


  const handleBlogUpdate = () => {
    if (currentUser.email === data.author) {
      history.push("/update_blog/"+ window.location.pathname.split("details/")[1])
    }
  }
  
  const deleteB = ()=>{
    deleteBlog(window.location.pathname.split("details/")[1])
    history.push("/")
    toast("Blog is deleted.")
    toast.success("ok man")
  }
  




  useEffect(() => {

    readComments(setComments, window.location.pathname.split("details/")[1]);
    console.log(currentUser);
  }, [newComment]);

  useEffect(() => {
    readDetails(setData, window.location.pathname.split("details/")[1]);
    console.log(data);
  }, [])





  return data ? (
    <div className="details-container">
      <div
        className="details-img-container"
        style={{ backgroundImage: `url(${data.image})` }}
      ></div>
      <div className="details-title">
        <h1>{data.title}</h1>
      </div>
      <div className="details-author">
        <span>By</span>
        {data.author}
      </div>
      <div className="details-date">{moment(data.published_date).format("MMM DD, YYYY")}</div>
      <div className="details-content">
        <p>{data.content}</p>
      </div>
      {
        // currentUser.email === data.author

        // &&
        <div className="details-author-options">
          <button onClick={handleBlogUpdate}>Update</button>
          <button onClick={deleteB}>Delete</button>
        </div>
      }

      <div className="details-comments">
        <h3>Comments</h3>
       
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 col-lg-10">
              <div
                className="card shadow-0 border"
                style={{ backgroundColor: "#f0f2f5" }}
              >
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="addANote"
                    // onChange={e => setNewComment(e.target.value)}
                    className="form-control"
                    // value={newComment}
                    onKeyUp = {(e)=>handleCommentSubmit(e)}
                    placeholder="Type your note, and hit enter to add it"
                  />
                  <label className="form-label" htmlFor="addANote">
                    + Add a note
                  </label>
                </div>
                <div className="card-body p-0">
                  {comments?.sort((b, a) => {
                    return (
                      (a._document.version.timestamp.seconds + a._document.version.timestamp.nanoseconds/1_000_000_000 )
                       - 
                      (b._document.version.timestamp.seconds + b._document.version.timestamp.nanoseconds/1_000_000_000))}
                      ).map((el, key) => {
                    return (
                      <div className="card mb-1"  key={key}>
                        <div className="card-body">
                          <p>{el.data().userComment}</p>

                          <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                              {/* <img
                              src="https://mdbootstrap.com/img/Photos/Avatars/img%20(4).jpg"
                              alt="avatar"
                              width="25"
                              height="25"
                            /> */}
                              <i className="fas fa-user-circle"></i>
                              <p className="small mb-0 ms-2">
                                {el.data().author}
                              </p>
                            </div>
                            {/* <div className="d-flex flex-row align-items-center">
                            <p className="small text-muted mb-0">Upvote?</p>
                            <i
                              className="far fa-thumbs-up mx-2 fa-xs text-black"
                              style={{marginTop: "-0.16rem"}}
                            ></i>
                            <p className="small text-muted mb-0">3</p>
                          </div> */}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        
      </div>
    </div>
  ) : (
    <div style={{ textAlign: "center" }}>Loading</div>
  );
}
