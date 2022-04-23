import { Box, Input, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import Home_css from "./Home.module.css";

export const Home = () => {
  const [books, setBooks] = useState([]);
  const [AtoZ, setAtoZ] = useState(false);
  const [ZtoA, setZtoA] = useState(false);
  useEffect(() => {
    axios
      .get(`http://openlibrary.org/subjects/love.json?limit=10`)
      .then(({ data }) => {
        let x = data.works.map((el) => {
          return {
            title: el.title,
            author: el.authors[0].name,
            cover: `https://covers.openlibrary.org/b/id/${el.cover_id}-M.jpg`,
            key: el.key,
          };
        });
        console.log(x);
        setBooks(x);
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);

  const handleSort = (value) => {
    if (value === 1) {
      setZtoA(false);
      setAtoZ(true);
    } else {
      setZtoA(true);
      setAtoZ(false);
    }
  };

  return (
    <Box className="main" width="94%">
      <Box
        width="100%"
        padding="2rem"
        height="10vh"
        display="flex"
        marginTop={5}
        justifyContent="flex-end"
      >
        <Box width="65%" direction="row" >
          <Button variant="contained"  onClick={() => handleSort(1)}>
            A - Z
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleSort(0)}
          >
            Z - A
          </Button>
        </Box>
        <Box>
          <Input placeholder="Search Book"  />
        </Box>
      </Box>
      <hr width={1000}/>
      <Box
        width="100%"
        padding="2rem"
        display="grid"
        gridTemplateColumns="1fr 1fr 1fr"
        justifyContent="space-around"
      >
        {books.length > 0 &&
          books
            .sort((a, b) =>
              AtoZ
                ? a.title.localeCompare(b.title)
                : ZtoA
                ? b.title.localeCompare(a.title)
                : true
            )
            .map((el) => {
              return (
                <Box
                  className={Home_css.bookBox}
                  boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
                  padding="0.5rem"
                  margin="2rem"
                  borderRadius="0.5rem"
                  key={el.key}
                >
                  <Link  className={Home_css.bookdes}  to={`${el.key.trim().split("/")[2]}`}>
                    <img
                      style={{
                        height: "80%",
                        width: "100%",
                        margin: "auto",
                        borderRadius: "0.5rem",
                      }}
                      src={el.cover}
                      alt="cover"
                    />
                    <Box textAlign="center">
                      <h3>{el.title}</h3>
                      <p style={{ fontSize:"12px"}} >{el.author && el.author}</p>
                    </Box>
                  </Link>
                </Box>
              );
            })}
      </Box>
    </Box>
  );
};
