import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const AnimatedCounter = ({ value, duration = 2 }) => {
    const [isInView, setIsInView] = useState(false);
    const [currentValue, setCurrentValue] = useState(0);
    
    useEffect(() => {
        if (isInView) {
            const increment = value / (duration * 60); // 60 frames per second
            let current = 0;
            
            const interval = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setCurrentValue(value);
                    clearInterval(interval);
                } else {
                    setCurrentValue(Math.floor(current));
                }
            }, 1000 / 60); // 60 FPS

            return () => clearInterval(interval);
        }
    }, [isInView, value, duration]);

    return (
        <motion.div
            onViewportEnter={() => setIsInView(true)}
            viewport={{ once: true, margin: "-100px" }}
        >
            <motion.p>{currentValue}</motion.p>
        </motion.div>
    );
};

export default AnimatedCounter; 