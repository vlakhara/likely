import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewPost from "./pages/NewPost";
import { AuthProvider } from "./context";
import UserProfile from "./pages/UserProfile";

const App = () => {
  return (
    <div className="App">
      <AuthProvider>
        <div className="bg-gray-900 h-[100vh] overflow-hidden w-[100vw] text-black text-center flex items-center justify-center">
          <div className="bg-white h-full max-h-[1050px] w-full md:w-[400px] overflow-hidden transition-all">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/new-post" element={<NewPost />} />
                {/* <Route path="/profile" element={<UserProfile />} /> */}
              </Routes>
            </BrowserRouter>
          </div>
        </div>
      </AuthProvider>
    </div>
  );
};

export default App;
