import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', mobileNo: '', password: '', profileInfo: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL = 'http://localhost:8080/auth';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // src/components/SignupForm.js
const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const response = await axios.post(`${API_BASE_URL}/signin`, formData);
      
      // Store user ID in localStorage
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('userName', response.data.name);
      localStorage.setItem('userEmail', response.data.email);
      
      navigate("/dashboard");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Signup failed');
      } else {
        setError(err.message || 'Signup failed. Try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-violet-800">Create your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <a href="/login" className="font-medium text-violet-600 hover:text-violet-500">
              sign in to your existing account
            </a>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-violet-500 focus:border-violet-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-violet-500 focus:border-violet-500"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label htmlFor="mobileNo" className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <input
                id="mobileNo"
                name="mobileNo"
                type="tel"
                autoComplete="tel"
                required
                value={formData.mobileNo}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-violet-500 focus:border-violet-500"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-violet-500 focus:border-violet-500 pr-10"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  <span className="text-gray-500 text-sm">
                    {showPassword ? 'Hide' : 'Show'}
                  </span>
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters</p>
            </div>

            <div>
              <label htmlFor="profileInfo" className="block text-sm font-medium text-gray-700">
                Profile Information
              </label>
              <textarea
                id="profileInfo"
                name="profileInfo"
                rows="3"
                value={formData.profileInfo}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-violet-500 focus:border-violet-500"
                placeholder="Tell us a little about yourself"
              ></textarea>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the <a href="/terms" className="text-violet-600 hover:text-violet-500">Terms of Service</a> and <a href="/privacy" className="text-violet-600 hover:text-violet-500">Privacy Policy</a>
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white 
                ${loading ? 'bg-violet-400' : 'bg-violet-600 hover:bg-violet-700'} 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-colors duration-200`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Creating account...</span>
                </>
              ) : (
                <span>Create account</span>
              )}
            </button>
          </div>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="font-medium text-violet-600 hover:text-violet-500">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
