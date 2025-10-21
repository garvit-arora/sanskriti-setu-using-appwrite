import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface User { _id: string; name: string; culturalProfile: { state: string; city: string; }; }
interface CulturalShowcaseProps { user: User | null; onLogout: () => void; }

const sampleContent = {
  Maharashtra: {
    festivals: [{
      name: 'Ganesh Chaturthi',
      description: '10-day festival celebrating Lord Ganesha',
      image: '🐘',
      author: 'Local Community'
    }],
    traditions: [{
      name: 'Dahi Handi',
      description: 'Human pyramid to break clay pot filled with curd',
      image: '🏺',
      author: 'Traditional Practice'
    }],
    cuisine: [{
      name: 'Vada Pav',
      description: 'Mumbai\'s iconic street food',
      image: '🥙',
      author: 'Street Food Culture'
    }]
  }
};

const CulturalShowcase: React.FC<CulturalShowcaseProps> = ({ user, onLogout }) => {
  const [selectedCategory, setSelectedCategory] = useState<'festivals' | 'traditions' | 'cuisine'>('festivals');
  const userState = user?.culturalProfile?.state || 'Maharashtra';
  const content = sampleContent[userState as keyof typeof sampleContent] || sampleContent.Maharashtra;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="text-2xl font-bold text-orange-900">Sanskriti Setu</Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/dashboard" className="text-gray-700 hover:text-orange-600">Dashboard</Link>
              <button onClick={onLogout} className="bg-orange-600 text-white px-4 py-2 rounded-lg">Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Cultural Heritage Showcase</h1>
          <p className="text-xl text-gray-600">Explore India's rich cultural diversity</p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md">
            {(['festivals', 'traditions', 'cuisine'] as const).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-orange-600 text-white'
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content[selectedCategory]?.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="text-4xl mb-4 text-center">{item.image}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>Shared by {item.author}</span>
                </div>
              </div>
            </motion.div>
          )) || (
            <div className="col-span-full text-center py-12">
              <div className="text-4xl mb-4">🎭</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No content yet</h3>
              <p className="text-gray-600">Be the first to share your cultural heritage!</p>
            </div>
          )}
        </div>

        {/* Share Content CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-4">Share Your Cultural Heritage</h2>
            <p className="mb-6">Help preserve and promote India's diverse traditions by sharing your local festivals, customs, and recipes.</p>
            <button className="bg-white text-orange-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Add Cultural Content
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CulturalShowcase;
