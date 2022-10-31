import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "components/NavBar";
import { Box, ThemeProvider } from "@mui/material";
import { darkMode } from "theme";
import Footer from "components/Footer";
import Home from "pages/Home";
import MovieDetail from "pages/MovieDetail";

function App() {
  return (
    <ThemeProvider theme={darkMode}>
      <Router>
        <NavBar />
        <Box>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:imdbID" element={<MovieDetail />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </Box>
        <Footer />
      </Router>
    </ThemeProvider>
  );
}

export default App;
