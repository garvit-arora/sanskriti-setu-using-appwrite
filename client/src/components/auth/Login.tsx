import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { signInAccount, getCurrentUser } from '../../lib/appwrite';

interface LoginProps {
  onLogin: (userData: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // Sign in user
      const session = await signInAccount({
        email: formData.email,
        password: formData.password
      });

      // Get user profile
      const userProfile = await getCurrentUser();

      toast.success('Welcome back!');
      
      // Convert to format expected by App.tsx
      const userData = {
        user: {
          _id: userProfile.userId,
          name: userProfile.name,
          email: userProfile.email,
          culturalProfile: {
            state: userProfile.state,
            city: userProfile.city,
            primaryLanguages: userProfile.primaryLanguages,
            bio: userProfile.bio
          },
          gamification: {
            points: userProfile.points,
            level: userProfile.level
          }
        },
        token: session.$id
      };
      
      onLogin(userData);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8"
      >
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Welcome back to Sanskriti Setu
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Continue your cultural journey
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Enter your password"
              />
            </div>
            
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
            
            <div className="text-center">
              <span className="text-sm text-gray-600">Don't have an account? </span>
              <Link to="/register" className="text-sm text-orange-600 hover:text-orange-700 font-medium">
                Join Sanskriti Setu
              </Link>
            </div>
          </form>
          
        </div>
        
        <div className="text-center">
          <Link to="/" className="text-sm text-orange-600 hover:text-orange-700">
            ← Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
