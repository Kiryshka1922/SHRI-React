import { BrowserRouter, Route, Routes } from "react-router-dom";

import Analytic from "./components/PageAnalytics/Analytic";
import Generator from "./components/PageGeneration/Generator";
import History from "./components/PageHistory/History";
import Wrapper from "./components/Wrapper/Wrapper";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Wrapper/>}>
          <Route path="/analytics" element={<Analytic />} />
          <Route path="/generate" element={<Generator/>} />
          <Route path="/history" element={<History/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
