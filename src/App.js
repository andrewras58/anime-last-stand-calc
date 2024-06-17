import './scss/App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './Navbar';
import TechniqueReroll from './TechniqueReroll';
import StatReroll from './StatReroll';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        {/* <Navbar /> */}
        <div className="content">
          <Routes>
            <Route path="/" element={<TechniqueReroll />}></Route>
            <Route path="/stats" element={<StatReroll />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
