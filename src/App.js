import { BrowserRouter, Route, Routes } from "react-router-dom";
import MiniDrawer from "./views/components/AppSideBar";
import Stocks from "./views/Stocks";
import Instruments from "./views/Instruments";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<MiniDrawer />} /> */}
          <Route path="/" element={<MiniDrawer />} >
            <Route path="stocks" element={<Stocks />} />
            <Route path="instruments/:symbol" element={<Instruments />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
