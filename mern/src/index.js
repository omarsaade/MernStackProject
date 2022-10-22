import React from "react";
import ReactDOM from "react-dom/client";
// import 'mapbox-gl/dist/mapbox-gl.css';
import "./index.css";
import App from "./App";
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";

//starting point in the app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>
);
