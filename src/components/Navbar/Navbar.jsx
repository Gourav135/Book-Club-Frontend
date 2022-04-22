import { Box, Button, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <Box
      width="100%"
      display="flex"
      height="15vh"
      padding="1rem"
      boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
      borderRadius="0.5rem"
    >
      <Box width="20%">
        <Link to="/signup" >
          {" "}
          <Button colorScheme="blue">Signup</Button>
        </Link>
        <Link to="/login">
          {" "}
          <Button colorScheme="green">Login</Button>
        </Link>
      </Box>
      <Box width="20%"></Box>
      <Heading><Link to="/">I'm a Heading</Link> </Heading>
    </Box>
  );
};
