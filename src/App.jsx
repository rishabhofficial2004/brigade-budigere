import ReactGA from "react-ga4";
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { PageRoute } from "./PageRoute";

const trackingId = import.meta.env.VITE_GA_MEASUREMENT_ID || "G-TVSSKSJCL1";

function App() {
  useEffect(() => {
    if (trackingId) {
      ReactGA.initialize(trackingId);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="font-body md:text-xl bg-white">
        <PageRoute />
      </div>
    </BrowserRouter>
  );
}

export default App;
