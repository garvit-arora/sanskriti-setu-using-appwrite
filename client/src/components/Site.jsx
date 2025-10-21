import {  useEffect, useRef } from "react";
import Transition from "../Transition";
import { gsap } from "gsap";

import '../css/rajgad.css';
function Site() {
  const containerRef = useRef(null);
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;
  
      
      const layers = containerRef.current.querySelectorAll(".parallax");
      layers.forEach((el) => {
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        el.style.transform = `translate(calc(-50% + ${-x * speedx}px), calc(-50% + ${-y * speedy}px))`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    // Animation for the entire section when it enters the viewport
    gsap.fromTo(
      textRef.current,
      { x: -200, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current, // Trigger when textRef is visible
          start: "top 80%", // Start animation when top of text reaches 80% of the viewport height
        },
      }
    );

    gsap.fromTo(
      imgRef.current,
      { x: 200, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imgRef.current, // Trigger when imgRef is visible
          start: "top 80%", // Start animation when top of image reaches 80% of the viewport height
        },
      }
    );
  }, []);
  return (
    <Transition>
      <div className="site-info">
        <div className="rajgad-container" ref={containerRef}>
          <img 
            src="/try/rajgad02.png" 
            data-speedy="0.08" 
            data-speedx="0.08" 
            alt="Rajgad Background" 
            className="parallax bg-main" 
          />
          <div className="text">
            <h1>Rajgad</h1>
            <h1>Fort</h1>
          </div>
          <img 
            src="/try/rajgad01.png" 
            data-speedy="0.03" 
            data-speedx="0.02" 
            alt="Rajgad Fort" 
            className="parallax fort" 
          />
        </div>

        <section className="history-section" ref={sectionRef}>
      <div className="text-wrapper" ref={textRef}>
        <h1 className="title">History of Rajgad Fort</h1>
        <p className="paragraph">
          Rajgad Fort, once known as Murumbdev, was the first capital of
          Chhatrapati Shivaji Maharaj's kingdom. It witnessed key moments in
          Shivaji's reign, including military planning and the birth of his son,
          Rajaram. The fort's architecture is iconic with its robust defenses,
          such as the Padmavati and Sanjivani Machees, and the strategically
          important Chor Darwaza.
        </p>
      </div>
      <div className="image-wrapper" ref={imgRef}>
        <img
          src="/cultural_sites/rajgad-buruj.jpg"
          alt="Rajgad Fort"
          className="image"
        />
      </div>
    </section>
      </div>
    </Transition>
  );
}

export default Site;
