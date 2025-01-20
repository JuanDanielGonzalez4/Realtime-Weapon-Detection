import viteLogo from "/logo.svg";
import "./App.css";
import BoxVideo from "./components/BoxVideo";
import GridVideos from "./components/GridVideos";

function App() {
  return (
    <>
      <h1 className="text-5xl text-[#709b16] font-bold">Weapon detection</h1>
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo mx-auto" alt="Vite logo" />
      </a>
      <p className="text-xl">Detect weapons in real time</p>
      <GridVideos />
    </>
  );
}

export default App;
