// App.js
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../css/culturalSites.css';
import Transition from '../components/Transition';
import { Link } from 'react-router-dom';
import onam from '../assets/onam.jpg'
import diwali from '../assets/diwali.jpg'
import makar from '../assets/makar sakranti.jpg'
import baisakhi from '../assets/baisakhi.jpg'
import durga from '../assets/durja puja.jpg'
import ganesh from '../assets/Ganesh Festival.jpg'
import holi from '../assets/holi.jpg'
import eid from '../assets/eid2.jpg'
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

const Festivals = () => {
    return (
        <Transition>
        <div className="app">
            <AnimatedCard
                image={diwali}
                title="Diwali - The festival of lights"
            />
            <AnimatedCard
                image={onam}

                title="Onam - The harvest festival"
            />
            <AnimatedCard
                image={holi}

                title="Holi - The festival of colours"
            />
            <AnimatedCard
                image={makar}

                title="Makar Sakranti - The Sun God's festival"
            />
            <br />
            <AnimatedCard
                image={baisakhi}
                title="Baisakhi - The Sikh new year"
            />
            <AnimatedCard
                image={durga}

                title="Durga Puja - The triumph of good over evil"
            />
            <AnimatedCard
                image={eid}

                title="Eid - The festival of Gratitude"
            />
            <AnimatedCard
                image={ganesh}

                title="Ganesh Chaturthi - The festival of Creation & Dissolution"
            />
        </div>
         <Footer />
        </Transition>
    );
}

export default Festivals;
