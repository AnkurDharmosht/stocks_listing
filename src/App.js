import { BrowserRouter, Route, Routes } from "react-router-dom";
import Stocks from "./views/Stocks";
import Instruments from "./views/Instruments";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Stocks />} />
          <Route path="/instruments/:symbol" element={<Instruments />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
