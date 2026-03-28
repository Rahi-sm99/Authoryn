import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const Intro = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                background: '#030303',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '1.5rem'
            }}
        >
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                    duration: 1.2, 
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.2
                }}
                style={{
                    background: 'white',
                    padding: '1.25rem',
                    borderRadius: '24px',
                    boxShadow: '0 0 50px rgba(34, 211, 238, 0.3)'
                }}
            >
                <Code2 size={48} color="black" />
            </motion.div>

            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                style={{
                    fontSize: '3rem',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    color: 'white',
                    background: 'linear-gradient(to bottom, #ffffff, #94a3b8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}
            >
                Authoryn
            </motion.h1>

            <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 120 }}
                transition={{ duration: 1.5, delay: 1, ease: 'easeInOut' }}
                style={{
                    height: '2px',
                    background: 'linear-gradient(to right, transparent, var(--primary), transparent)',
                    opacity: 0.5
                }}
            />
        </motion.div>
    );
};

export default Intro;
