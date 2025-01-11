import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BlogPost from './components/Blog/BlogPost';
import AdminDashboard from './pages/AdminDashboard';
import CreatePost from './components/Admin/CreatePost';
import ManagePosts from './components/Admin/ManagePosts';
import ManageUsers from './components/Admin/ManageUsers';
import NotFound from './pages/NotFound';
import Header from './components/Shared/Header';
import Footer from './components/Shared/Footer';
import ProtectedRoute from './components/Shared/ProtectedRoute';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <Routes>
                    {/* ✅ Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/blog/:id" element={<BlogPost />} />

                    {/* ✅ Admin Protected Routes */}
                    <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
                    <Route path="/create-post" element={<ProtectedRoute role="admin"><CreatePost /></ProtectedRoute>} />
                    <Route path="/admin/manage-posts" element={<ProtectedRoute role="admin"><ManagePosts /></ProtectedRoute>} />
                    <Route path="/admin/manage-users" element={<ProtectedRoute role="admin"><ManageUsers /></ProtectedRoute>} />

                    {/* ✅ Catch-All Route for 404 */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </Router>
        </AuthProvider>
    );
};

export default App;
