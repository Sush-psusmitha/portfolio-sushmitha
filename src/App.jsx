import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import SmoothScroll from "./utils/SmoothScroll";
import ProjectDetail from "./pages/ProjectDetail";
import Cursor from "./components/Cursor";
import { TransitionProvider } from "./components/PageTransition";

function App() {
  return (
    <SmoothScroll>
      <Cursor />
      <TransitionProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/:id" element={<ProjectDetail />} />
        </Routes>
      </TransitionProvider>
    </SmoothScroll>
  );
}

export default App;
