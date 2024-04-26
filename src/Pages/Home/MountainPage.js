import React, { useState, useEffect, useRef } from 'react';
import Mountains from './MountainRanges';
import './MountainPage.css';

const MountainPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const mountainRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect(); // Stop observing once visible
                    }
                });
            },
            { threshold: 0.5 } // Trigger when 50% of the element is visible
        );

        if (mountainRef.current) {
            observer.observe(mountainRef.current);
        }

        return () => observer && observer.disconnect();
    }, []);

    return (
        <div className='MountainPage-container' ref={mountainRef}>
          <div className={`show-mountains ${isVisible ? 'is-visible' : ''}`}>
            {isVisible && <Mountains />}
          </div>
        </div>
    );
};

export default MountainPage;
