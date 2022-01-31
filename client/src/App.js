import {BrowserRouter as Router, Routes, Route, Redirect} from "react-router-dom";

import FavouriteLists from "./pages/FavouriteLists";
import Navigation from "./components/Navigation";
import FavouriteList from "./pages/FavouriteList";
import Video from "./pages/Video";

function App() {
  return (
    <>
      <Router>
        <Navigation/>
        {/* lista rute */}
        <Routes>
          <Route exact path="/" element={<FavouriteLists/>}/>
          <Route exact path ="/list/:id" element={<FavouriteList/>}></Route>
          {/* rutare pe baza id-ului de entitate copil */}
          <Route exact path ="/list/:listId/video/:id" element={<Video/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
