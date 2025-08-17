import React, { useState, useEffect } from 'react';
import { TiltedCard, Silk } from '../components/indexComponents'; // Assuming Silk is for the background
import { client, urlFor } from '../client';
import { Link, useNavigate } from 'react-router-dom';

export const Projects = () => {
    const [projects, setProjects] = useState([]);
    const navigate= useNavigate()

    useEffect(() => {
        // This GROQ query fetches all documents of type "project"
        const query = '*[_type == "project"]';

        client.fetch(query).then((data) => {
            setProjects(data);
        });
    }, []);

    return (
        <main className="relative h-screen overflow-auto bg-[#111827]">
            <div className="relative max-w-full mx-auto my-10 sm:my-10 z-10 border-b-2 border-indigo-500/20">
                   <h1 className="text-5xl sm:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500 px-4 py-4 leading-tight">
                        My Projects
                    </h1>

                </div>
            {/* Optional: Add a background like in your other pages */}
            <div className="fixed top-0 bottom-0 inset-0 h-screen z-0 w-full ">
                <Silk
                    speed={20}
                    scale={1}
                    color="#221545"
                    noiseIntensity={0.2}
                    rotation={0}
                />            
            </div>

            {/* Main container for all project cards */}
            <div className="relative  flex-row z-10 flex flex-wrap justify-center items-start gap-10">

                {/* We map over the 'projects' state to create a card for each project */}
                {projects && projects.map((project, index) => (
                    // This is the container for each individual project card, styled like your example.
                    <div  onClick={()=>navigate(`/project/${project._id}`)}
                        key={index}
                        className='flex flex-col items-center gap-4 p-4 bg-gray-800/50 backdrop-blur-md border border-gray-700/50 rounded-xl w-full max-w-[400px]'
                    >
                        <TiltedCard
                            // Use urlFor to get the correct image URL from Sanity's image data
                            imageSrc={project.mainImage ? urlFor(project.mainImage).url() : ''}
                            altText={project.title}
                            captionText={project.title}
                            containerHeight="300px"
                            containerWidth="100%" // Use 100% to be responsive within the container
                            imageHeight="300px"
                            imageWidth="100%"
                            rotateAmplitude={12}
                            scaleOnHover={1.1}
                            showMobileWarning={false}
                            showTooltip={true}
                            displayOverlayContent={true}

                        />
                        {/* --- ENHANCED STYLING SECTION --- */}
                        <div className="w-full text-left mt-4 p-4 bg-slate-800/30 backdrop-blur-md border border-slate-700/50 rounded-lg transition-all duration-300 group-hover:border-purple-500/50">
                            <h2 className="text-white text-2xl font-bold">{project.title}</h2>
                            <div className="flex flex-wrap gap-2 mt-3">
                                {project.technologies?.map(tech => (
                                    <span key={tech} className="bg-slate-700/50 text-slate-300 text-xs font-medium px-3 py-1 rounded-full">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <div className="flex items-center gap-4 mt-5">
                                {/* Styled Button for Live Site */}
                                <a onClick={(e)=>e.stopPropagation()}  href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-purple-600/80 text-white font-semibold rounded-lg hover:bg-purple-600 transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                    Live Site
                                </a>
                                {/* Styled Button for GitHub */}
                                <a onClick={(e)=>e.stopPropagation()} href={project.githubLink}  target="_blank" rel="noopener noreferrer" >
                                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-700/80 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors duration-300 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                    GitHub
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};
