import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MapCategory from "./map/MapCategory";
import MapContainer from "./map/MapContainer";
import MapEachStore from "./map/MapEachStore";
import MapSearch from "./map/MapSearch";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/:userId/:lat/:lng" element={<MapContainer />} />
          <Route path="/store/:missionId" element={<MapEachStore />} />
          <Route
            path="/search/:userId/:keyword/:lat/:lng"
            element={<MapSearch />}
          />
          <Route
            path="/search/tag/:userId/:categoryId/:lat/:lng"
            element={<MapCategory />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
