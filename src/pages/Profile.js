import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { readBlogs } from "../helpers/firebase";
import BlogCard from "./../components/BlogCard";
import Card from "react-bootstrap/Card";

export default function Profile() {
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    readBlogs(setData, setPending);
  }, []);
  // console.log(data);

  if (pending) {
    // console.log("pending");
    return <>Loading...</>;
  }

  return (
    <div className="dashboard-container ">
      <div className="card-container w-25 p-3 m-auto">
        <Card className="bg-dark text-white w-75 m-auto">
          <Card.ImgOverlay className="p-0">
            <Card.Title className="bg-dark w-100 p-4 m-0 opacity-50">
            <i className="bi bi-person-fill"></i> {currentUser.displayName}
            </Card.Title>
            <Card.Text className="bg-dark w-100 p-2 opacity-50">
            <i className="bi bi-envelope-fill"></i> {currentUser.email}
            </Card.Text>
          </Card.ImgOverlay>
          <Card.Img  src={currentUser.photoURL} alt="Card image" />
        </Card>
      </div>

      <div className="h3 text-secondary">Contents;</div>
      {data
        .filter((el) => el.data().author === currentUser.displayName)
        .map((doc, key) => {
          return (
            <BlogCard
              id={doc.id}
              like={doc.data().likes}
              comment_count={doc.data().comment_count}
              content={doc.data().content}
              title={doc.data().title}
              author={doc.data().author}
              image={doc.data().image}
              date={doc.data().publish_date.toString()}
              // date={doc.data().publish_date}
              key={key}
            />
          );
        })}
    </div>
  );
}
