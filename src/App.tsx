import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home/Home";
import ChatPage from "./pages/Chat/ChatPage";
import { CreateAccount } from "./pages/CreateAccount/CreateAccount";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Login</Link>
        <Link to="/singup">Sign Up</Link>
        <Link to="/chat">Chat</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/signup" element={<CreateAccount />} />
      </Routes>
    </Router>
  );
}

export default App;
