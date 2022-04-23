import logo from './logo.svg';
import './App.css';
import {AllRoutes} from "./AllRoutes/AllRoutes";
import { Box } from '@mui/material';
import {Navbar} from "../src/components/Navbar/Navbar"

function App() {
  return (
    <div className="App">
      <Navbar />
      <Box height="20vh"></Box>
      <AllRoutes />
    </div>
  );
}

export default App;
