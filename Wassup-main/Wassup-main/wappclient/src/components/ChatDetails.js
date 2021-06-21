import { AppBar, Box, Button, TextField, Toolbar, Typography } from "@material-ui/core";
import bgImage from "../images/wapp.png";
import { useSelector } from "react-redux";
import { useState } from "react";

function ChatDetails() {
  let contact = useSelector((state) => state.contact);
  let [message, setMessage] = useState("");
  let socket = useSelector((state) => state.socket);

  return (
    <Box
      display="flex"
      flexDirection="column"
      style={{
        width: "70vw",
        height: "100vh"
      }}
    >
      <Toolbar
        style={{
          background: "#e7e7e7",
        }}
      >
        <Typography variant="h5" color="primary">{contact.name}</Typography>
      </Toolbar>

      <Box
        display="flex"
        flexDirection="column"
        flexGrow={1}
        style={{
          width: "100%",
          background: `url(${bgImage})`,
        }}
      ></Box>

      <TextField
        id="outlined-basic"
        label="Type a message"
        variant="outlined"
        fullWidth
        value={message}
        onChange={function(event) {
          setMessage(event.target.value);
        }}
      />

      <Button fullWidth variant="contained" color="primary" onClick={
        function(){
          if(socket){

            let payload = {
              reciever : contact.firebaseId,
              message : message
            }

            socket.emit("message", payload)
            // console.log(payload);
          }
        }
      }> Send </Button>
    </Box>
  );
}

export default ChatDetails;