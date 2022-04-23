import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar_CSS from "./Navbar.module.css";
export const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("bookclubUser")) || null;

  const userLogout = () => {
    localStorage.removeItem("bookclubUser");
    window.location.reload(false);
  };
  console.log(user);
  return (
    <Box
      zIndex="2"
      backgroundColor="white"
      position="fixed"
      width="98%"
      display="flex"
      height="15vh"
      padding="1rem"
      boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
      borderRadius="0.5rem"
      justifyContent="end"
      className={Navbar_CSS.nav_page}
    >
      <Box width="38%">
        {" "}
        <h1>
          <Link to="/" className={Navbar_CSS.page_name}>
            Book Club
          </Link>{" "}
        </h1>
      </Box>

      <Box width="20%">
        {!user ? (
          <>
            {" "}
            <Link to="/register" className={Navbar_CSS.butn}>
              <Button  variant="contained" color="error" >Signup</Button>
            </Link>
            <Link to="/login" className={Navbar_CSS.butn}>
              <Button variant="contained" color="success">Login</Button>
            </Link>
          </>
        ) : (
          <Box padding="0.2rem" textAlign="center">
            {" "}
            <p margin="0.2rem">Hello {user.name}</p>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => userLogout()}
            >
              Logout
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};