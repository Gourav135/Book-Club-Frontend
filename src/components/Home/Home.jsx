import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";




export const Home = () => {
    const [books, setBooks] = useState([]);
    useEffect(()=>{
        axios.get(`http://openlibrary.org/subjects/love.json?limit=10`).then(({data})=>{
            console.log(data)
            let x = data.works.map((el)=>{
                // console.log(el)
                return {
                    title:el.title,
                    author:el.authors[0].name,
                    cover:`https://covers.openlibrary.org/b/id/${el.cover_id}-M.jpg`,
                    key:el.key
                }
            })
            console.log(x)
            setBooks(x);
        }).catch((er)=>{
            console.log(er)
        })
    },[])
    return (
        <div>
            {books.length>0&&books.map((el)=>{
                return <div key={el.key}>
                    <Link to={`${el.key.trim().split("/")[2]}`}>
                    <img src={el.cover} alt="cover" />
                    <h3>{el.title}</h3>
                    <p>{el.author&&el.author}</p>
                    </Link>
                </div>
            })}
        </div>
    )
}

//http://openlibrary.org/search.json?q=the+lord+of+the+rings