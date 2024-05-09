import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { RealTimeWeatherPage, NotFoundPage } from "@pages";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={"real-time-weather"} />} />
        <Route path="/real-time-weather" element={<RealTimeWeatherPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
