import logo from './logo.svg';
import './App.css';
import { Auth } from './components/auth';
import { db } from './config/firebase';
import ChatUI from "./components/ChatUI";

function App() {
  // const [ movies, setMovies ] = useState([]);
  // cosnt getMovieList()
  return (
    <div className="App">
      {/* <Auth /> */}
      <ChatUI />
    </div>
  );
}

export default App;
