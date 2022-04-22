import { Box, Button, Image, Input, Stack, Text } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";

export const Home = () => {
  const [bookData, setBookData] = useState([]);
  const [page, setPage] = useState(1);
  const [AtoZ, setAtoZ] = useState(false);
  const [ZtoA, setZtoA] = useState(false);

  useEffect(() => {
    getBooks();
  }, [page]);

  const handleSort = (value) => {
    if (value === 1) {
      setZtoA(false);
      setAtoZ(true);
    } else {
      setZtoA(true);
      setAtoZ(false);
    }
  };

  const getBooks = () => {
    axios
      .get(`http://localhost:9090/books?_limit=9&_page=${page}`)
      .then(({ data }) => {
        setBookData([...data]);
      });
  };

  return (
    <Box className="main" width="100%">
      <Box
        width="100%"
        padding="2rem"
        height="20vh"
        // border="1px solid black"
        display="flex"
        justifyContent="flex-end"
      >
        <Stack width="40%" direction="row" spacing="4rem">
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
      <Box
        width="100%"
        padding="2rem"
        display="grid"
        gridTemplateColumns="1fr 1fr 1fr"
        justifyContent="space-around"
      >
        {bookData
          .sort((a, b) =>
            AtoZ
              ? a.title.localeCompare(b.title)
              : ZtoA
              ? b.title.localeCompare(a.title)
              : true
          )
          .map((el, i) => (
            <Box
              boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
              padding="0.5rem"
              margin="2rem"
              key={i}
              borderRadius="0.5rem"
            >
              <Image margin="auto" src={el.image} alt="image" />

              <Text textAlign="center">{el.title}</Text>
            </Box>
          ))}
      </Box>
      <Box width="90%" margin="1rem" display="flex" justifyContent="flex-end">
        <Button
          margin="1rem"
          colorScheme="yellow"
          variant="solid"
          disabled={page === 1 ? true : false}
          onClick={() => {
            setPage(page - 1);
          }}
        >
          Prev
        </Button>
        <Button
          margin="1rem"
          colorScheme="yellow"
          variant="solid"
          disabled={!bookData.length ? true : false}
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};
