// import React, { Component } from "react";
// import { useAuth } from "../../services/useAuth";

// export const Login = () => {
//   const { login } = useAuth();

//   const LoginUser = () => {
//     const requestOptions = {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         username: "jason_admin",
//         password: "MyPass_w0rd",
//       }),
//     };
//     fetch("https://localhost:7289/api/Login", requestOptions)
//       .then((response) => response.json())

//       .then((res) => {
//         // localStorage.setItem("token", res.token);
//         login({
//           token: res.token,
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return <button onClick={() => LoginUser()}>Login</button>;
// };

import * as React from "react";
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

export const LoginPage = () => {
  const { login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "jason_admin",
        password: "MyPass_w0rd",
      }),
    };
    fetch("https://localhost:7289/api/Login", requestOptions)
      .then((response) => response.json())

      .then((res) => {
        // localStorage.setItem("token", res.token);
        login({
          token: res.token,
        });
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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login In
          </Button>
          <Grid container>
            <Grid item>
              <RouterLink to="/register">
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
