import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [user, setUSer] = useState(false);

  return (
    <Box
      zIndex="2"
      backgroundColor="white"
      position="fixed"
      width="100%"
      display="flex"
      height="15vh"
      padding="1rem"
      boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
      borderRadius="0.5rem"
      justifyContent="end"
    >
      <Box width="40%">
        {" "}
        <Heading>
          <Link to="/">Book Club</Link>{" "}
        </Heading>
      </Box>

      <Box width="20%">
        {!user ? (
          <>
            {" "}
            <Link to="/register">
              {" "}
              <Button colorScheme="blue">Signup</Button>
            </Link>
            <Link to="/login">
              {" "}
              <Button colorScheme="green">Login</Button>
            </Link>
          </>
        ) : (<Box padding="0.2rem" textAlign="center"> <Text margin="0.2rem">User name</Text>
         <Button size='sm' colorScheme="red" variant="outline">Logout</Button>
        </Box>
         
        )}
      </Box>
    </Box>
  );
};
