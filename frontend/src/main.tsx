import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Routes from "./pages";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);
