import React, {useEffect, useState} from 'react'
import BlogCard from '../components/BlogCard';
import { readBlogs,updatedata } from '../helpers/firebase'
import { doc } from '@firebase/firestore';
import { async } from '@firebase/util';
export default function Dashboard() {

    const [data, setData] = useState([])
    const [pending, setPending] = useState(true);

    useEffect(() => {
        readBlogs(setData,setPending);
    }, [])
    // console.log(data);

    if(pending){
        // console.log("pending");
        return <>Loading...</>
      }

    return (
        <div className="dashboard-container">
            {data.map((doc,key)=> {
             return <BlogCard
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
                    
                   
                })}
        </div>
    )
}
