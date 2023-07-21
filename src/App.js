import './App.css';
import { Routes, Route } from 'react-router-dom';
import Topbar from './components/Topbar/Topbar';
import Footer from './components/Footer/Footer';
import Movielist from './components/Movielist/Movielist';
import Moviedetails from './components/Moviedetails/Moviedetails';
import Actordetails from './components/Actordetails/Actordetails';

function App() {
  return (
    <div className="App">
      <Topbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Movielist page_title="Now playing" listMovies="now_playing" />} />
          <Route path="/top-rated" element={<Movielist page_title="Top rated" listMovies="top_rated" />} />
          <Route path="/movie/:id" element={<Moviedetails />} />
          <Route path="/actor/:id" element={<Actordetails />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
