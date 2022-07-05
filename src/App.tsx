import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MapContainer from './map/MapContainer';
import MapEachStore from './map/MapEachStore';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MapContainer />} />
          <Route path="/store/:storeId" element={<MapEachStore />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
