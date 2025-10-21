import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { createUserAccount, signInAccount } from '../../lib/appwrite';

interface RegisterProps {
  onLogin: (userData: any) => void;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ProfileData {
  age: number;
  gender: string;
  state: string;
  city: string;
  bio: string;
  primaryLanguages: string[];
  culturalInterests: string[];
  skills: string[];
  teachingAbilities: string[];
  hobbies: string[];
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

const Register: React.FC<RegisterProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [profileData, setProfileData] = useState<ProfileData>({
    age: 18,
    gender: '',
    state: '',
    city: '',
    bio: '',
    primaryLanguages: [],
    culturalInterests: [],
    skills: [],
    teachingAbilities: [],
    hobbies: []
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (step === 1) {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      if (name === 'age') {
        setProfileData(prev => ({ ...prev, [name]: parseInt(value) || 18 }));
      } else {
        setProfileData(prev => ({ ...prev, [name]: value }));
      }
    }
  };

  const handleArrayChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => {
      const currentArray = prev[field] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [field]: newArray };
    });
  };

  const handleLanguageInput = (value: string) => {
    if (value && !profileData.primaryLanguages.includes(value)) {
      setProfileData(prev => ({
        ...prev,
        primaryLanguages: [...prev.primaryLanguages, value]
      }));
    }
  };

  const removeLanguage = (language: string) => {
    setProfileData(prev => ({
      ...prev,
      primaryLanguages: prev.primaryLanguages.filter(lang => lang !== language)
    }));
  };

  const validateStep1 = (): boolean => {
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return false;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  const validateStep2 = (): boolean => {
    if (!profileData.state) {
      toast.error('State is required');
      return false;
    }
    if (!profileData.city.trim()) {
      toast.error('City is required');
      return false;
    }
    if (!profileData.gender) {
      toast.error('Gender is required');
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setLoading(true);
    try {
      // Create account
      await createUserAccount({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      // Sign in to get session
      const session = await signInAccount({
        email: formData.email,
        password: formData.password
      });

      // Get user profile and update with additional data
      const userProfile = await import('../../lib/appwrite').then(module => 
        module.getCurrentUser()
      );

      // Update profile with additional data
      if (userProfile.$id) {
        await import('../../lib/appwrite').then(module =>
          module.updateUserProfile(userProfile.$id!, {
            ...profileData
          })
        );
      }

      toast.success('Registration successful!');
      
      // Convert to format expected by App.tsx
      const userData = {
        user: {
          _id: userProfile.userId,
          name: formData.name,
          email: formData.email,
          culturalProfile: {
            state: profileData.state,
            city: profileData.city,
            primaryLanguages: profileData.primaryLanguages,
            bio: profileData.bio
          },
          gamification: {
            points: 0,
            level: 1
          }
        },
        token: session.$id
      };
      
      onLogin(userData);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Join Sanskriti Setu</h2>
            <div className="flex justify-center items-center space-x-4 mb-6">
              <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-orange-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}>
                  1
                </div>
                <span className="text-sm font-medium">Account</span>
              </div>
              <div className={`w-16 h-1 ${step >= 2 ? 'bg-orange-600' : 'bg-gray-200'} rounded`}></div>
              <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-orange-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-orange-600 text-white' : 'bg-gray-200'}`}>
                  2
                </div>
                <span className="text-sm font-medium">Profile</span>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter password (min 6 characters)"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Confirm your password"
                  />
                </div>

                <button
                  onClick={handleNextStep}
                  className="w-full bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition duration-200 font-medium"
                >
                  Continue to Profile Setup
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                        Age
                      </label>
                      <input
                        id="age"
                        name="age"
                        type="number"
                        min="13"
                        max="100"
                        required
                        value={profileData.age}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                        Gender
                      </label>
                      <select
                        id="gender"
                        name="gender"
                        required
                        value={profileData.gender}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                        State
                      </label>
                      <select
                        id="state"
                        name="state"
                        required
                        value={profileData.state}
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
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                        City
                      </label>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        required
                        value={profileData.city}
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
                        {profileData.primaryLanguages.map(lang => (
                          <span key={lang} className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm flex items-center">
                            {lang}
                            <button
                              type="button"
                              onClick={() => removeLanguage(lang)}
                              className="ml-1 text-orange-600 hover:text-orange-800"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={3}
                      value={profileData.bio}
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
                            checked={profileData.culturalInterests.includes(interest)}
                            onChange={() => handleArrayChange('culturalInterests', interest)}
                            className="mr-2 text-orange-600 focus:ring-orange-500"
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
                            checked={profileData.skills.includes(skill)}
                            onChange={() => handleArrayChange('skills', skill)}
                            className="mr-2 text-orange-600 focus:ring-orange-500"
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
                            checked={profileData.teachingAbilities.includes(skill)}
                            onChange={() => handleArrayChange('teachingAbilities', skill)}
                            className="mr-2 text-green-600 focus:ring-green-500"
                          />
                          <span className="text-sm">{skill}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition duration-200 font-medium"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-orange-600 text-white py-3 px-4 rounded-lg hover:bg-orange-700 transition duration-200 font-medium disabled:opacity-50"
                    >
                      {loading ? 'Creating Account...' : 'Complete Registration'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-center mt-6">
            <span className="text-sm text-gray-600">Already have an account? </span>
            <Link to="/login" className="text-sm text-orange-600 hover:text-orange-700 font-medium">
              Sign in
            </Link>
          </div>
          
          <div className="text-center mt-4">
            <Link to="/" className="text-sm text-orange-600 hover:text-orange-700">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
