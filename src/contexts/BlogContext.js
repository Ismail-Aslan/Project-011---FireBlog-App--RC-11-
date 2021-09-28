// import { createContext, useState, useEffect } from "react";
// import { readBlogs } from "../helpers/firebase"; 
// export const BlogContext = createContext();



// export function BlogContextProvider(props) {

//   const [blogs, setBlogs] = useState(null);
//   const [pending, setPending] = useState(true);
//   // const [likes, setLikes] = useState(null);
//   // const [comments, setComments] = useState(null);

//   useEffect(() => {
//     readBlogs(setBlogs,setPending);
    
//   }, []);

//   if(pending){
//     // console.log("pending");
//     return <>Loading...</>
//   }

//   return (
//     <BlogContext.Provider value={{ blogs}}>
//       {props.children}
//     </BlogContext.Provider>
//   );
// }


