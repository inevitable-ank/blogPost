import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BlogPost from './components/Blog/BlogPost';
import AdminPanel from './pages/AdminPanel';
import CreatePost from './components/Admin/CreatePost';
import ManagePosts from './components/Admin/ManagePosts';
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
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/blog/:id" element={<BlogPost />} />

                    {/* Admin Protected Routes */}
                    <Route path="/admin" element={<ProtectedRoute role="admin"><AdminPanel /></ProtectedRoute>} />
                    <Route path="/admin/create-post" element={<ProtectedRoute role="admin"><CreatePost /></ProtectedRoute>} />
                    <Route path="/admin/manage-posts" element={<ProtectedRoute role="admin"><ManagePosts /></ProtectedRoute>} />

                    {/* 404 Not Found Page  */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </Router>
        </AuthProvider>
    );
};

export default App;
