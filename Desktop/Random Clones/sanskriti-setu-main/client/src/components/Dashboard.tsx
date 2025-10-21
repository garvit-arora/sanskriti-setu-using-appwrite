import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Transition from './Transition';
import dance from "../assets/dance.jpeg"
import food from "../assets/food.jpg"
import arts from "../assets/arts.avif"
import music from "../assets/music.jpg"
import bgImage from "../assets/back.jpg"
import CulturalCalendar from './CultureCalendar';
import Footer from './Footer';
import { getCurrentUser, getRecommendedProfiles, UserProfile } from '../lib/appwrite';
import toast from 'react-hot-toast';

interface User {
  _id: string;
  name: string;
  culturalProfile: {
    state: string;
    city: string;
  };
  gamification: {
    points: number;
    level: number;
  };
}

interface DashboardProps {
  user: User | null;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [recommendedProfiles, setRecommendedProfiles] = useState<(UserProfile & { similarity: number })[]>([]);
  const [loading, setLoading] = useState(false);

  const loadRecommendations = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const currentUserProfile = await getCurrentUser();
      const recommendations = await getRecommendedProfiles(currentUserProfile);
      setRecommendedProfiles(recommendations);
    } catch (error) {
      console.error('Failed to load recommendations:', error);
      toast.error('Failed to load profile recommendations');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadRecommendations();
  }, [loadRecommendations]);
  return (
    <Transition>
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-orange-900">Sanskriti Setu</h1>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/discover" className="text-gray-700 hover:text-orange-600">Discover</Link>
              <Link to="/matches" className="text-gray-700 hover:text-orange-600">Matches</Link>
              <Link to="/chat" className="text-gray-700 hover:text-orange-600">Chat</Link>
              <Link to="/indiamap" className="text-gray-700 hover:text-orange-600">KYC</Link>
              <Link to="/profile" className="text-gray-700 hover:text-orange-600">Profile</Link>
              <button 
                onClick={onLogout}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

        <div className="w-full m-0 px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-orange-500 to-red-500 h-50 w-full bg-cover bg-center rounded-xl p-8 text-white mb-8"
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-orange-100">
              From {user?.culturalProfile.city}, {user?.culturalProfile.state}
            </p>
            <div className="mt-4 flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {user?.gamification.points}
                </div>
                <div className="text-sm text-orange-100">Points</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {user?.gamification.level}
                </div>
                <div className="text-sm text-orange-100">Level</div>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Link
                to="/discover"
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-200 block"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Discover People
                </h3>
                <p className="text-gray-600 text-sm">Find cultural matches</p>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Link
                to="/matches"
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-200 block"
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  My Matches
                </h3>
                <p className="text-gray-600 text-sm">View your connections</p>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/indiamap"
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-200 block"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🎭</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">KYC</h3>
                <p className="text-gray-600 text-sm">Know Your Country</p>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                to="/chat"
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-200 block"
              >
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">💬</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Chat</h3>
                <p className="text-gray-600 text-sm">Continue conversations</p>
              </Link>
            </motion.div>
          </div>

          {/* Profile Recommendations */}
          {recommendedProfiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Recommended for You</h2>
                    <p className="text-gray-600">People with similar cultural interests and skills</p>
                  </div>
                  <div className="text-orange-600">
                    <span className="text-2xl">✨</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {recommendedProfiles.slice(0, 6).map((profile, index) => (
                    <motion.div
                      key={profile.$id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-4 hover:shadow-md transition-all duration-300 border border-orange-200"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold text-lg">
                          {profile.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-sm">{profile.name}</h3>
                          <p className="text-xs text-gray-600">{profile.city}, {profile.state}</p>
                        </div>
                        <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                          {Math.round(profile.similarity * 100)}%
                        </div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {profile.culturalInterests.slice(0, 2).map(interest => (
                            <span key={interest} className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                              {interest}
                            </span>
                          ))}
                          {profile.skills.slice(0, 1).map(skill => (
                            <span key={skill} className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                              {skill}
                            </span>
                          ))}
                          {(profile.culturalInterests.length + profile.skills.length) > 3 && (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                              +{profile.culturalInterests.length + profile.skills.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-orange-600 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-orange-700 transition">
                          Connect
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="text-center">
                  <Link
                    to="/discover"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 transition duration-200 font-medium shadow-md"
                  >
                    <span className="mr-2">🔍</span>
                    Discover More Profiles
                    <span className="ml-2">→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center mb-8"
            >
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="inline-flex items-center space-x-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-600"></div>
                  <span className="text-gray-600 font-medium">Finding your perfect cultural matches...</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Recent Activity */}
          {/* <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Cultural Exchange Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-sm">🎪</span>
              </div>
              <div>
                <p className="font-medium">Gaurav liked your Ganesh Chaturthi post</p>
                <p className="text-sm text-gray-600">2 hours ago</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-sm">🤝</span>
              </div>
              <div>
                <p className="font-medium">New cultural match from Punjab!</p>
                <p className="text-sm text-gray-600">1 day ago</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <span className="text-sm">⭐</span>
              </div>
              <div>
                <p className="font-medium">You earned the "Cultural Ambassador" badge!</p>
                <p className="text-sm text-gray-600">3 days ago</p>
              </div>
            </div>
          </div>
        </div> */}
        <h1 className='text-4xl font-bold'>Categories</h1>
        <br />
         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link 
              to="/discoverDance" 
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-200 block"
            >
             
              <h3 className="text-2xl font-bold text-gray-900  mb-2">Dance</h3>
              <p className="text-gray-600 text-sm">Find cultural Dances</p>
              <br />
              <img src={dance} className='rounded-2xl h-60 w-full' alt="dancePic" />

            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link 
              to="/discoverMusic" 
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-200 block"
            >
             
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Music</h3>
              <p className="text-gray-600 text-sm">Find cultural Musics</p>
              <br />
              <img src={music} className='rounded-2xl h-60 w-full' alt="musicPic" />
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link 
              to="/discoverFood" 
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-200 block"
            >
             
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Food</h3>
              <p className="text-gray-600 text-sm">Find cultural Food</p>
              <br />
              <img src={food} className='rounded-2xl h-60 w-full' alt="foodPic" />
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Link 
              to="/discoverArts" 
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-200 block"
            >
             
              <h3 className="text-2xl  font-bold text-gray-900 mb-2">Arts</h3>
              <p className="text-gray-600 text-sm">Find cultural Arts</p>
              <br />
              <img src={arts} className='rounded-2xl h-60 w-full' alt="artsPic" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
    <CulturalCalendar />
    <Footer />
    </Transition>
  );
};

export default Dashboard;
