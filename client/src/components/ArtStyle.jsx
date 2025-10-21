import artForms from "../assets/artForms.json";
import { motion, AnimatePresence } from "framer-motion";
import "../css/ArtStyle.css";
import { useState, useEffect } from "react";
import madhubani from "../assets/madhubani.webp";
import phad from "../assets/phad.jpeg";
import gond from "../assets/gond.jpeg";
import pattachitra from "../assets/pattrachitra.jpg";
import warli from "../assets/warli.webp";
import kalamkari from "../assets/kalamkari.jpg";
import tanjore from "../assets/tanjore.jpeg";
import miniature from "../assets/miniature.jpg";

const imageMap = {
  "/assets/madhubani.webp": madhubani,
  "/Phad.jpeg": phad,
  "/Gond.jpeg": gond,
  "/Pattachitra.jpeg": pattachitra,
  "/warli.jpg": warli,
  "/Kalamkari.jpeg": kalamkari,
  "/Tanjore.jpeg": tanjore,
  "/Miniature.jpeg": miniature,
};

const ArtStyle = () => {
  const artFormsData = artForms.artForms.map((art) => ({
    ...art,
    image: imageMap[art.image] || art.image, 
  }));  

  const [[currentIndex, direction], setCurrentIndex] = useState([0, 0]);

  const paginate = (newDirection) => {
    setCurrentIndex(([prevIndex, _]) => [prevIndex + newDirection, newDirection]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      paginate(1);
    }, 5000); // Auto-slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container">
      <header>
        <h1>Explore Indian Art Forms</h1>
      </header>
      <div className="slide-bg">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            className="slider-content"
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <div className="image-section">
              <img
                src={artFormsData[currentIndex % artFormsData.length].image}
                alt={artFormsData[currentIndex % artFormsData.length].name}
              />
              <div className="text-overlay">
                <h2>{artFormsData[currentIndex % artFormsData.length].name}</h2>
                <p>
                  {artFormsData[currentIndex % artFormsData.length].description}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="button-container">
        <button className="view-all-button">View All Artforms</button>
      </div>
    </div>
  );
};

// Animation Variants for smoother transitions
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000, // Move horizontally from the right or left
    opacity: 0,
    transition: { duration: 0.8 },
    position: "absolute", // Ensures the new slide doesn't push down the previous one
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    position: "relative", // Centered slide is relative
    transition: { duration: 0.8 },
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000, // Exit horizontally to the right or left
    opacity: 0,
    transition: { duration: 0.8 },
    position: "absolute", // Prevents exit animation from affecting layout
  }),
};

export default ArtStyle;
