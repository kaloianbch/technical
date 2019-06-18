import React from 'react';
import './App.css';
import Banner from './components/Banner.jsx'
import SearchBar from "./components/SearchBar";

function App() {
  return (
      <div>
        <Banner/>
        <SearchBar/>
        <footer id='footer' className="d-flex justify-content-center">
            Brought to you by&nbsp;<a id='gitHubLink' href='http://github.com/kaloianbch/'>Kal</a>
        </footer>
      </div>

  );
}

export default App;
