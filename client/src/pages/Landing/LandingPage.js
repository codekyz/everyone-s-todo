import React from "react";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

// const Item = styled(Paper)({
//   padding: "20px",
//   marginTop: "20px",
//   marginBottom: "20px",
// });

function LandingPage() {
  const navigate = useNavigate();
  return (
    <Container fixed>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h3">Everyone's Todo</Typography>
          <Typography align="center">
            목표나 계획을 소문내는 것은 달성률을 높이는 방법 중 하나입니다.
          </Typography>
          <Button
            variant="contained"
            color="info"
            onClick={() => {
              navigate("/login");
            }}
          >
            로그인
          </Button>
          <Button
            variant="contained"
            color="info"
            onClick={() => {
              navigate("/register");
            }}
          >
            계정만들기
          </Button>
          <Button variant="contained" color="info">
            kakao로 시작하기
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}

export default LandingPage;
