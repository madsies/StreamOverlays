import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import ControlPanel from "./ControlPanel";
import Scoreboard from "./components/scoreboard";
import "./App.css";
import ListenIn from "./components/listenIn";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ControlPanel />} />
                <Route path="/controller" element={<ControlPanel />} />
                <Route path="/overlay/scoreboard" element={<Scoreboard />} />
                <Route path="/overlay/listenIn" element={<ListenIn/>}/>
            </Routes>
        </BrowserRouter>
  );
}

export default App
