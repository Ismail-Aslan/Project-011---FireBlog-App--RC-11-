import React from 'react'

export default function BlogCard(props) {
    return (
        <div className="blog-card-container">
            <div className="blog card blog-card-img-container ">
                <img src={props.img} alt="blog image" />
            </div>
            <div className="blog card blog-card-main-container ">
                <h2>{props.title}</h2>
                <h3>{props.date}</h3>
                <p>{props.content}</p>
            </div>
            <div className="blog card blog-card-footer-container ">
                <h2><i className="fas fa-user-circle"></i> {props.writer}</h2>
                <i class="fas fa-heart"></i>    <i class="far fa-comment"></i>
            </div>
        </div>
    )
}
