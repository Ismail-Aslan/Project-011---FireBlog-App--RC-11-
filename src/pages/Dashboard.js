import React, {useEffect, useState} from 'react'
import BlogCard from '../components/BlogCard';
import { readData,updatedata } from '../helpers/firebase'
import { doc } from '@firebase/firestore';
import { async } from '@firebase/util';
export default function Dashboard() {

    const [data, setData] = useState([])

    useEffect(() => {
        readData(setData);
    }, [])
    // console.log(data);



    return (
        <div className="dashboard-container">
            {data.map((doc,key)=> {
             return <BlogCard
                    id={doc.id}
                    like={doc.data().get_like_count}
                    comment_count={doc.data().comment_count}
                    content={doc.data().content}
                    title={doc.data().title}
                    author={doc.data().author}
                    image={doc.data().image}
                    // date={doc.data().published_date.toString()}
                    date={doc.data().published_date}
                    key={key}
                    />
                    
                   
                })}
        </div>
    )
}
