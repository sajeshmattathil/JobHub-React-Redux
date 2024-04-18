import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import UserRoutes from "./Routers/User/UserRoutes.js";
import HRRoutes from "./Routers/HR/HRRoutes";
import AdminRoutes from "./Routers/Admin/AdminRoutes";
import { SocketProvider } from "./Providers/Socket.js";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary.js";
import './App.css'

function App() {
  return (
    <Router>
      <SocketProvider>
        <ErrorBoundary>
          <div className="app-container">
            <Routes>
              <Route path={"/*"} element={<UserRoutes />} />
              <Route path={"/hr/*"} element={<HRRoutes />} />
              <Route path={"/admin/*"} element={<AdminRoutes />} />
            </Routes>
          </div>
        </ErrorBoundary>
      </SocketProvider>
    </Router>
  );
}

export default App;
