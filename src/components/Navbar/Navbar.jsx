import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar_CSS from "./Navbar.module.css";

export const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("bookclubUser")) || null;

  const userLogout = () => {
     let ans = window.confirm("Logout !, Are you sure ?")
    if (ans) {
      localStorage.removeItem("bookclubUser");
      window.location.reload(false);
      return;
    } else {
      return;
    }
  }
  return (
    <Box
      zIndex="500"
      backgroundColor="white"
      position="sticky"
      top="0px"
      width="98%"
      display="flex"
      height="15vh"
      padding="1rem"
      boxShadow="rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"
      borderRadius="0.5rem"
      justifyContent="end"
      className={Navbar_CSS.nav_page}
    >
      <Box width="60%">
        {" "}
        <h1>
          <Link to="/" className={Navbar_CSS.page_name}>
            Book <span style={{ color:"black"}}>Club</span> 
          </Link>{" "}
        </h1>
      </Box>

      <Box width="20%">
        {!user ? (
          <>
            {" "}
            <Link to="/register" className={Navbar_CSS.butn}>
              <Button variant="contained" color="error">
                Signup
              </Button>
            </Link>
            <Link to="/login" className={Navbar_CSS.butn}>
              <Button variant="contained" color="success">
                Login
              </Button>
            </Link>
          </>
        ) : (
          <Box padding="0.2rem" textAlign="center">
            {" "}
            <p margin="0.2rem">Hello {user.name}</p>
            <Box sx={{display:"flex", gap: "20px"}}>
            <Box >
            <Link to={"/userroom"}><Button sx={{fontWeight:"bold"}}> Your Discussion Rooms</Button></Link>
            <br/>
            <Link to={"/allroom"}><Button sx={{fontWeight:"bold"}}> All Discussion Rooms </Button></Link>
            </Box>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={() => userLogout()}
            >
              Logout
            </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};
