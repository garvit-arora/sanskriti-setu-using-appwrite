import { useState, useEffect } from "react";
import SvgComponent from "./SvgComponent";
import sitesinfo from "../assets/sitesinfo.json";
import { Link } from "react-router-dom";
import "../css/map.css";
import Transition from "../components/Transition";
import { motion } from "framer-motion";
import menu from "../assets/sectionMenu.json";
import "../css/img-track.css";
// import { log } from 'console';
// import { useNavigate } from "react-router-dom";
// import CulturalSites from "./CulturalSites";
// import Fesitvals from "./Festivals";
function Map() {
  // const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState(null);
  const [transformCoor, setTransformCoor] = useState({
    scale: 1,
    translateX: 0,
    translateY: 0,
  });
  const [culturalPractices, setCulturalPractices] = useState([]);
  const [tooltip, setTooltip] = useState({
    name: "",
    x: 0,
    y: 0,
    visible: false,
  });

  useEffect(() => {
    if (selectedState) {
      const state = sitesinfo.states.find(
        (s) =>
          s.name.toLowerCase().trim() === selectedState.toLowerCase().trim()
      );
      console.log("Selected:", selectedState, "Found state:", state);

      if (state && state.cultural_practices) {
        console.log("Practices:", state.cultural_practices);
        setCulturalPractices(state.cultural_practices);
      } else {
        console.warn("No practices found for", selectedState);
        setCulturalPractices([]);
      }
    } else {
      setCulturalPractices([]);
    }
  }, [selectedState]);

  const listVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 1,
        ease: "easeOut",
      },
    }),
  };
  // const handleCulture = () => {
  //   navigate("/culturalsites");
  // };

  return (
    <Transition>
      <div className="map-container">
        {selectedState ? (
          <>
            {/* Show cultural practices */}
            <motion.div
              className="sites-container"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="site-list">
                <h1>
                  Cultural Practices in <br />
                  {selectedState}
                </h1>
                <ul>
                  {culturalPractices.length > 0 ? (
                    culturalPractices.map((practice, index) => (
                      <Link
                        key={practice.name || index}
                        to={`/cultural-site/${practice.name || "unknown"}`}
                      >
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          custom={index}  
                          variants={listVariants}
                          whileHover={{
                            scale: 1.05,
                            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
                          }}
                          className="site"
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "10px",
                            }}
                          >
                            <img
                              src={practice.image || "/fallback.jpg"}
                              alt={practice.name || "No name"}
                              style={{
                                width: "150px",
                                height: "100px",
                                marginRight: "20px",
                                borderRadius: "8px",
                                objectFit: "cover",
                              }}
                            />
                            <h2>
                              {practice.aspect || "Aspect"} :{" "}
                              {practice.value || "Value"}
                            </h2>
                          </div>
                          <p>
                            {practice.description ||
                              "No description available."}
                          </p>
                        </motion.div>
                      </Link>
                    ))
                  ) : (
                    <p style={{ color: "#666", fontSize: "18px" }}>
                      No cultural practices found for {selectedState}.
                    </p>
                  )}
                </ul>
              </div>
            </motion.div>

            {/* Close button */}
            <div className="close-btn">
              <button
                onClick={() => {
                  setSelectedState(null);
                  setTransformCoor({ scale: 1, translateX: 0, translateY: 0 });
                }}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </>
        ) : (
          /* Show section menu when NO state is selected */
          <div id="image-track">
            {menu.menu.map((item) => (
              <Link
                to={
                  item.page === "cultural-places"
                    ? "/culturalsites"
                    : "/festivals"
                }
                key={item.id}
                className="menu-container"
              >
                <img src={item.img} alt="img" className="image" />
                <h2>
                  <b>{item.heading}</b>
                </h2>
              </Link>
            ))}
          </div>
        )}

        {tooltip.visible && (
          <div
            style={{
              position: "absolute",
              top: tooltip.y + 15,
              left: tooltip.x + 15,
              background: "rgba(0,0,0,0.7)",
              color: "#fff",
              padding: "5px 10px",
              borderRadius: "6px",
              pointerEvents: "none",
              whiteSpace: "nowrap",
              fontSize: "14px",
              zIndex: 999,
            }}
          >
            {tooltip.name}
          </div>
        )}

        <SvgComponent
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          transformCoor={transformCoor}
          setTransformCoor={setTransformCoor}
          setTooltip={setTooltip}
        />
      </div>
    </Transition>
  );
}

export default Map;
