import { Box, Toolbar, AppBar, Button, Grid, Typography } from "@material-ui/core";
import { flexbox } from '@material-ui/system';
import Contacts from './Contacts';
import { logout } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import firebase from "../utils/firebase";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function Chats() {
  let user = useSelector((state) => state.user);
  //console.log(user.displayName);

  let dispatch = useDispatch();
  let history = useHistory();

  return (
    <Box
      display="flex"
      flexDirection="column"
      style={{
        width: "30vw",
        height: "100vh"
      }}
    >
        <Toolbar style={{
            background: "#e7e7e7"
        }}> 
          <AccountCircleIcon color="primary"/> &nbsp; <Typography variant="h5" color="primary">{user ? user.displayName : null}</Typography>
        </Toolbar>

        <Toolbar style={{
            background: "#ffffff"
        }}>
        
        <Grid container display="flex" justify="space-between">
          <Typography variant="h6" color="textPrimary">Users</Typography>
          <Button 
            variant="outlined" 
            color="secondary"
            onClick={() => {
              firebase.auth().signOut().then(function(user) {
                dispatch(logout(user));
                history.push("/login");
              }).catch(function(error) {
                console.log(error);
              });
                
            }} >Logout
          </Button>
        </Grid>
          
        </Toolbar>

        <Contacts />
    </Box>
  );
}

export default Chats;