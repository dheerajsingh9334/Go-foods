import './App.css';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';  //npm i bootstrap-dark-5 boostrap
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

import Home from './screen/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
// import Navbar from './Component/Navbar';
import Login from './screen/Login';
import Signup from './screen/Signup';
import { CartProvider } from './Component/ContextReducer';

import Myorder from './screen/Myorder';

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/myorder" element={<Myorder />} />

          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;