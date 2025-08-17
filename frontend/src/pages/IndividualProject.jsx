import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { client, urlFor } from '../client';
import { Silk } from '../components/indexComponents';

export const IndividualProject = () => {
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const { projectId } = useParams(); // Get the project ID from the URL

    useEffect(() => {
        // FIX: Added a console.log to help debug the projectId from the URL
        console.log('Fetching project with ID:', projectId);

        // This GROQ query fetches the specific project document that matches the ID in the URL
        const query = `*[_type == "project" && _id == '${projectId}'][0]`;

        client.fetch(query).then((data) => {
            setProject(data);
            setLoading(false);
        });
    }, [projectId]); // Re-run the effect if the projectId changes

    // Display a loading message while fetching data
    if (loading) {
        return (
            <main className="relative h-screen w-full flex items-center justify-center bg-[#111827]">
                <p className="text-white text-2xl">Loading Project...</p>
            </main>
        );
    }

    // Display a message if the project is not found
    if (!project) {
        return (
            <main className="relative h-screen w-full flex items-center justify-center bg-[#111827]">
                <p className="text-white text-2xl">Project not found.</p>
            </main>
        );
    }

    return (
        <main className="relative h-screen overflow-auto bg-[#111827]">
            {/* Background element */}
            <div className="fixed top-0 bottom-0 inset-0 h-screen z-0 w-full">
                <Silk
                    speed={20}
                    scale={1}
                    color="#221545"
                    noiseIntensity={0.2}
                    rotation={0}
                />
            </div>

            {/* Main content container */}
            <div className="relative z-10 p-4 sm:p-8">
                <div className="max-w-5xl mx-auto">
                    {/* Project Header */}
                    <div className="text-center my-16 sm:my-24">
                        <h1 className="text-5xl sm:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500 pb-4 leading-tight">
                            {project.title}
                        </h1>
                    </div>

                    {/* Project Image */}
                    <div className="w-full h-auto max-h-[600px] rounded-xl overflow-hidden border-2 border-slate-700/50 shadow-2xl shadow-purple-500/10">
                        <img 
                            src={project.mainImage ? urlFor(project.mainImage).width(1200).url() : ''} 
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Project Details */}
                    <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12 text-white pb-24">
                        {/* Left Column: Description */}
                        <div className="lg:col-span-2">
                            <h2 className="text-3xl font-bold text-slate-200 border-b-2 border-purple-500/50 pb-3 mb-6">
                                About the Project
                            </h2>
                            <p className="text-slate-300 leading-relaxed">
                                {project.description}
                            </p>
                        </div>

                        {/* Right Column: Tech Stack & Links */}
                        <div>
                            <h2 className="text-3xl font-bold text-slate-200 border-b-2 border-purple-500/50 pb-3 mb-6">
                                Built With
                            </h2>
                            <div className="flex flex-wrap gap-3 mb-8">
                                {project.technologies?.map(tech => (
                                    <span key={tech} className="bg-slate-700/50 text-slate-300 text-sm font-medium px-4 py-2 rounded-full">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                            <div className="flex flex-col gap-4">
                                {project.projectUrl && (
                                    <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition-colors duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                        View Live Site
                                    </a>
                                )}
                                {project.githubLink && (
                                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-75 transition-colors duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                                        View on GitHub
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};
