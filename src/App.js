import "./App.css";
import { AllRoutes } from "./AllRoutes/AllRoutes";
import { Navbar } from "./components/Navbar/Navbar";
import { Box } from "@mui/material";

function App() {
  return (
    <div>
      <Navbar />
      <Box height="20vh"></Box>
      <AllRoutes />
    </div>
  );
}

export default App;
