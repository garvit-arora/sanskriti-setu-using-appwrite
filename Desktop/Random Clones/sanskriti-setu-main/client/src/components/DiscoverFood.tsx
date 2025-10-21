import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import image1 from "../assets/tamilnadu.jpg";
import image2 from "../assets/puunjabi.jpg";
import image3 from "../assets/assam.jpeg";
// import image4 from "../assets/man2.webp";


interface User {
  _id: string;
  name: string;
  culturalProfile: {
    state: string;
    city: string;
  };
}
const imageStyle: React.CSSProperties = {
  width: "300px",
  height: "200px",
  objectFit: "cover",
  clipPath:
    "polygon(10% 0%, 90% 0%, 100% 10%, 100% 90%, 90% 100%, 10% 100%, 0% 90%, 0% 10%)",
};

interface DiscoverFoodProps {
  user: User | null;
  onLogout: () => void;
}

const mockMatches = [
  {
    _id: "1",
    name: "Harpreet Singh",
    culturalProfile: {
      state: "Punjab",
      city: "Chandigarh",
      bio: "Love sharing Punjabi traditions and learning about other cultures!",
      primaryLanguages: ["Punjabi", "Hindi"],
    },
    matchScore: 92,
    commonInterests: ["Teaches Aalo ke Paranthe"],
    learning : ["Want To Learn Vada Pav"],
    profilePicture: image2,
  },
   {
    _id: "2",
    name:"Narayanan",
    culturalProfile: {
      state: "Tamil Nadu",
      city: "Chennai",
      bio: "Love sharing TN traditions and learning about other cultures!",
      primaryLanguages: ["Tamil", "Hindi"],
    },
    matchScore: 92,
    commonInterests: ["Teaches Uttapam"],
    learning : ["Want To Learn Chole Bhature"],
    profilePicture: image1,
  },
   {
    _id: "3",
    name: "Urvashi",
    culturalProfile: {
      state: "Assam",
      city: "Dispur",
      bio: "Love sharing Assam traditions and learning about other cultures!",
      primaryLanguages: ["Assamese", "Hindi"],
    },
    matchScore: 92,
    commonInterests: ["Teaches Pitha"],
    learning : ["Want To Learn Dhokhla"],
    profilePicture: image3,
  },
  
    
];

const DiscoverFood: React.FC<DiscoverFoodProps> = ({ user, onLogout }) => {
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [matches] = useState(mockMatches);

  const currentMatch = matches[currentMatchIndex];

  const handleAction = (action: "like" | "pass") => {
    if (action === "like") {
      toast.success(`You liked ${currentMatch.name}! 🎉`);
    } else {
      toast(`Passed on ${currentMatch.name}`);
    }

    if (currentMatchIndex < matches.length - 1) {
      setCurrentMatchIndex(currentMatchIndex + 1);
    } else {
      toast("No more matches for now! Check back later.", {
        icon: "✨",
      });
    }
  };

  if (currentMatchIndex >= matches.length) {
    return (
      <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #f0edf6 0%, #ffe283 110%)" }}>
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link
                  to="/dashboard"
                  className="text-2xl font-bold text-orange-900"
                >
                  Sanskriti Setu
                </Link>
              </div>
              <div className="flex items-center space-x-6">
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-orange-600"
                >
                  Dashboard
                </Link>
                <Link
                  to="/matches"
                  className="text-gray-700 hover:text-orange-600"
                >
                  Matches
                </Link>
                <button
                  onClick={onLogout}
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            No more matches!
          </h1>
          <p className="text-gray-600 mb-8">
            Check back later for new cultural connections.
          </p>
          <Link
            to="/dashboard"
            className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link
                to="/dashboard"
                className="text-2xl font-bold text-orange-900"
              >
                Sanskriti Setu
              </Link>
            </div>
            <div className="flex items-center space-x-6">
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-orange-600"
              >
                Dashboard
              </Link>
              <Link
                to="/matches"
                className="text-gray-700 hover:text-orange-600"
              >
                Matches
              </Link>
              <button
                onClick={onLogout}
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Discover Cultural Foods
          </h1>
          <p className="text-gray-600">
            Find people from different states to exchange Food with
          </p>
        </div>

        <motion.div
          key={currentMatch._id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8"
        >
          <div className="p-8 flex flex-col md:flex-row gap-8 items-start">
            <div className="flex flex-col items-center">
              <img
                src={
                  typeof currentMatch.profilePicture === "string"
                    ? currentMatch.profilePicture
                    : undefined
                }
                alt={`${currentMatch?.profilePicture ?? "Unknown"}'s profile`}
                style={imageStyle}
              />
              <h3 className="text-xl font-bold text-gray-900 mt-4">
                {currentMatch.name}
              </h3>
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">About</h3>
              <p className="text-gray-600 mb-4">
                {currentMatch.culturalProfile.bio}
              </p>

              <h3 className="text-lg font-bold text-gray-900 mb-2">Languages</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {currentMatch.culturalProfile.primaryLanguages.map(
                  (language, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {language}
                    </span>
                  )
                )}
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Proficiency
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentMatch.commonInterests.map((interest, index) => (
                  <span
                    key={index}
                    className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
                  >
                    {interest.replace("_", " ")}
                  </span>
                ))}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Requirements
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentMatch.learning.map((interest, index) => (
                  <span
                    key={index}
                    className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
                  >
                    {interest.replace("_", " ")}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-center space-x-6">
          <button
            onClick={() => handleAction("pass")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-lg px-8 py-4 rounded-full transition duration-200 flex items-center"
          >
            ❌ Pass
          </button>

          <button
            onClick={() => handleAction("like")}
            className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-4 rounded-full transition duration-200 flex items-center"
          >
            💚 Like
          </button>
        </div>

        <div className="text-center mt-6 text-gray-500 text-sm">
          {matches.length - currentMatchIndex - 1} more matches available
        </div>
      </div>
    </div>
  );
};

export default DiscoverFood;
