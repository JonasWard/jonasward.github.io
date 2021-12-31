import logo from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import {Game} from "./play/tik-tak-toe";
import About from "./components/About";
import {resumeData} from "./resources/txt/resumeData.js";

function App() {
    return (
        <Router>
            <div className="App">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/about">About Us</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact Us</Link>
                    </li>
                </ul>
                <Routes>
                    <Route path="/" element={<Game/>}/>
                    <Route path="about" element={<About { ...resumeData}/>}/>
                    <Route path="contact" element={<h1>Contact Us</h1>}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
