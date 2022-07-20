import React, { Component } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../services/useAuth";
import UserService from "../../services/userService";

export const LoginPage = () => {
  const { login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();

    var body = JSON.stringify({
      username: event.target.username.value,
      password: event.target.password.value,
    });

    console.log(body);

    UserService.Login(body)
      .then((response) => response.json())
      .then((res) => {
        if (res === null) {
        } else {
          login({
            token: res.token,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="username"
            label="Username"
            type="string"
            id="username"
            placeholder="Dummy"
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            placeholder="Dummy_user"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

// class LoginPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//     this.userService = UserService();
//     this.login = useAuth();
//   }

//   handleSubmit = (event) => {
//     event.preventDefault();

//     var body = JSON.stringify({
//       username: event.target.email.value,
//       password: event.target.password.value,
//     });

//     this.userService
//       .Login(body)
//       .then((response) => response.json())
//       .then((res) => {
//         console.log(res);
//         this.login({
//           token: res.token,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   render() {
//
//   }
// }

// export default LoginPage;
