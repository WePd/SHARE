import {Route, Routes} from "react-router-dom";
import Home from "./view/Home";
import Login from "./view/Login";

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/*' element={<Home/>}/>
    </Routes>
  );
}

export default App;
