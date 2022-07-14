import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MapContainer from './map/MapContainer';
import MapEachStore from './map/MapEachStore';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/:userId/:lng/:lat" element={<MapContainer />} />
          <Route path="/store/:missionId" element={<MapEachStore />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
