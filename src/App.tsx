import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <div className="bg-gray-900 h-[100vh] overflow-hidden w-[100vw] text-white text-center flex items-center justify-center">
        <div className="bg-white h-full max-h-[1050px] w-full md:w-[500px] overflow-hidden transition-all">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
};

export default App;
