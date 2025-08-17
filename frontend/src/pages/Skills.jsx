import React, { useState, useEffect, useRef } from 'react';
import { Silk, PixelCard } from '../components/indexComponents';

// MODIFICATION: Unified skills data for a single, cohesive grid layout.
const skillsData = [
    // Large "hero" cards come first to establish hierarchy
    { name: 'React.js', colors: '#22d3ee,#67e8f9,#a5f3fc', category: 'Frontend Library', size: 'large' },
    { name: 'Node.js', colors: '#10b981,#34d399,#6ee7b7', category: 'Runtime Environment', size: 'large' },
    // Standard cards
    { name: 'JavaScript', colors: '#facc15,#fde047,#fef08a', category: 'Language' },
    { name: 'HTML', colors: '#f97316,#fb923c,#fdba74', category: 'Markup' },
    { name: 'CSS', colors: '#3b82f6,#60a5fa,#93c5fd', category: 'Styling' },
    { name: 'Tailwind CSS', colors: '#14b8a6,#2dd4bf,#5eead4', category: 'CSS Framework' },
    { name: 'MongoDB', colors: '#84cc16,#a3e635,#bef264', category: 'Database' },
    { name: 'Express.js', colors: '#6b7280,#9ca3af,#d1d5db', category: 'Backend Framework' },
    { name: 'Git', colors: '#ef4444,#f87171,#fca5a5', category: 'Version Control' },
    { name: 'Mongoose', colors: '#f97316,#fb923c,#fdba74', category: 'ODM Library' },
    { name: 'Spline', colors: '#a855f7,#c084fc,#d8b4fe', category: '3D Design' },
    { name: 'ImageKit', colors: '#c084fc,#d8b4fe', category: 'Asset Management' },
    { name: "NPM Packages", colors: "#84cc16,#a3e635,#bef264", category: "Package Manager" },
    { name: "Sanity.io", colors: "#facc15,#fde047,#fef08a", category: "Headless CMS" },
    { name: "Chart.js", colors: "#c084fc,#d8b4fe", category: "Data Visualization" },
    { name: "Email.js", colors: "#6b7280,#9ca3af,#d1d5db", category: "Email Service" }   

];

const CursorGlow = () => {
    const glowRef = useRef(null);
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (glowRef.current) {
                glowRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    return <div ref={glowRef} className="cursor-glow" />;
};

export const Skills = () => {
    const mainRef = useRef(null);

    // REMOVED: The complex parallax scroll effect ("staircase effect") is gone.
    // The useEffect that handled scrolling has been removed for a cleaner, more professional feel.

    return (
        <main
            ref={mainRef}
            className="relative h-screen overflow-auto bg-[#111827]"
            aria-label="Skills Section"
            style={{ scrollBehavior: 'smooth' }}
        >
            <CursorGlow />
            <div className="fixed top-0 bottom-0 inset-0 h-screen z-0 w-full opacity-50">
                <Silk
                    speed={20}
                    scale={1}
                    color="#221545"
                    noiseIntensity={0.2}
                    rotation={0}
                />
            </div>

            <div className="relative z-10 flex flex-col items-center p-4 sm:p-8 min-h-screen text-center">
                <div className="max-w-4xl mx-auto my-24 sm:my-32">
                    <h1 className="text-5xl sm:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500 pb-4 leading-tight">
                        My Digital Craft
                    </h1>
                    <p className="text-slate-300 text-lg sm:text-xl mt-6">
                        A showcase of the modern technologies and tools I use to architect and build compelling web experiences.
                    </p>
                </div>

                {/* MODIFICATION: A single, unified grid for a clean and professional layout */}
                <div className="w-full max-w-7xl mx-auto">
                    <h2 className="text-4xl sm:text-5xl font-bold text-slate-200 mt-12 mb-12 relative text-left">
                        Technologies & Tools
                        <span className="absolute -bottom-4 left-0 w-full h-1 bg-purple-500 rounded-full" />
                    </h2>

                    {/* This grid is fully responsive and handles card sizing elegantly */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {skillsData.map((skill) => {
                            const isLarge = skill.size === 'large';
                            const cardHeight = isLarge ? 'h-[400px]' : 'h-[300px]';
                            const colSpan = isLarge ? 'md:col-span-2' : ''; // Large cards span 2 columns on medium screens and up

                            return (
                                <div key={skill.name} className={colSpan}>
                                    <PixelCard
                                        colors={skill.colors}
                                        className={`${cardHeight} w-full border border-slate-700/50 bg-slate-900/40 backdrop-blur-lg transition-all duration-300 hover:border-purple-400/50 hover:scale-[1.03]`}
                                    >
                                        <div className="text-center p-4 flex flex-col justify-between h-full">
                                            <p className="text-purple-400 font-semibold">{skill.category}</p>
                                            <h3 className={`font-extrabold text-white ${isLarge ? 'text-4xl lg:text-5xl' : 'text-3xl'}`} style={{ textShadow: '3px 3px 12px rgba(0,0,0,0.8)' }}>
                                                {skill.name}
                                            </h3>
                                            <div />
                                        </div>
                                    </PixelCard>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
};
