//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BoxGenerator from "./pages/squarebox/Boxgrid";
import SalesDashboard from "./pages/barchart/Barchart";
import NoPage from "./pages/NoPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>          
          <Route index element={<SalesDashboard/>} />
          <Route path="box-generator" element={<BoxGenerator />} />
          <Route path="user-detail" element={<Home />} />
          <Route path="*" element={<NoPage />} />          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
