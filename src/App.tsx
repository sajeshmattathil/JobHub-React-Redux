import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import UserRoutes from "./Routers/User/UserRoutes.js";
import HRRoutes from "./Routers/HR/HRRoutes";
import AdminRoutes from "./Routers/Admin/AdminRoutes";
import { SocketProvider } from "./Providers/Socket.js";
import ErrorBoundary from "./ErrorBoundary/ErrorBoundary.js";


function App() {
  return (
    <Router>
      <SocketProvider>
        <ErrorBoundary>
          <Routes>
            <Route path={"/*"} element={<UserRoutes />} />
            <Route path={"/hr/*"} element={<HRRoutes />} />
            <Route path={"/admin/*"} element={<AdminRoutes />} />
          </Routes>
        </ErrorBoundary>
      </SocketProvider>
    </Router>
  );
}

export default App;
