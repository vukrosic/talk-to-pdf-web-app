import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Feedback from './components/Feedback';
import ChatUI from './components/ChatUI';
import Auth from './components/auth';

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/chat">Chat</Link>
        </li>
        <li>
          <Link to="/feedback">Feedback</Link>
        </li>
        <li>
          <Link to="/auth">Auth</Link>
        </li>
      </ul>
    </nav>
  );
}

function HomePage() {
  return <h1>Home Page</h1>;
}

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/chat" element={<ChatUI />} />
          <Route path="/auth" element={<Auth />} />
          {/* Add more routes for your pages */}
        </Routes>

        {/* <Auth /> */}
      </Router>
      {/* <ChatUI /> */}
    </div>
  );
}

export default App;
