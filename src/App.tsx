import Login from "./components/Login";

const App = () => {
  return (
    <div className="App">
      <div className="bg-gray-900 h-[100vh] overflow-hidden w-[100vw] text-white text-center flex items-center justify-center">
        <div className="bg-gray-200 h-full md:h-[90vh] w-full md:w-[450px] overflow-hidden rounded-none md:rounded-[12px] transition-all">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default App;
