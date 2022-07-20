import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing/LandingPage";
import LoginPage from "./pages/Login/LoginPage";
import CreateAccountPage from "./pages/CreateAccount/CreateAccountPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
