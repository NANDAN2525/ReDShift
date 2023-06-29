import { Sidenavbar, Content, Topnavbar } from "./components";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

function App() {
  const [openEmployess, setopenEmployess] = useState(false);
  console.log("openEmployess:");
  console.log(openEmployess);
  return (
    <div className="App">
      <Topnavbar />
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="content_layout">
        <Sidenavbar
          openEmployess={openEmployess}
          setopenEmployess={setopenEmployess}
        />
        <Content
          openEmployess={openEmployess}
          setopenEmployess={setopenEmployess}
        />
      </div>
    </div>
  );
}

export default App;
