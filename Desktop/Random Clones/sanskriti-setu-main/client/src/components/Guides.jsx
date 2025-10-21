import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const guideCategories = {
  'Dance Forms': {
    icon: '💃',
    description: 'Learn about classical and folk dances of India',
    guides: [
      {
        title: 'Bharatanatyam: The Divine Dance',
        description: 'Discover the classical dance form from Tamil Nadu with its intricate hand gestures and expressive movements.',
        duration: '15 min read',
        level: 'Beginner',
        tags: ['Classical', 'Tamil Nadu', 'Temple Dance']
      },
      {
        title: 'Kathak: The Art of Storytelling',
        description: 'Explore the North Indian classical dance known for its spins, expressions, and rhythmic footwork.',
        duration: '12 min read',
        level: 'Beginner',
        tags: ['Classical', 'North India', 'Storytelling']
      },
      {
        title: 'Bhangra: The Joy of Punjab',
        description: 'Learn about the energetic folk dance that celebrates harvest and joy in Punjab.',
        duration: '8 min read',
        level: 'Beginner',
        tags: ['Folk', 'Punjab', 'Harvest']
      }
    ]
  },
  'Music Traditions': {
    icon: '🎵',
    description: 'Explore the rich musical heritage of India',
    guides: [
      {
        title: 'Ragas: The Soul of Indian Music',
        description: 'Understanding the melodic frameworks that form the basis of Indian classical music.',
        duration: '20 min read',
        level: 'Intermediate',
        tags: ['Classical Music', 'Theory', 'Melody']
      },
      {
        title: 'Tabla: Rhythms of India',
        description: 'Learn about the paired drums and their role in Indian classical music.',
        duration: '15 min read',
        level: 'Beginner',
        tags: ['Percussion', 'Classical', 'Rhythm']
      },
      {
        title: 'Folk Songs Across States',
        description: 'Discover the diverse folk music traditions from different Indian states.',
        duration: '18 min read',
        level: 'Beginner',
        tags: ['Folk Music', 'Regional', 'Traditional']
      }
    ]
  },
  'Festivals & Celebrations': {
    icon: '🎉',
    description: 'Understand the significance of Indian festivals',
    guides: [
      {
        title: 'Diwali: Festival of Lights',
        description: 'Learn about the five-day festival celebrated across India with lights, sweets, and fireworks.',
        duration: '10 min read',
        level: 'Beginner',
        tags: ['Hindu', 'Lights', 'Celebration']
      },
      {
        title: 'Holi: The Colors of Spring',
        description: 'Discover the festival of colors that celebrates the arrival of spring and the victory of good over evil.',
        duration: '8 min read',
        level: 'Beginner',
        tags: ['Spring', 'Colors', 'Unity']
      },
      {
        title: 'Regional Festival Traditions',
        description: 'Explore unique festivals celebrated in different regions of India.',
        duration: '25 min read',
        level: 'Advanced',
        tags: ['Regional', 'Traditions', 'Culture']
      }
    ]
  },
  'Traditional Arts': {
    icon: '🎨',
    description: 'Discover India\'s rich artistic traditions',
    guides: [
      {
        title: 'Madhubani Painting: Art of Bihar',
        description: 'Learn about the traditional art form using natural dyes and pigments.',
        duration: '12 min read',
        level: 'Beginner',
        tags: ['Bihar', 'Painting', 'Natural Colors']
      },
      {
        title: 'Warli Art: Tribal Expressions',
        description: 'Discover the tribal art form from Maharashtra using simple geometric shapes.',
        duration: '10 min read',
        level: 'Beginner',
        tags: ['Tribal', 'Maharashtra', 'Geometric']
      },
      {
        title: 'Block Printing Techniques',
        description: 'Understanding the traditional textile printing methods of India.',
        duration: '15 min read',
        level: 'Intermediate',
        tags: ['Textiles', 'Printing', 'Crafts']
      }
    ]
  },
  'Cuisine & Food Culture': {
    icon: '🍛',
    description: 'Explore the diverse culinary traditions',
    guides: [
      {
        title: 'Spices: The Heart of Indian Cooking',
        description: 'Learn about the essential spices and their significance in Indian cuisine.',
        duration: '15 min read',
        level: 'Beginner',
        tags: ['Spices', 'Cooking', 'Flavors']
      },
      {
        title: 'Regional Cuisines of India',
        description: 'Discover the unique flavors and dishes from different Indian states.',
        duration: '22 min read',
        level: 'Intermediate',
        tags: ['Regional', 'Recipes', 'Diversity']
      },
      {
        title: 'Traditional Cooking Methods',
        description: 'Understanding age-old cooking techniques and their cultural significance.',
        duration: '18 min read',
        level: 'Advanced',
        tags: ['Traditional', 'Techniques', 'Culture']
      }
    ]
  },
  'Philosophy & Spirituality': {
    icon: '🧘',
    description: 'Explore India\'s spiritual and philosophical traditions',
    guides: [
      {
        title: 'Yoga: Beyond Physical Exercise',
        description: 'Understanding yoga as a complete philosophy of life and well-being.',
        duration: '20 min read',
        level: 'Intermediate',
        tags: ['Yoga', 'Philosophy', 'Wellness']
      },
      {
        title: 'Meditation Traditions',
        description: 'Exploring different meditation practices from ancient India.',
        duration: '16 min read',
        level: 'Beginner',
        tags: ['Meditation', 'Mindfulness', 'Peace']
      },
      {
        title: 'Ancient Indian Philosophy',
        description: 'Introduction to the major philosophical schools of ancient India.',
        duration: '25 min read',
        level: 'Advanced',
        tags: ['Philosophy', 'Ancient', 'Wisdom']
      }
    ]
  }
};

export default function Guides() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = Object.entries(guideCategories).filter(([category, data]) => 
    category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    data.guides.some(guide => 
      guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Cultural Learning Guides</h1>
            <p className="text-xl text-gray-600 mb-8">Discover the rich traditions and heritage of India</p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search guides, topics, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                <div className="absolute left-3 top-3 text-gray-400">
                  <span className="text-xl">🔍</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedCategory ? (
          // Category Overview
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map(([category, data], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedCategory(category)}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                >
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {data.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{category}</h3>
                    <p className="text-gray-600 text-sm">{data.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{data.guides.length} guides</span>
                      <span>All levels</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {data.guides.slice(0, 3).map(guide => (
                        <span key={guide.title} className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                          {guide.tags[0]}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <span className="text-orange-600 font-medium group-hover:text-orange-700">
                      Explore Guides →
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Quick Links */}
            <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Quick Access</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link to="/dashboard" className="text-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition">
                  <div className="text-2xl mb-2">🏠</div>
                  <span className="text-sm font-medium text-gray-700">Dashboard</span>
                </Link>
                <Link to="/discover" className="text-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
                  <div className="text-2xl mb-2">🔍</div>
                  <span className="text-sm font-medium text-gray-700">Discover</span>
                </Link>
                <Link to="/indiamap" className="text-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition">
                  <div className="text-2xl mb-2">🗺️</div>
                  <span className="text-sm font-medium text-gray-700">India Map</span>
                </Link>
                <Link to="/profile" className="text-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition">
                  <div className="text-2xl mb-2">👤</div>
                  <span className="text-sm font-medium text-gray-700">Profile</span>
                </Link>
              </div>
            </div>
          </>
        ) : (
          // Category Detail View
          <>
            <div className="mb-6">
              <button
                onClick={() => setSelectedCategory(null)}
                className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-4"
              >
                <span className="mr-2">←</span> Back to Categories
              </button>
              
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="text-5xl">{guideCategories[selectedCategory].icon}</div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{selectedCategory}</h1>
                    <p className="text-gray-600">{guideCategories[selectedCategory].description}</p>
                  </div>
                </div>
                
                <div className="grid gap-6">
                  {guideCategories[selectedCategory].guides.map((guide, index) => (
                    <motion.div
                      key={guide.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-6 hover:shadow-md transition-all duration-300 border border-orange-200"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-semibold text-gray-900">{guide.title}</h3>
                        <div className="flex space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            guide.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                            guide.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {guide.level}
                          </span>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                            {guide.duration}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4">{guide.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {guide.tags.map(tag => (
                          <span key={tag} className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm border">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <button className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition font-medium">
                        Read Guide
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
