import React, { useState, useEffect } from "react";
import Auth from "./Auth";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Interface() {
  const [user, setUser] = useState(null);
  const [level, setLevel] = useState('');
  const [languages, setLanguages] = useState([]);
  const [focus, setFocus] = useState(null);
  const [goals, setGoals] = useState({ shortTerm: '', longTerm: '' });

  const onLogin = (user) => {
    setUser(user);
  };

  const onLogout = () => {
    setUser(null);
  };

  return (
    <div className="App">
      {/* <Router>
        <nav className="nav">
          {user
            ? <Link to="/dashboard">Dashboard</Link>
            : <div>Login needed</div>
          }
        </nav>

          <Route path="/" exact>
            <Auth onLogin={onLogin} onLogout={onLogout} />
          </Route>
          {user? (
            <>
              <Route path="/dashboard">

              </Route>
              <Route path="/curriculum/:id">

              </Route>
              <Route path="/chat">

              </Route>
              <Route path="/test/:id">

              </Route>
            </>
          ) : (
            <div>Please log in to access the content</div>
          )}
      </Router> */}
    </div>
  );
}
           
export default Interface;