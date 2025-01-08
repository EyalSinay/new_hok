import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Torah from "./pages/Torah";
import Prophets from "./pages/Prophets";
import Writings from "./pages/Writings";
import Mishnah from "./pages/Mishnah";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/torah" replace />} />
                <Route path="/torah" element={<Torah />} />
                <Route path="/prophets" element={<Prophets />} />
                <Route path="/writings" element={<Writings />} />
                <Route path="/mishnah" element={<Mishnah />} />
            </Routes>
        </Router>
    );
}

export default App;
