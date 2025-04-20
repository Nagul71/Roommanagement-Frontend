import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSignInAlt, FaUserPlus, FaBed, FaMapMarkerAlt, FaStar, FaHeart, FaSearch, FaCalendarAlt, FaUsers, FaMoneyBillWave, FaShieldAlt } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="bg-gray-50 font-sans">
      {/* Header with Curved Elements */}
      <header className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-violet-50 rounded-bl-[30%] z-0"></div>
        
        {/* Navigation */}
        <nav className="relative z-10 px-6 py-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center justify-between">
              <Link to="/" className="text-2xl font-bold text-violet-800 flex items-center">
                <span className="font-handwriting">RentEase</span>
              </Link>
              
              <button className="md:hidden text-gray-600 hover:text-violet-700">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
            
            <div className="hidden md:flex md:items-center md:space-x-6 mt-4 md:mt-0">
              <Link to="/listings" className="text-gray-600 hover:text-violet-700">Browse Rooms</Link>
              <Link to="/how-it-works" className="text-gray-600 hover:text-violet-700">How It Works</Link>
              <Link to="/contact" className="text-gray-600 hover:text-violet-700">Contact</Link>
              <Link to="/login" className="px-4 py-2 border-2 border-violet-600 text-violet-700 rounded-full hover:bg-violet-50 transition duration-300 flex items-center">
                <FaSignInAlt className="mr-2" /> Login
              </Link>
              <Link to="/signup" className="px-4 py-2 bg-violet-600 text-white rounded-full hover:bg-violet-700 transition duration-300 flex items-center">
                <FaUserPlus className="mr-2" /> Sign Up
              </Link>
            </div>
          </div>
        </nav>
        
        {/* Hero Section */}
        <div className="relative z-10 py-10 md:py-20 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row">
            <div className="md:w-1/2 md:pr-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
                Find your perfect rental 
                <span className="block text-violet-700">or list your property</span>
              </h1>
              <p className="mt-6 text-lg text-gray-600 max-w-lg">
                Discover rental rooms that fit your needs or earn income by renting out your space. Our platform connects property owners with renters seamlessly.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <Link to="/signup" className="px-6 py-3 bg-violet-600 text-white text-lg rounded-full shadow-lg hover:bg-violet-700 transition duration-300 text-center flex items-center justify-center">
                  <FaSearch className="mr-2" /> Find a Room
                </Link>
                <Link to="/signup" className="px-6 py-3 border-2 border-violet-300 text-violet-700 text-lg rounded-full hover:bg-violet-50 transition duration-300 text-center">
                  List Your Property
                </Link>
              </div>
              <div className="mt-8 flex items-center text-gray-500">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Verified listings • Secure payments • Trusted community</span>
              </div>
            </div>
            
            <div className="md:w-1/2 mt-12 md:mt-0">
              <div className="relative h-64 md:h-auto">
                <div className="absolute top-0 right-0 w-64 h-64 bg-violet-200 rounded-full opacity-70 -mr-8"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-300 rounded-full opacity-70 -ml-12"></div>
                <div className="relative z-10 bg-white p-6 rounded-lg shadow-lg transform rotate-1">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img src="https://randomuser.me/api/portraits/women/45.jpg" alt="Host" className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-800">Downtown Apartment</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <FaMapMarkerAlt className="mr-1" />
                        <span>Downtown • 2.3 miles away</span>
                      </div>
                    </div>
                    <div className="ml-auto flex items-center text-yellow-400">
                      <FaStar />
                      <span className="ml-1 text-gray-800">4.8</span>
                    </div>
                  </div>
                  <div className="relative h-48 bg-gray-200 rounded-lg overflow-hidden mb-4">
                    <img src="https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Room" className="w-full h-full object-cover" />
                    <button className="absolute top-2 right-2 text-red-500 bg-white p-2 rounded-full">
                      <FaHeart />
                    </button>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-600">Private room</p>
                      <p className="text-sm text-gray-500">Available from June 1</p>
                    </div>
                    <div className="text-right">
                      <p className="text-violet-700 font-bold">$850/month</p>
                      <p className="text-xs text-gray-500">Utilities included</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">How RentEase works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Simple steps to rent a room or list your property
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-32 left-0 right-0 h-0.5 bg-violet-200 z-0"></div>
            
            {/* Step 1 */}
            <div className="relative z-10">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-violet-100 text-violet-600 rounded-full mb-6">
                <span className="text-xl font-bold">1</span>
              </div>
              <div className="bg-white p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Create an Account</h3>
                <p className="text-gray-600">
                  Sign up as a renter or property owner. Complete your profile to access all features.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative z-10">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-violet-100 text-violet-600 rounded-full mb-6">
                <span className="text-xl font-bold">2</span>
              </div>
              <div className="bg-white p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Find or List</h3>
                <p className="text-gray-600">
                  Browse available rooms or list your property with photos, pricing, and amenities.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative z-10">
              <div className="mx-auto w-16 h-16 flex items-center justify-center bg-violet-100 text-violet-600 rounded-full mb-6">
                <span className="text-xl font-bold">3</span>
              </div>
              <div className="bg-white p-6 rounded-lg text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Connect & Rent</h3>
                <p className="text-gray-600">
                  Message property owners, schedule viewings, and finalize rental agreements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Featured Rentals</h2>
              <p className="mt-2 text-gray-600">Recently listed properties in your area</p>
            </div>
            <Link to="/search" className="text-violet-600 hover:text-violet-800 font-medium">
              View all listings →
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Room 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300">
              <div className="relative h-48">
                <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Room" className="w-full h-full object-cover" />
                <button className="absolute top-3 right-3 text-white bg-black bg-opacity-30 p-2 rounded-full hover:bg-opacity-50">
                  <FaHeart />
                </button>
                <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded-full text-sm font-medium">
                  $750/month
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">Sunny Private Room</h3>
                    <p className="text-gray-600 flex items-center mt-1">
                      <FaMapMarkerAlt className="mr-1 text-violet-500" />
                      Downtown • 1.2 miles away
                    </p>
                  </div>
                  <div className="flex items-center text-yellow-400">
                    <FaStar />
                    <span className="ml-1 text-gray-800">4.7</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                  <span className="text-sm text-gray-500">Private room</span>
                  <span className="text-sm text-gray-500">Available now</span>
                </div>
              </div>
            </div>
            
            {/* Room 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300">
              <div className="relative h-48">
                <img src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Room" className="w-full h-full object-cover" />
                <button className="absolute top-3 right-3 text-red-500 bg-white p-2 rounded-full">
                  <FaHeart />
                </button>
                <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded-full text-sm font-medium">
                  $950/month
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">Modern Studio Apartment</h3>
                    <p className="text-gray-600 flex items-center mt-1">
                      <FaMapMarkerAlt className="mr-1 text-violet-500" />
                      Midtown • 3.1 miles away
                    </p>
                  </div>
                  <div className="flex items-center text-yellow-400">
                    <FaStar />
                    <span className="ml-1 text-gray-800">4.9</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                  <span className="text-sm text-gray-500">Entire apartment</span>
                  <span className="text-sm text-gray-500">Available June 15</span>
                </div>
              </div>
            </div>
            
            {/* Room 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300">
              <div className="relative h-48">
                <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Room" className="w-full h-full object-cover" />
                <button className="absolute top-3 right-3 text-white bg-black bg-opacity-30 p-2 rounded-full hover:bg-opacity-50">
                  <FaHeart />
                </button>
                <div className="absolute bottom-3 left-3 bg-white px-2 py-1 rounded-full text-sm font-medium">
                  $650/month
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">Cozy Basement Suite</h3>
                    <p className="text-gray-600 flex items-center mt-1">
                      <FaMapMarkerAlt className="mr-1 text-violet-500" />
                      Suburbs • 5.7 miles away
                    </p>
                  </div>
                  <div className="flex items-center text-yellow-400">
                    <FaStar />
                    <span className="ml-1 text-gray-800">4.5</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                  <span className="text-sm text-gray-500">Private suite</span>
                  <span className="text-sm text-gray-500">Available July 1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Why choose RentEase?</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              The best platform for property owners and renters
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-100 hover:border-violet-200 transition duration-300">
              <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 mb-4">
                <FaShieldAlt className="text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Verified Listings</h3>
              <p className="text-gray-600">
                Every property listing is verified to ensure accuracy and prevent fraud.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-100 hover:border-violet-200 transition duration-300">
              <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 mb-4">
                <FaMoneyBillWave className="text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">No Hidden Fees</h3>
              <p className="text-gray-600">
                Transparent pricing with no surprise charges for renters or property owners.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-100 hover:border-violet-200 transition duration-300">
              <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 mb-4">
                <FaUsers className="text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Easy Communication</h3>
              <p className="text-gray-600">
                Built-in messaging system makes it easy to connect with property owners or renters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">What our users say</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Real experiences from our community
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Found my perfect rental in just two days! The process was so much easier than traditional apartment hunting."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="User" className="w-full h-full object-cover" />
                </div>
                <div className="ml-3">
                  <h4 className="text-gray-800 font-medium">Jessica T.</h4>
                  <p className="text-gray-500 text-sm">Renter in Chicago</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm transform md:translate-y-4">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "As a property owner, RentEase helped me find responsible tenants quickly. The platform is easy to use and secure."
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="User" className="w-full h-full object-cover" />
                </div>
                <div className="ml-3">
                  <h4 className="text-gray-800 font-medium">Michael R.</h4>
                  <p className="text-gray-500 text-sm">Property Owner in Seattle</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex text-yellow-400 mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
              <p className="text-gray-600 mb-4 italic">
                "Moving to a new city was stressful, but RentEase made finding affordable housing so much simpler!"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="User" className="w-full h-full object-cover" />
                </div>
                <div className="ml-3">
                  <h4 className="text-gray-800 font-medium">Amanda K.</h4>
                  <p className="text-gray-500 text-sm">Renter in Austin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-violet-600 to-violet-800 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to find your perfect rental or list your property?
          </h2>
          <p className="text-lg text-violet-100 mb-8 max-w-2xl mx-auto">
            Join thousands of happy users who found their ideal rental situation through RentEase
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup" className="px-8 py-4 bg-white text-violet-700 text-lg font-medium rounded-full shadow-lg hover:bg-violet-50 transition duration-300">
              Sign Up Free
            </Link>
            <Link to="/signup" className="px-8 py-4 border-2 border-white text-white text-lg font-medium rounded-full hover:bg-violet-700 transition duration-300">
              Browse Listings
            </Link>
          </div>
          <p className="mt-6 text-violet-200">
            Have questions? <Link to="/contact" className="underline hover:text-white">Contact our support team</Link>
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 pt-16 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">RentEase</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/careers" className="hover:text-white">Careers</Link></li>
                <li><Link to="/press" className="hover:text-white">Press</Link></li>
                <li><Link to="/blog" className="hover:text-white">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">For Renters</h3>
              <ul className="space-y-2">
                <li><Link to="/search" className="hover:text-white">Browse Rentals</Link></li>
                <li><Link to="/rental-guide" className="hover:text-white">Renter's Guide</Link></li>
                <li><Link to="/faq" className="hover:text-white">FAQ</Link></li>
                <li><Link to="/safety-tips" className="hover:text-white">Safety Tips</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">For Property Owners</h3>
              <ul className="space-y-2">
                <li><Link to="/host" className="hover:text-white">List Your Property</Link></li>
                <li><Link to="/host-guide" className="hover:text-white">Owner's Guide</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/resources" className="hover:text-white">Resources</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link to="/security" className="hover:text-white">Security</Link></li>
                <li><Link to="/accessibility" className="hover:text-white">Accessibility</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center justify-center md:justify-start mb-4 md:mb-0">
              <Link to="/" className="text-2xl font-bold text-white flex items-center">
                <span className="font-handwriting">RentEase</span>
              </Link>
              <span className="ml-4 text-gray-500">© {new Date().getFullYear()} All rights reserved</span>
            </div>
            
            <div className="flex justify-center md:justify-end space-x-6">
              <Link to="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.597 0-2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;