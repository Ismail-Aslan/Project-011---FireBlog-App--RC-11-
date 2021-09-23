import React, {useState, useContext, } from 'react'
import { AuthContext } from "../contexts/AuthContext";
import { addData} from './../helpers/firebase';


export default function NewBlog() {



    const { currentUser } = useContext(AuthContext);
    const [title, setTitle] = useState("")
    const [imageURL, setImageURL] = useState("")
    const [content, setContent] = useState("")

    const handleClick = () => {
        addData(currentUser,title,content,imageURL);
        setTitle("")
        setContent("")
        setImageURL("")
    }

    return (
        <div className="register">
      
      <div className="register-form">
        <h1 className="form-title display-3">── New Blog ──</h1>
        <form id="register">

          <div className="mb-3"> 
            <input type="text" className="form-control" id="title" placeholder="Title*" value={title} onChange={e => setTitle(e.target.value)} />
          </div> 
          <div className="mb-3">
            <input type="text" className="form-control" id="image-url" placeholder="Image URL*" value={imageURL}  onChange={e => setImageURL(e.target.value)}/>
          </div>
          <div className="mb-3">
            <textarea  className="form-control content" id="content" placeholder="Content*" value={content}  onChange={e => setContent(e.target.value)}/>
          </div>
          <input type="button" className="btn btn-primary form-control" value="Submit"  onClick={handleClick}/>
        </form>
        

      </div>
      
    </div>
      
    )
}
