import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route path='/' />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
