import Actors from "./Pages/Actors";
import Home from "./Pages/Home";
import Movies from "./Pages/Movies";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SubMenu from "./components/SubMenu/SubMenu";

function App() {
  return (
    <Router>
      <main className="bg-[#0d0d0d]">
        <Navbar />
        <SubMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/actors" element={<Actors />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
