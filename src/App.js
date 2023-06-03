import logo from './logo.svg';
import './App.css';
import { Auth } from './components/auth';
import { db } from './config/firebase';
import CodeEditor from './components/CodeEditor';
import AnswerOptions from './components/AnswerOptions';
import ChatInterface from './components/ChatInterface';
import ChatUI from "./components/ChatUI";

function App() {
  // const [ movies, setMovies ] = useState([]);
  // cosnt getMovieList()
  return (
    <div className="App">
      {/* <Auth /> */}
      <h1>Chat Application</h1>
      <ChatUI />
    </div>
  );
}

export default App;
