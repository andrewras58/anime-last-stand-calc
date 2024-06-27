import './scss/App.scss';
import TechniqueReroll from './TechniqueReroll';
import UnitStats from './UnitStats';
import { HashRouter, Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <nav className="navbar">
            <Link to="/">Technique Reroll</Link>
            <Link to="/unit-stats">Unit Stats</Link>
        </nav>
        <Routes>
          <Route path="/" element={<TechniqueReroll />}/>
          <Route path="/unit-stats" element={<UnitStats />}/>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
