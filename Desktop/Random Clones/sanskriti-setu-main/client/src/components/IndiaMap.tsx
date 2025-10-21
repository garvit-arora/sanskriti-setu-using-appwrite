import React, { useState, useEffect } from "react";
import { ChevronLeft, MapPin, Users, Globe, Info } from "lucide-react";

interface State {
  id: string;
  name: string;
  capital: string;
  population: string;
  area: string;
  languages: string[];
  description: string;
  path: string;
  labelX?: number;
  labelY?: number;
}

const statesData: State[] = [
  {
    id: "AP",
    name: "Andhra Pradesh",
    capital: "Amaravati",
    population: "49.4 million",
    area: "160,205 km²",
    languages: ["Telugu", "Urdu"],
    description:
      "Known for its rich cultural heritage, temples, and IT industry.",
    path: "M 280 400 L 320 380 L 340 420 L 320 440 L 280 420 Z",
  },
  {
    id: "AR",
    name: "Arunachal Pradesh",
    capital: "Itanagar",
    population: "1.4 million",
    area: "83,743 km²",
    languages: ["English", "Hindi"],
    description:
      'The "Land of Dawn-Lit Mountains" with diverse tribal culture.',
    path: "M 520 200 L 580 190 L 590 220 L 540 230 L 520 210 Z",
  },
  {
    id: "AS",
    name: "Assam",
    capital: "Dispur",
    population: "31.2 million",
    area: "78,438 km²",
    languages: ["Assamese", "Bodo"],
    description:
      "Famous for tea gardens, one-horned rhinos, and the Brahmaputra river.",
    path: "M 480 240 L 540 230 L 550 260 L 490 270 L 480 250 Z",
  },
  {
    id: "BR",
    name: "Bihar",
    capital: "Patna",
    population: "104.1 million",
    area: "94,163 km²",
    languages: ["Hindi", "Urdu"],
    description: "Ancient center of learning with Nalanda University ruins.",
    path: "M 380 300 L 420 290 L 430 330 L 390 340 L 380 310 Z",
  },
  {
    id: "CT",
    name: "Chhattisgarh",
    capital: "Raipur",
    population: "25.5 million",
    area: "135,194 km²",
    languages: ["Hindi", "Chhattisgarhi"],
    description:
      'Rich in minerals and forests, known as the "Rice Bowl of India".',
    path: "M 340 360 L 380 350 L 390 390 L 350 400 L 340 370 Z",
  },
  {
    id: "GA",
    name: "Goa",
    capital: "Panaji",
    population: "1.5 million",
    area: "3,702 km²",
    languages: ["Konkani", "Marathi"],
    description:
      "Beach paradise and former Portuguese colony with unique culture.",
    path: "M 220 420 L 240 415 L 245 435 L 225 440 L 220 425 Z",
  },
  {
    id: "GJ",
    name: "Gujarat",
    capital: "Gandhinagar",
    population: "60.4 million",
    area: "196,244 km²",
    languages: ["Gujarati", "Hindi"],
    description:
      "Birthplace of Mahatma Gandhi, known for business and textiles.",
    path: "M 180 340 L 240 330 L 250 380 L 190 390 L 180 350 Z",
  },
  {
    id: "HR",
    name: "Haryana",
    capital: "Chandigarh",
    population: "25.4 million",
    area: "44,212 km²",
    languages: ["Hindi", "Punjabi"],
    description: "Agricultural hub and major contributor to Green Revolution.",
    path: "M 280 230 L 320 220 L 330 260 L 290 270 L 280 240 Z",
  },
  {
    id: "HP",
    name: "Himachal Pradesh",
    capital: "Shimla",
    population: "6.9 million",
    area: "55,673 km²",
    languages: ["Hindi", "Pahari"],
    description: "Scenic hill state with apple orchards and adventure tourism.",
    path: "M 280 180 L 330 170 L 340 210 L 290 220 L 280 190 Z",
  },
  {
    id: "JK",
    name: "Jammu & Kashmir",
    capital: "Srinagar/Jammu",
    population: "12.5 million",
    area: "101,387 km²",
    languages: ["Kashmiri", "Dogri", "Urdu"],
    description:
      "Paradise on Earth known for its natural beauty and handicrafts.",
    path: "M 260 140 L 310 130 L 320 180 L 270 190 L 260 150 Z",
  },
  {
    id: "JH",
    name: "Jharkhand",
    capital: "Ranchi",
    population: "33 million",
    area: "79,716 km²",
    languages: ["Hindi", "Santhali"],
    description: "Mineral-rich state with significant tribal population.",
    path: "M 400 320 L 440 310 L 450 350 L 410 360 L 400 330 Z",
  },
  {
    id: "KA",
    name: "Karnataka",
    capital: "Bengaluru",
    population: "61.1 million",
    area: "191,791 km²",
    languages: ["Kannada", "Urdu"],
    description:
      "IT capital of India with rich heritage and coffee plantations.",
    path: "M 250 440 L 300 430 L 310 490 L 260 500 L 250 450 Z",
  },
  {
    id: "KL",
    name: "Kerala",
    capital: "Thiruvananthapuram",
    population: "33.4 million",
    area: "38,863 km²",
    languages: ["Malayalam", "English"],
    description:
      "God's Own Country with backwaters, spices, and high literacy.",
    path: "M 260 500 L 280 495 L 290 540 L 270 545 L 260 510 Z",
  },
  {
    id: "LD",
    name: "Ladakh",
    capital: "Leh",
    population: "0.3 million",
    area: "59,146 km²",
    languages: ["Ladakhi", "Hindi"],
    description:
      "High-altitude desert with Buddhist monasteries and stunning landscapes.",
    path: "M 300 100 L 350 90 L 360 130 L 310 140 L 300 110 Z",
  },
  {
    id: "MP",
    name: "Madhya Pradesh",
    capital: "Bhopal",
    population: "72.6 million",
    area: "308,245 km²",
    languages: ["Hindi", "Malvi"],
    description: "Heart of India with tiger reserves and historical monuments.",
    path: "M 290 330 L 350 320 L 360 370 L 300 380 L 290 340 Z",
  },
  {
    id: "MH",
    name: "Maharashtra",
    capital: "Mumbai",
    population: "112.4 million",
    area: "307,713 km²",
    languages: ["Marathi", "Hindi"],
    description:
      "Economic powerhouse with Bollywood and financial capital Mumbai.",
    path: "M 240 380 L 300 370 L 310 420 L 250 430 L 240 390 Z",
  },
  {
    id: "MN",
    name: "Manipur",
    capital: "Imphal",
    population: "2.9 million",
    area: "22,327 km²",
    languages: ["Meitei", "English"],
    description: "Jewel of India with unique culture and floating Loktak Lake.",
    path: "M 540 270 L 560 265 L 565 285 L 545 290 L 540 275 Z",
  },
  {
    id: "ML",
    name: "Meghalaya",
    capital: "Shillong",
    population: "3 million",
    area: "22,429 km²",
    languages: ["English", "Khasi", "Garo"],
    description: "Abode of Clouds with living root bridges and heavy rainfall.",
    path: "M 480 270 L 520 265 L 525 285 L 485 290 L 480 275 Z",
  },
  {
    id: "MZ",
    name: "Mizoram",
    capital: "Aizawl",
    population: "1.1 million",
    area: "21,081 km²",
    languages: ["Mizo", "English"],
    description:
      "Land of Blue Mountains with bamboo forests and tribal culture.",
    path: "M 530 290 L 550 285 L 555 310 L 535 315 L 530 295 Z",
  },
  {
    id: "NL",
    name: "Nagaland",
    capital: "Kohima",
    population: "2 million",
    area: "16,579 km²",
    languages: ["English", "Nagamese"],
    description: "Land of Festivals with diverse tribes and Hornbill Festival.",
    path: "M 550 260 L 570 255 L 575 280 L 555 285 L 550 265 Z",
  },
  {
    id: "OR",
    name: "Odisha",
    capital: "Bhubaneswar",
    population: "42 million",
    area: "155,707 km²",
    languages: ["Odia", "Hindi"],
    description:
      "Land of temples with Jagannath Puri and classical dance Odissi.",
    path: "M 390 360 L 440 350 L 450 400 L 400 410 L 390 370 Z",
  },
  {
    id: "PB",
    name: "Punjab",
    capital: "Chandigarh",
    population: "27.7 million",
    area: "50,362 km²",
    languages: ["Punjabi", "Hindi"],
    description:
      "Land of Five Rivers, Golden Temple, and agricultural prosperity.",
    path: "M 260 210 L 300 200 L 310 240 L 270 250 L 260 220 Z",
  },
  {
    id: "RJ",
    name: "Rajasthan",
    capital: "Jaipur",
    population: "68.5 million",
    area: "342,239 km²",
    languages: ["Hindi", "Rajasthani"],
    description: "Land of Kings with deserts, forts, and colorful culture.",
    path: "M 220 280 L 290 270 L 300 330 L 230 340 L 220 290 Z",
  },
  {
    id: "SK",
    name: "Sikkim",
    capital: "Gangtok",
    population: "0.6 million",
    area: "7,096 km²",
    languages: ["Nepali", "English"],
    description: "Himalayan state with Kanchenjunga and Buddhist monasteries.",
    path: "M 460 230 L 480 225 L 485 245 L 465 250 L 460 235 Z",
  },
  {
    id: "TN",
    name: "Tamil Nadu",
    capital: "Chennai",
    population: "72.1 million",
    area: "130,058 km²",
    languages: ["Tamil", "English"],
    description:
      "Temple state with ancient Dravidian culture and classical arts.",
    path: "M 290 480 L 330 470 L 340 520 L 300 530 L 290 490 Z",
  },
  {
    id: "TG",
    name: "Telangana",
    capital: "Hyderabad",
    population: "35.2 million",
    area: "112,077 km²",
    languages: ["Telugu", "Urdu"],
    description: "Newest state with IT hub Hyderabad and historic monuments.",
    path: "M 300 400 L 340 390 L 350 430 L 310 440 L 300 410 Z",
  },
  {
    id: "TR",
    name: "Tripura",
    capital: "Agartala",
    population: "3.7 million",
    area: "10,486 km²",
    languages: ["Bengali", "Kokborok"],
    description:
      "Former princely state with palaces and diverse tribal culture.",
    path: "M 510 280 L 530 275 L 535 295 L 515 300 L 510 285 Z",
  },
  {
    id: "UK",
    name: "Uttarakhand",
    capital: "Dehradun",
    population: "10.1 million",
    area: "53,483 km²",
    languages: ["Hindi", "Garhwali"],
    description: "Devbhoomi with Himalayas, holy rivers, and pilgrimage sites.",
    path: "M 310 200 L 350 190 L 360 230 L 320 240 L 310 210 Z",
  },
  {
    id: "UP",
    name: "Uttar Pradesh",
    capital: "Lucknow",
    population: "199.8 million",
    area: "240,928 km²",
    languages: ["Hindi", "Urdu"],
    description: "Most populous state with Taj Mahal and religious sites.",
    path: "M 320 280 L 380 270 L 390 320 L 330 330 L 320 290 Z",
  },
  {
    id: "WB",
    name: "West Bengal",
    capital: "Kolkata",
    population: "91.3 million",
    area: "88,752 km²",
    languages: ["Bengali", "Hindi"],
    description: "Cultural capital with literature, arts, and Durga Puja.",
    path: "M 440 310 L 480 300 L 490 350 L 450 360 L 440 320 Z",
  },
];

const IndiaMap: React.FC = () => {
  const [selectedState, setSelectedState] = useState<State | null>(null);
  // const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filteredStates = statesData.filter((state) =>
    state.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStateClick = (state: State) => {
    setSelectedState(state);
    setSearchTerm("");
  };

  const handleBack = () => {
    setSelectedState(null);
  };

  if (selectedState) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          <button
            onClick={handleBack}
            className="mb-6 flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-gray-700 hover:text-blue-600"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Map
          </button>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {selectedState.name}
              </h1>
              <div className="flex items-center gap-2 text-xl">
                <MapPin className="w-5 h-5" />
                <span>Capital: {selectedState.capital}</span>
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Users className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-700">
                        Population
                      </h3>
                      <p className="text-gray-600">
                        {selectedState.population}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-6 h-6 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-700">Area</h3>
                      <p className="text-gray-600">{selectedState.area}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-6 h-6 text-purple-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-700">Languages</h3>
                      <p className="text-gray-600">
                        {selectedState.languages.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  About {selectedState.name}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedState.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Interactive Map of India
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Click on any state to explore
          </p>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for a state..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-96 mx-auto block px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        {searchTerm && (
          <div className="mb-6 max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-4 max-h-60 overflow-y-auto">
              {filteredStates.length > 0 ? (
                filteredStates.map((state) => (
                  <button
                    key={state.id}
                    onClick={() => handleStateClick(state)}
                    className="w-full text-left p-3 hover:bg-blue-50 rounded-lg transition-colors duration-200 flex items-center justify-between group"
                  >
                    <span className="font-medium text-gray-700 group-hover:text-blue-600">
                      {state.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {state.capital}
                    </span>
                  </button>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No states found
                </p>
              )}
            </div>
          </div>
        )}

        {/* <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-8 overflow-x-auto">
          <svg
            viewBox="0 0 600 600"
            className="w-full h-auto max-w-4xl mx-auto"
            style={{ minHeight: "400px" }}
          >
            <defs>
              <linearGradient
                id="landGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
              <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow
                  dx="2"
                  dy="2"
                  stdDeviation="3"
                  floodOpacity="0.3"
                />
              </filter>
            </defs>

            {statesData.map((state) => {
              const isHovered = hoveredState === state.id;
              const pathParts = state.path.match(/[A-Z][-\d\s.]+/g) || [];
              const firstPoint = pathParts[0]?.match(/[-\d.]+/g);
              const labelX =
                state.labelX ||
                (firstPoint ? parseFloat(firstPoint[0]) + 10 : 0);
              const labelY =
                state.labelY ||
                (firstPoint ? parseFloat(firstPoint[1]) + 10 : 0);

              return (
                <g key={state.id}>
                  <path
                    d={state.path}
                    fill={isHovered ? "#3b82f6" : "url(#landGradient)"}
                    stroke="#fff"
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-300"
                    filter={isHovered ? "url(#shadow)" : ""}
                    transform={
                      isHovered
                        ? `translate(${labelX} ${labelY}) scale(1.05) translate(${-labelX} ${-labelY})`
                        : "scale(1)"
                    }
                    onClick={() => handleStateClick(state)}
                    onMouseEnter={() => setHoveredState(state.id)}
                    onMouseLeave={() => setHoveredState(null)}
                  />

                  {(!isMobile || isHovered) && (
                    <text
                      x={labelX}
                      y={labelY}
                      textAnchor="middle"
                      className="fill-white text-xs font-semibold pointer-events-none"
                      style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
                    >
                      {state.id}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {hoveredState && (
            <div className="mt-4 p-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
              <p className="text-center font-semibold text-gray-700">
                {statesData.find((s) => s.id === hoveredState)?.name}
              </p>
            </div>
          )}
        </div> */}

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {statesData.map((state) => (
            <button
              key={state.id}
              onClick={() => handleStateClick(state)}
              className="p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              {state.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IndiaMap;
