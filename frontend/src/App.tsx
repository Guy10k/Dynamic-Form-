import React from "react";
import axios from 'axios';
import { ReportForm } from "./ReportForm";
import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';



// Item Object - hold a configure report item.
interface Item {
  name: string;
  required: boolean
  type: string;
}


const App:React.FC = () =>
{
  const [item, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
   
    axios
      .get('http://127.0.0.1:5000/form_definitions') // Send GET request to backend
      .then((response) => {
        console.log('Full Response:', response);
        console.log('Response Data:', response.data);
        // console.log('Fetched Data:', response.data); // Log response
        setItems(response.data); // Update state with fetched data
      })
      .catch((error) => {
        console.error('Error fetching data:', error);

      })
      .finally(() => {
        setLoading(false); // Set loading to false after fetching data
      });
  }, []); // Empty dependency array ensures this runs once on component mount

  if (loading) {
    // return <div>Loading...</div>; // Render a loading message or spinner
    return <CircularProgress />;
  }
  return( 
  <div style={{textAlign: "center"}} >
    <ReportForm items={item} heading="Personal Report"/>
  </div>
  );
};
export default App;

