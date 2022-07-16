import React from "react";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

function LoginPage() {
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
        <Button variant="contained" color="info">
          로그인
        </Button>
      </Box>
    </Container>
  );
}

export default LoginPage;
