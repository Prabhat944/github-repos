import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RepoList from './components/RepoList';
import RepoDetails from './components/RepoDetails';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<RepoList />} />
          <Route path="/repo/:repoName" element={<RepoDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
