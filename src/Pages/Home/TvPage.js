import React, { useState, useEffect, useRef } from 'react';
import TV from '../LoggedOn/TV';
import './TvPage.css';

const TvPage = () => {
    const [isVisible, setIsVisible] = useState(false);
    const contentRef = useRef(null);

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

        if (contentRef.current) {
            observer.observe(contentRef.current);
        }

        return () => observer && observer.disconnect();
    }, []);

    return (
        <div className='tvPage-page'>
            <div className={`tvPage-content-wrapper ${isVisible ? 'is-visible' : ''}`} ref={contentRef}>
                <div className='tv-text-container'>
                    No Matter the Season
                </div>
                <div className='tv-display-container'>
                    <div className='tv-setting-display'>
                        <TV />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TvPage;
