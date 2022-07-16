import { Box, Button, Container, TextField } from "@mui/material";
import React from "react";

function RegisterPage() {
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
      >
        <TextField label="ID" variant="outlined" sx={{ mb: 1 }} />
        <TextField label="PASSWORD" variant="outlined" sx={{ mb: 1 }} />
        <TextField label="NAME" variant="outlined" sx={{ mb: 1 }} />
        <TextField label="EMAIL" variant="outlined" sx={{ mb: 1 }} />
        <Button variant="contained" color="info">
          회원가입
        </Button>
      </Box>
    </Container>
  );
}

export default RegisterPage;
