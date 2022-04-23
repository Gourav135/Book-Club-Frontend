import { Box, Button, Image, Input, Stack, Text } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
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
    <Box className="main" width="100%">
        <Box  height="15vh"></Box>
      <Box
        width="100%"
        padding="2rem"
        height="20vh"
        display="flex"
        justifyContent="flex-end"
      >
        <Stack  width="45%" direction="row" spacing="4rem">
          <Button
            colorScheme="pink"
            variant="ghost"
            border="0.5px solid"
            onClick={() => handleSort(1)}
          >
            A - Z
          </Button>
          <Button
            colorScheme="orange"
            variant="ghost"
            border="0.5px solid"
            onClick={() => handleSort(0)}
          >
            Z - A
          </Button>
        </Stack>{" "}
        <SearchIcon w={4} h={10} color="gray" marginRight="0.5rem"></SearchIcon>
        <Input
          variant="flushed"
          placeholder="Search Books"
          htmlSize={20}
          width="auto"
        />{" "}
      </Box>
      <hr />
      <Box
        width="100%"
        padding="2rem"
        display="grid"
        gridTemplateColumns="1fr 1fr 1fr 1fr"
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
                  <Link to={`${el.key.trim().split("/")[2]}`}>
                    <Image
                      height="80%"
                      width="100%"
                      margin="auto"
                      borderRadius="0.5rem"
                      src={el.cover}
                      alt="cover"
                    />
                    <Box margin="0.8rem 0rem">
                      <Text fontSize="15px" fontWeight="600" textAlign="center">
                        {el.title}
                      </Text>
                      <Text fontSize="10px" textAlign="center">
                        {el.author && el.author}
                      </Text>
                    </Box>
                  </Link>
                </Box>
              );
            })}
      </Box>
    </Box>
  );
};
