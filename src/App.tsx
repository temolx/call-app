import './App.css';

import PieChart from './components/PieChart';
import Landing from './components/Landing';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/stats' element={<PieChart />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
