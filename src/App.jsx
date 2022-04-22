import './App.css';
import {AllRoutes} from "./AllRoutes/AllRoutes";
import { Navbar } from './components/Navbar/Navbar';
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <Box marginTop="0.5rem" >
      <Navbar/>
      <AllRoutes />
    </Box>
  );
}

export default App;