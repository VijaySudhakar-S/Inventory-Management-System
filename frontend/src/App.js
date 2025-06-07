import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelect from "./pages/RoleSelect";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AddItem from "./pages/admin/AddItem";
import EditItem from "./pages/admin/EditItem";
import CustomerHome from "./pages/customer/CustomerHome";
import AdminOrders from "./pages/admin/AdminOrders";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelect />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add" element={<AddItem />} />
        <Route path="/admin/edit/:id" element={<EditItem />} />
        <Route path="/customer" element={<CustomerHome />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
      </Routes>
    </Router>
  );
}

export default App;
