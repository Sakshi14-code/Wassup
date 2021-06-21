import { AppBar, Box, Button, TextField, Toolbar, Typography } from "@material-ui/core";
import bgImage from "../images/wapp.png";
import { useSelector } from "react-redux";
import { useState } from "react";
import { sizeHeight } from "@material-ui/system";

function Background() {
  let contact = useSelector((state) => state.contact);
  let [message, setMessage] = useState("");
  let socket = useSelector((state) => state.socket);

  return (
    <Box 
      display="flex"
      justifyContent="center" 
      alignItems="center"
      flexDirection="row"
      style={{
        width: "70vw",
        height: "100vh",
        background: `url(${bgImage})`,
      }}
    >
        <Box>
            {/* <Typography variant="h3" color="primary">Select a contact</Typography> */}
            <h1 style={{color: "grey", fontSize: "50px", fontWeight: "normal"}}> Select a contact </h1>
        </Box>
    </Box>
  );
}

export default Background;