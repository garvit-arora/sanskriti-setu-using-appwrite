// App.js
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../css/culturalSites.css';
import Transition from '../components/Transition';
import { Link } from 'react-router-dom';
import taj from "../assets/taj.jpeg"
import hawa from "../assets/hawa.webp"
import qutub from "../assets/qutub.jpg"
import charminar from "../assets/charminar.jpeg"
import lotus from "../assets/lotus.jpg"
import fort from "../assets/fort.jpg"
import akhbar from "../assets/akbar.jpg"
import church from '../assets/church.jpg'
import Footer from './Footer';


const AnimatedCard = ({ image, title }) => {
    const cardRef = useRef(null);
    const imageRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        // GSAP Animations
        gsap.fromTo(cardRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        );

        gsap.fromTo(imageRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
        );

        gsap.fromTo(titleRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.8 }
        );
    }, []);

    return (
        <div ref={cardRef} className="card">
            <Link to="/guides">
            <img ref={imageRef} src={image} alt={title} className="card-image" />
            <h2 ref={titleRef} className="card-title">{title}</h2>
            </Link>
        </div>
    );
};

const CulturalSites = () => {
    return (
        <Transition>
        <div className="app">
            <AnimatedCard
                image={taj}
                title="Taj Mahal"
            />
            <AnimatedCard
                image={hawa}

                title="Hawa Mahal"
            />
            <AnimatedCard
                image={qutub}

                title="Qutub Minar"
            />
            <AnimatedCard
                image={charminar}

                title="Charminar"
            />
            <br />
            <AnimatedCard
                image={akhbar}
                title="Akhbar Tomb"
            />
            <AnimatedCard
                image={lotus}

                title="Lotus Temple"
            />
            <AnimatedCard
                image={fort}

                title="Agra fort"
            />
            <AnimatedCard
                image={church}

                title="Basilica of Bom Jesus"
            />
        </div>
         <Footer />
        </Transition>
    );
}

export default CulturalSites;
