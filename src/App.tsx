import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home/Home";
import { CreateAccount } from "./pages/CreateAccount/CreateAccount";
import { Login } from "./pages/Login/Login";
import ChatPage from "./pages/Chat/ChatPage";

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/signup" element={<CreateAccount />} />
      </Routes>
    </Router>
    
  );
}

export default App;
