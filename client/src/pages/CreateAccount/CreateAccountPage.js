import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

function CreateAccountPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const onUserIdHandler = (event) => {
    setUserId(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      userid: userId,
      password: password,
      name: name,
      email: email,
    };

    axios.post("/api/users/createaccount", body).then((response) => {
      if (response.data.success) {
        alert("회원가입 성공");
        console.log(response);
      } else {
        alert("회원가입 실패");
        console.log(response);
      }
    });
  };

  return (
    <Container fixed>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
        }}
        onSubmit={onSubmitHandler}
      >
        <Typography align="center">CREATE ACCOUNT</Typography>
        <TextField
          label="ID"
          variant="outlined"
          sx={{ mb: 1 }}
          value={userId}
          onChange={onUserIdHandler}
        />
        <TextField
          label="PASSWORD"
          type="password"
          variant="outlined"
          sx={{ mb: 1 }}
          value={password}
          onChange={onPasswordHandler}
        />
        <TextField
          label="NAME"
          variant="outlined"
          sx={{ mb: 1 }}
          value={name}
          onChange={onNameHandler}
        />
        <TextField
          label="EMAIL"
          variant="outlined"
          sx={{ mb: 1 }}
          value={email}
          onChange={onEmailHandler}
        />
        <Button variant="contained" color="info" type="submit">
          회원가입
        </Button>
      </Box>
    </Container>
  );
}

export default CreateAccountPage;
