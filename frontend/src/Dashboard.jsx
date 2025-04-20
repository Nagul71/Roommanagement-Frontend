import React, { useEffect, useState } from 'react';
import { Home, CalendarDays, User, HelpCircle, Bell, Settings, LogOut, Search, Menu, X, ChevronRight, Clock, Star, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem("userEmail");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(2);

  useEffect(() => {
    if (!userId) {
      navigate('/login');
    }
  }, [userId, navigate]);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
    {/* Header */}
    <header className="bg-gradient-to-r from-violet-800 to-violet-700 text-white p-4 shadow-xl sticky top-0 z-50">

      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-violet-800 text-xl font-extrabold">R</span>
          </div>
          <Link to ='/'>
          <h1 className="text-2xl font-extrabold tracking-tight">RentEase</h1>
          </Link>
    
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex space-x-1">
            <Link to="/" className="px-3 py-2 text-violet-100 hover:bg-violet-700/40 rounded-lg font-medium">
              Home
            </Link>
            <Link to="/browse-rooms" className="px-3 py-2 text-violet-100 hover:bg-violet-700/40 rounded-lg font-medium">
              Browse Rentals
            </Link>
            <Link to="/my-rooms" className="px-3 py-2 text-violet-100 hover:bg-violet-700/40 rounded-lg font-medium">
              My Listings
            </Link>
            <Link to="/support" className="px-3 py-2 text-violet-100 hover:bg-violet-700/40 rounded-lg font-medium">
            Support
          </Link>
          <Link to="/my-bookings" className="px-3 py-2 text-violet-100 hover:bg-violet-700/40 rounded-lg font-medium">
            My Bookings
          </Link>
          </div>
          
          <div className="flex items-center space-x-2">
            <Link to='/support'>
            <button className="p-2 hover:bg-violet-700/40 rounded-full relative group">
              <HelpCircle size={20} />
              <span className="absolute top-full right-0 mt-1 w-max bg-white text-gray-800 text-xs p-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50">Help</span>
            </button>
            </Link>
            <div className="relative group">
              <button className="flex items-center space-x-2 py-1 px-2 hover:bg-violet-700/40 rounded-lg">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-violet-700 font-bold">
                  {userName ? userName.charAt(0).toUpperCase() : 'U'}
                </div>
                <span className="text-sm font-medium">{userName || 'User'}</span>
              </button>
              <div className="absolute top-full right-0 mt-1 w-64 bg-white rounded-lg shadow-xl py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{userName || 'User'}</p>
                  <p className="text-xs text-gray-500 mt-1">{userEmail || 'email'}</p>
                </div>
                <Link to={`/profile/${userId}`} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <User size={16} className="mr-3 text-violet-600" /> My Profile
                </Link>
                <button onClick={() => {
                  localStorage.removeItem('userId');
                  navigate('/login');
                }} className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 border-t border-gray-100 mt-1">
                  <LogOut size={16} className="mr-3" /> Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleMobileMenu}
            className="p-2 rounded-md hover:bg-violet-700/40 focus:outline-none"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 bg-violet-800/95 rounded-xl p-4 backdrop-blur-sm animate-fadeIn shadow-xl z-40 relative">
          <div className="flex items-center bg-violet-700/60 rounded-lg px-3 py-2 mb-4">
            <Search size={16} className="text-violet-200 mr-2" />
            <input 
              type="text" 
              placeholder="Search for rentals..." 
              className="bg-transparent border-none text-sm text-white placeholder-violet-200 focus:outline-none w-full"
            />
          </div>
          <nav className="flex flex-col space-y-1">
            <Link to="/dashboard" className="flex items-center px-3 py-2 text-white rounded-md hover:bg-violet-700">
              <Home size={20} className="mr-3" /> Dashboard
            </Link>
            <Link to="/browse-rooms" className="flex items-center px-3 py-2 text-white rounded-md hover:bg-violet-700">
              <CalendarDays size={20} className="mr-3" /> Browse Rentals
            </Link>
            <Link to="/create-room" className="flex items-center px-3 py-2 text-white rounded-md hover:bg-violet-700">
              <Home size={20} className="mr-3" /> List Your Property
            </Link>
            <div className="border-t border-violet-600/50 my-2"></div>
            <Link to="/profile" className="flex items-center px-3 py-2 text-white rounded-md hover:bg-violet-700">
              <User size={20} className="mr-3" /> My Profile
            </Link>
            <Link to="/settings" className="flex items-center px-3 py-2 text-white rounded-md hover:bg-violet-700">
              <Settings size={20} className="mr-3" /> Settings
            </Link>
            <button 
              onClick={() => {
                localStorage.removeItem('userId');
                navigate('/login');
              }} 
              className="flex items-center px-3 py-2 text-white rounded-md hover:bg-violet-700 w-full text-left"
            >
              <LogOut size={20} className="mr-3" /> Log Out
            </button>
          </nav>
        </div>
      )}
    </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-violet-600 to-violet-600 rounded-2xl shadow-lg mb-10 overflow-hidden relative">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="relative z-10 px-6 py-8 md:p-10 flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0 z-0">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Welcome, {userName || 'there'}!</h2>
              <p className="text-violet-100 max-w-lg">
                Ready to find your perfect rental or list your property? Let's get started!
              </p>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => navigate('/browse-rooms')} 
                className="bg-white text-violet-700 px-5 py-2.5 rounded-lg font-medium hover:bg-violet-50 transition shadow-md"
              >
                Browse Rentals
              </button>
              <button 
                onClick={() => navigate('/create-room')} 
                className="bg-violet-500 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-violet-600 transition border border-violet-400 shadow-md"
              >
                List a Property
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-5 border border-violet-100 hover:border-violet-300 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center group-hover:bg-violet-600 transition-colors">
                <Home size={20} className="text-violet-600 group-hover:text-white transition-colors" />
              </div>
              <span className="text-xs font-medium px-2 py-1 bg-violet-50 text-violet-600 rounded-md">All Time</span>
            </div>
            <p className="text-xl font-bold text-gray-800">0</p>
            <p className="text-sm text-gray-500">Properties Listed</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-5 border border-violet-100 hover:border-violet-300 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center group-hover:bg-violet-600 transition-colors">
                <CalendarDays size={20} className="text-violet-600 group-hover:text-white transition-colors" />
              </div>
              <span className="text-xs font-medium px-2 py-1 bg-violet-50 text-violet-600 rounded-md">All Time</span>
            </div>
            <p className="text-xl font-bold text-gray-800">0</p>
            <p className="text-sm text-gray-500">Bookings Made</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-5 border border-violet-100 hover:border-violet-300 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center group-hover:bg-violet-600 transition-colors">
                <MessageSquare size={20} className="text-violet-600 group-hover:text-white transition-colors" />
              </div>
              <span className="text-xs font-medium px-2 py-1 bg-violet-50 text-violet-600 rounded-md">Unread</span>
            </div>
            <p className="text-xl font-bold text-gray-800">0</p>
            <p className="text-sm text-gray-500">Messages</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-5 border border-violet-100 hover:border-violet-300 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center group-hover:bg-violet-600 transition-colors">
                <Star size={20} className="text-violet-600 group-hover:text-white transition-colors" />
              </div>
              <span className="text-xs font-medium px-2 py-1 bg-violet-50 text-violet-600 rounded-md">Average</span>
            </div>
            <p className="text-xl font-bold text-gray-800">0</p>
            <p className="text-sm text-gray-500">Reviews</p>
          </div>
        </div>

        {/* Options Cards - Main Action Cards */}
        <h2 className="text-2xl font-bold text-gray-800 mb-5">What would you like to do today?</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Rent Room Option */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-violet-100 hover:shadow-lg transition-all group">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-violet-600 rounded-2xl flex items-center justify-center shadow-inner">
                  <Home size={28} className="text-white" />
                </div>
                <span className="text-sm font-medium px-3 py-1 bg-violet-100 text-violet-700 rounded-full">Host</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">List Your Property</h3>
              <p className="text-gray-600 mb-6">Start earning by renting out your property to tenants and travelers.</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center mr-3">
                    <span className="text-violet-700 text-xs font-bold">1</span>
                  </div>
                  <p className="text-gray-700 text-sm">Create your listing with photos and details</p>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center mr-3">
                    <span className="text-violet-700 text-xs font-bold">2</span>
                  </div>
                  <p className="text-gray-700 text-sm">Set your availability calendar and pricing</p>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center mr-3">
                    <span className="text-violet-700 text-xs font-bold">3</span>
                  </div>
                  <p className="text-gray-700 text-sm">Review requests and welcome tenants</p>
                </div>
              </div>
              
              <Link to="/create-room">
                <button className="w-full bg-gradient-to-r from-violet-600 to-violet-600 hover:from-violet-700 hover:to-violet-700 text-white py-3 px-4 rounded-xl font-medium transition shadow flex items-center justify-center group-hover:shadow-lg">
                  List Your Property
                  <ChevronRight size={18} className="ml-1" />
                </button>
              </Link>
            </div>
          </div>

          {/* Book Room Option */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-violet-100 hover:shadow-lg transition-all group">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-violet-600 rounded-2xl flex items-center justify-center shadow-inner">
                  <CalendarDays size={28} className="text-white" />
                </div>
                <span className="text-sm font-medium px-3 py-1 bg-violet-100 text-violet-700 rounded-full">Renter</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Find a Rental</h3>
              <p className="text-gray-600 mb-6">Browse available properties, filter by your preferences, and book your perfect stay.</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center mr-3">
                    <span className="text-violet-700 text-xs font-bold">1</span>
                  </div>
                  <p className="text-gray-700 text-sm">Search with location and amenity filters</p>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center mr-3">
                    <span className="text-violet-700 text-xs font-bold">2</span>
                  </div>
                  <p className="text-gray-700 text-sm">View details, photos, and property information</p>
                </div>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center mr-3">
                    <span className="text-violet-700 text-xs font-bold">3</span>
                  </div>
                  <p className="text-gray-700 text-sm">Request booking and make secure payments</p>
                </div>
              </div>
              
              <Link to="/browse-rooms" className="block">
                <button className="w-full bg-gradient-to-r from-violet-600 to-violet-600 hover:from-violet-700 hover:to-violet-700 text-white py-3 px-4 rounded-xl font-medium transition shadow flex items-center justify-center group-hover:shadow-lg">
                  Browse Rentals
                  <ChevronRight size={18} className="ml-1" />
                </button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Recent Activity Section */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold text-gray-800">Recent Activity</h2>
            <Link to="/activity" className="text-sm text-violet-600 hover:text-violet-800 font-medium flex items-center">
              View All <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md p-6 border border-violet-100">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Clock size={28} className="text-slate-400" />
              </div>
              <p className="text-gray-700 font-medium">No recent activity</p>
              <p className="text-gray-500 text-sm mt-1 text-center max-w-md">
                Your booking requests, messages, and listing updates will appear here
              </p>
              <div className="mt-6 flex space-x-4">
                <button 
                  onClick={() => navigate('/browse-rooms')}
                  className="px-4 py-2 bg-violet-50 text-violet-600 hover:bg-violet-100 rounded-lg text-sm font-medium transition-colors"
                >
                  Browse Rentals
                </button>
                <button 
                  onClick={() => navigate('/create-room')}
                  className="px-4 py-2 bg-violet-50 text-violet-600 hover:bg-violet-100 rounded-lg text-sm font-medium transition-colors"
                >
                  List a Property
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center justify-center md:justify-start">
                <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center mr-2">
                  <span className="text-white text-lg font-extrabold">R</span>
                </div>
                <h2 className="text-xl font-bold text-violet-700">RentEase</h2>
              </div>
              <p className="text-gray-600 text-sm mt-2 text-center md:text-left">Find your perfect rental property</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 mb-6 md:mb-0">
              <a href="#" className="text-gray-600 text-sm hover:text-violet-700 transition-colors">About Us</a>
              <a href="#" className="text-gray-600 text-sm hover:text-violet-700 transition-colors">Help Center</a>
              <a href="#" className="text-gray-600 text-sm hover:text-violet-700 transition-colors">Privacy</a>
              <a href="#" className="text-gray-600 text-sm hover:text-violet-700 transition-colors">Terms</a>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-gray-600 hover:bg-violet-100 hover:text-violet-600 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-gray-600 hover:bg-violet-100 hover:text-violet-600 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-gray-600 hover:bg-violet-100 hover:text-violet-600 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;