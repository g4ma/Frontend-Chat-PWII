import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./pages/Home/Home";
import { CreateAccount } from "./pages/Auth/CreateAccount/CreateAccount";
import { Login } from "./pages/Auth/Login/Login";
import ChatPage from "./pages/Chat/ChatPage";

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<CreateAccount />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
    
  );
}

export default App;
