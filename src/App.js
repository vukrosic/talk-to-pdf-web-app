import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Feedback from './components/Feedback';
import ChatUI from './components/ChatUI';
import Auth from './components/Auth';
import OrderPyCode from './components/OrderPyCode';
import Interface from './components/Interface';
import { db } from './config/firebase'
import { getDocs, collection } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import QuestionsForm from './components/QuestionsForm';
import CurriculumGenerator from './components/CurriculumGenerator';
import ChatInterface from './components/ChatInterface';
import TeachGPT from './components/TeachGPT';

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
        <li>
          <Link to="/orderpycode">OrderPyCode</Link>
        </li>
      </ul>
    </nav>
  );
}

// function HomePage() {
//   return <h1>Home Page</h1>;
// }

function App() {
  const [movieList, setMovieList] = useState([]);
  const moviesCollectionRef = collection(db, "movies");

  useEffect(() => {
    const getMovieList = async () => {
      try{
        const data = await getDocs(moviesCollectionRef);
        const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
        setMovieList(filteredData);
      }
      catch(error){
        console.log(error);
      }
    };

    getMovieList();
  }, []);

  return (
    <div className="App">
      <Router>
        {/* <Navigation /> */}

        {/* <Routes>
          <Route path="/" element={<ChatUI />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/chat" element={<ChatUI />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/orderpycode" element={<OrderPyCode />} />
        </Routes> */}

       

        {/* <Auth /> */}
      </Router>
      {/* <div>
          {movieList.map((movie) => (
            <div>
              <h1> {movie.title} </h1>
              <p> {movie.releaseDate} </p>
              <p> {movie.receivedAnOscar} </p>
            </div>
          ))}
        </div> */}
        {/* <ChatUI /> */}
        {/* <TeachGPT /> */}
        {/* <Interface />
        
        <QuestionsForm />
        <CurriculumGenerator /> */}
        {/* <ChatInterface /> */}
      <ChatUI />
    </div>
  );
}

export default App;
