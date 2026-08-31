import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import ControlPanel from "./ControlPanel";
import Scoreboard from "./components/scoreboard";
import "./App.css";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ControlPanel />} />
                <Route path="/controller" element={<ControlPanel />} />
                <Route path="/overlay/scoreboard" element={<Scoreboard />} />
            </Routes>
        </BrowserRouter>
  );
}

export default App
