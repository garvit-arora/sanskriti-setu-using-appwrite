import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { getCurrentUser, updateUserProfile, uploadFile, getFilePreview, UserProfile } from '../lib/appwrite';

interface User {
  _id: string;
  name: string;
  email: string;
  culturalProfile: { 
    state: string; 
    city: string;
    primaryLanguages: string[];
    bio: string;
  };
  gamification: { points: number; level: number };
}

interface ProfileProps {
  user: User | null;
  onLogout: () => void;
}

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa',
  'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi'
];

const culturalInterestOptions = [
  'Classical Dance', 'Folk Dance', 'Classical Music', 'Folk Music', 'Traditional Arts',
  'Festivals', 'Cuisine', 'Literature', 'Handicrafts', 'Traditional Games',
  'Religious Practices', 'Yoga & Meditation', 'Ayurveda', 'Architecture'
];

const skillOptions = [
  'Bharatanatyam', 'Kathak', 'Odissi', 'Kuchipudi', 'Mohiniyattam', 'Manipuri',
  'Sitar', 'Tabla', 'Flute', 'Veena', 'Violin', 'Harmonium',
  'Painting', 'Sculpture', 'Pottery', 'Weaving', 'Cooking', 'Storytelling',
  'Sanskrit', 'Hindi Literature', 'Regional Literature', 'Philosophy'
];

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const profile = await getCurrentUser();
      setProfileData(profile);
      if (profile.avatar) {
        setAvatarPreview(profile.avatar);
      }
    } catch (error) {
      console.error('Failed to load profile:', error);
      toast.error('Failed to load profile');
    }
  };

  if (!user || !profileData) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
        <p>Loading profile...</p>
      </div>
    </div>
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (!profileData) return;

    if (name === 'age') {
      setProfileData(prev => prev ? { ...prev, [name]: parseInt(value) || 18 } : null);
    } else {
      setProfileData(prev => prev ? { ...prev, [name]: value } : null);
    }
  };

  const handleArrayChange = (field: keyof UserProfile, value: string) => {
    if (!profileData) return;
    
    setProfileData(prev => {
      if (!prev) return null;
      const currentArray = prev[field] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [field]: newArray };
    });
  };

  const handleLanguageInput = (value: string) => {
    if (!profileData || !value) return;
    
    if (!profileData.primaryLanguages.includes(value)) {
      setProfileData(prev => prev ? {
        ...prev,
        primaryLanguages: [...prev.primaryLanguages, value]
      } : null);
    }
  };

  const removeLanguage = (language: string) => {
    if (!profileData) return;
    
    setProfileData(prev => prev ? {
      ...prev,
      primaryLanguages: prev.primaryLanguages.filter(lang => lang !== language)
    } : null);
  };

  const handleAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('File size should be less than 5MB');
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      
      setAvatarFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!profileData || !profileData.$id) return;
    
    setLoading(true);
    try {
      let avatarUrl = profileData.avatar;
      
      // Upload new avatar if selected
      if (avatarFile) {
        const uploadedFile = await uploadFile(avatarFile);
        avatarUrl = getFilePreview(uploadedFile.$id).toString();
      }
      
      // Update profile
      await updateUserProfile(profileData.$id, {
        ...profileData,
        avatar: avatarUrl
      });
      
      // Reload profile to get updated data
      await loadProfile();
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      setAvatarFile(null);
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setAvatarFile(null);
    loadProfile(); // Reset to original data
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="text-2xl font-bold text-orange-900">
                Sanskriti Setu
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/dashboard" className="text-gray-700 hover:text-orange-600">
                Dashboard
              </Link>
              <Link to="/discover" className="text-gray-700 hover:text-orange-600">Discover</Link>
              <Link to="/matches" className="text-gray-700 hover:text-orange-600">Matches</Link>
              <Link to="/chat" className="text-gray-700 hover:text-orange-600">Chat</Link>
              <Link to="/indiamap" className="text-gray-700 hover:text-orange-600">KYC</Link>
              <button onClick={onLogout} className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition duration-200">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 p-8 text-white">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-white/20 flex items-center justify-center">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-4xl">👤</span>
                  )}
                </div>
                {isEditing && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 -right-2 bg-orange-600 rounded-full p-2 hover:bg-orange-700 transition"
                  >
                    📸
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarSelect}
                  className="hidden"
                />
              </div>
              
              <div className="text-center md:text-left flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profileData?.name || ''}
                    onChange={handleInputChange}
                    className="bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/70 w-full mb-2"
                    placeholder="Full Name"
                  />
                ) : (
                  <h1 className="text-3xl font-bold mb-2">{profileData?.name}</h1>
                )}
                <p className="text-white/90">
                  {profileData?.city}, {profileData?.state}
                </p>
                <div className="flex justify-center md:justify-start items-center space-x-6 mt-4">
                  <div className="text-center">
                    <div className="text-xl font-bold">{profileData?.points}</div>
                    <div className="text-sm text-white/80">Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold">{profileData?.level}</div>
                    <div className="text-sm text-white/80">Level</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            {isEditing ? (
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={profileData?.email || ''}
                      disabled
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      min="13"
                      max="100"
                      value={profileData?.age || 18}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <select
                      name="state"
                      value={profileData?.state || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">Select State</option>
                      {indianStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={profileData?.city || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Enter your city"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Languages
                  </label>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Add a language and press Enter"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleLanguageInput((e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }}
                    />
                    <div className="flex flex-wrap gap-2">
                      {profileData?.primaryLanguages.map(lang => (
                        <span key={lang} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center">
                          {lang}
                          <button
                            type="button"
                            onClick={() => removeLanguage(lang)}
                            className="ml-2 text-orange-600 hover:text-orange-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    rows={4}
                    value={profileData?.bio || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Tell us about yourself and your cultural interests..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cultural Interests
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {culturalInterestOptions.map(interest => (
                      <label key={interest} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={profileData?.culturalInterests.includes(interest) || false}
                          onChange={() => handleArrayChange('culturalInterests', interest)}
                          className="mr-2 text-orange-600 focus:ring-orange-500 rounded"
                        />
                        <span className="text-sm">{interest}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills You Have
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {skillOptions.map(skill => (
                      <label key={skill} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={profileData?.skills.includes(skill) || false}
                          onChange={() => handleArrayChange('skills', skill)}
                          className="mr-2 text-orange-600 focus:ring-orange-500 rounded"
                        />
                        <span className="text-sm">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Things You Can Teach
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {skillOptions.map(skill => (
                      <label key={skill} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={profileData?.teachingAbilities.includes(skill) || false}
                          onChange={() => handleArrayChange('teachingAbilities', skill)}
                          className="mr-2 text-green-600 focus:ring-green-500 rounded"
                        />
                        <span className="text-sm">{skill}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={loading}
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition duration-200 disabled:opacity-50 flex items-center"
                  >
                    {loading && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>}
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><span className="font-medium">Email:</span> {profileData?.email}</p>
                      <p><span className="font-medium">Age:</span> {profileData?.age}</p>
                      <p><span className="font-medium">Gender:</span> {profileData?.gender}</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Languages</h3>
                    <div className="flex flex-wrap gap-2">
                      {profileData?.primaryLanguages.map(lang => (
                        <span key={lang} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {profileData?.bio && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">About Me</h3>
                    <p className="text-gray-600">{profileData.bio}</p>
                  </div>
                )}

                {profileData?.culturalInterests.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Cultural Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {profileData.culturalInterests.map(interest => (
                        <span key={interest} className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {profileData?.skills.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">My Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {profileData.skills.map(skill => (
                        <span key={skill} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {profileData?.teachingAbilities.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">I Can Teach</h3>
                    <div className="flex flex-wrap gap-2">
                      {profileData.teachingAbilities.map(skill => (
                        <span key={skill} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition duration-200 font-medium"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
