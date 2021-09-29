
import React, { useState, useContext, useEffect,useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { readDetails, updateBlog } from "../helpers/firebase";
import { useHistory } from "react-router";


export default function UpdateBlog() {
  const [data, setData] = useState([]);
  const [x, setX] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const title = useRef("")
  const imageURL = useRef("");
  const content = useRef("");
  const history = useHistory();

  const handleClick = () => {
      
    if (title.current.value && content.current.value && imageURL.current.value ) {
        updateBlog(
          window.location.pathname.split("update_blog/")[1],
          title.current.value,
          imageURL.current.value,
          content.current.value
        );
      history.push("/details/"+ window.location.pathname.split("update_blog/")[1]);

    }else {
      alert("Please fill the form!");
    }
  };

  
  useEffect(async () => {
    await readDetails(setData,setX, window.location.pathname.split("update_blog/")[1]);
  }, []);
  

  return data ? (
      
    <div className="register">
      <div className="register-form">
        <h1 className="form-title display-3">── Update Blog ──</h1>
        <form id="register">
          <div className="mb-3">
            <input
              required
              type="text"
              className="form-control"
              id="title"
              placeholder="Title*"
              defaultValue={data.title}
              ref={title}
            />
          </div>
          <div className="mb-3">
            <input
              required
              type="text"
              className="form-control"
              id="image-url"
              placeholder="Image URL*"
              defaultValue={data.image}
              ref={imageURL}
            />
          </div>
          <div className="mb-3">
            <textarea
              required
              className="form-control content"
              id="content"
              placeholder="Content*"
              defaultValue={data.content}
              ref={content}
            />
          </div>
          <input
            type="button"
            className="btn btn-primary form-control"
            value="Submit"
            onClick={() => handleClick()}
          />
        </form>
      </div>
    </div>
  ) : (
    <>Loading</>
  );
}
