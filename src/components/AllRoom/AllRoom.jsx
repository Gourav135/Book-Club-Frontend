import "./AllRoom.css";
import { Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../Redux/Auth/auth.action";
import axios from "axios";
import GroupsIcon from "@mui/icons-material/Groups";

export const AllRoom = () => {
  const user = useSelector((store) => store.auth.user);
  const [groups, setGroups] = useState([]);
  const [arr, setArr] = useState([]);
  const dispatch = useDispatch();

  //Just to ensure that even if page is refreshed the user is not logged out
  useEffect(() => {
    dispatch(setUser(JSON.parse(localStorage.getItem("bookclubUser"))));
  }, []);

  useEffect(() => {
    if (user) {
      axios
        .get(`https://book-club-server-hackathon.herokuapp.com/groups`)
        .then(({ data }) => {
          setGroups(data);
          let array = data.map((el) => {
            let day = new Date(el.createdAt);
            return day;
          });
        });
    }
  }, [user]);

  return (
    <>
        <Box>
         <GroupsIcon sx={{ color: "white", marginTop:'0.5rem', fontSize:"2.5rem" }}> </GroupsIcon> 
        <h2>All Rooms</h2>
    </Box>
      <Box
        sx={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "0.5fr 0.5fr 0.5fr",
          gap: "2rem",
        }}
      >
        {groups.map((el) => (
          <Box
            sx={{
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              padding: "1rem",
              color: "black",
              borderRadius: "1rem",
              background:
                "radial-gradient(circle, #edeaec 0%, #fbfbfb 43%, #f0ebeb 100%)",
            }}
            key={el._id}
          >
            <h2>
              <span
                style={{
                  textDecoration: "underline",
                }}
              >
                {el.bookName}
              </span>{" "}
            </h2>
            <p>
              {" "}
              <span
                style={{
                  fontSize: "20px",
                }}
              >
                Group created at :
              </span>{" "}
              {el.createdAt}
            </p>
            <p>
              {" "}
              <span
                style={{
                  color: "black",
                  fontSize: "20px",
                }}
              >
                Description :{" "}
              </span>
              {el.description}
            </p>
            <p>
              <span
                style={{
                  color: "black",
                  fontSize: "20px",
                }}
              >
                Total members :
              </span>{" "}
              {el.members.length}/{el.memberLimit}
            </p>
            <Box>
              {user ? (
                <Button id="join-room1" variant="contained">
                  Join
                </Button>
              ) : (
                <Button disabled id="join-room1" variant="contained">
                  Join
                </Button>
              )}
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
};
