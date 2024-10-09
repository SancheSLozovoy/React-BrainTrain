import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Settings from './pages/settings/Settings';
import Game from './pages/game/Game';
 
const App: React.FunctionComponent = () => {
  return ( 
    <Router>
      <Routes>
        <Route path='/' element={<Settings/>}/>
        <Route path='/game' element={<Game/>}/>
      </Routes>
    </Router>
   );
}
 
export default App;
