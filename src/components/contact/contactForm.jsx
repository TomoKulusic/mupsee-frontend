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
import authHeader from "../../services/authHeader";

export const ContactForm = () => {
  const { login } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify({
        subject: event.target.subject.value,
        body: event.target.body.value,
      }),
    };
    fetch("https://localhost:7289/Email", requestOptions)
      .then((response) => response.json())

      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container component="main" maxWidth="xl">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Contact us
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="subject"
            label="Subject"
            name="subject"
            autoFocus
          />
          <TextField
            id="outlined-multiline-static"
            required
            label="Body"
            multiline
            rows={4}
            fullWidth
            name="body"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit Request
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
