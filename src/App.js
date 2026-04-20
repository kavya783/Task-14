import { BrowserRouter, Routes, Route } from "react-router-dom";
import store from "./redux/store";
import HrDashboard from "./pages/HrDashboard";
import LeavePage from "./pages/LeavePage";
import LeaveForm from "./components/LeaveForm";
import ProtectedRoute from "./components/ProtectedRoute";
import { Provider } from "react-redux";
import Authentication from "./pages/Authentication";

import EmployeeDashboard from "./pages/EmployeeDashboard";
import { ToastContainer } from "react-toastify";
import EmployeeLeave from "./components/EmployeeLeave";

function App() {
  return (
    <Provider store={store}>
      
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Authentication />} />

          <Route
            path="/hr"
            element={
              <ProtectedRoute roleAllowed={["hr"]}>
                <HrDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/leave"
            element={
              <ProtectedRoute roleAllowed={["hr"]}>
                <LeavePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/employee"
            element={
              <ProtectedRoute roleAllowed={["employee"]}>
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leave/form"
            element={
              <ProtectedRoute roleAllowed={["employee"]}>
                <LeaveForm />
              </ProtectedRoute>
            }
          />
          
           <Route path="/leave/status" element={
             <ProtectedRoute roleAllowed={["employee"]}>
              <EmployeeLeave />
             </ProtectedRoute>
            } />

        </Routes>
      </BrowserRouter>
              <ToastContainer />
    </Provider>
    
  );
}
export default App;





