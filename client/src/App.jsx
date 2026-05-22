import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import ProtectedRoute from './components/common/ProtectedRoute';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Public pages
import Home from './pages/public/Home';
import Medicines from './pages/public/Medicines';
import MedicineDetail from './pages/public/MedicineDetail';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Requirements from './pages/public/Requirements';
import Contact from './pages/public/Contact';
import Login from './pages/public/Login';
import NotFound from './pages/NotFound';

// Admin pages
import Dashboard from './pages/admin/Dashboard';
import ManageMedicines from './pages/admin/ManageMedicines';
import AddMedicine from './pages/admin/AddMedicine';
import EditMedicine from './pages/admin/EditMedicine';
import CustomerQueries from './pages/admin/CustomerQueries';
import Profile from './pages/admin/Profile';

const App = () => (
  <ErrorBoundary>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/medicines/:id" element={<MedicineDetail />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/services" element={<Services />} />
            {/* <Route path="/requirements" element={<Requirements />} /> */}
            <Route path="/contact-us" element={<Contact />} />
          </Route>

          {/* Auth (no layout wrapper) */}
          <Route path="/login" element={<Login />} />

          {/* Admin (protected) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="medicines" element={<ManageMedicines />} />
            <Route path="add-medicine" element={<AddMedicine />} />
            <Route path="edit-medicine/:id" element={<EditMedicine />} />
            <Route path="customer-queries" element={<CustomerQueries />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { fontSize: '14px' },
          success: { iconTheme: { primary: '#2563eb', secondary: '#fff' } },
        }}
      />
    </AuthProvider>
  </ErrorBoundary>
);

export default App;
