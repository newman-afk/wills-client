import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./scenes/Home";
import Layout from "./components/Layout";
import MyWill from "./scenes/MyWill";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mywill" element={<MyWill />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
