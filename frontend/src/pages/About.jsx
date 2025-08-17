import React from 'react';
import { Silk, MagicBento } from '../components/indexComponents';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets';


export const About = () => {
  // --- MODIFICATION START ---
  // Updated skill arrays to match your resume
  const coreTechnologies = ['HTML', 'CSS', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB'];
  const toolsAndMethodologies = ['Tailwind CSS', 'Mongoose', 'Spline', 'Git', 'UI/UX Design'];
  // --- MODIFICATION END ---

  return (
    <main
      className="relative h-screen overflow-auto "
      aria-label="About Me Section"
      style={{ scrollBehavior: 'smooth' }}
    >

      {/* Silk Background */}
      <div className="fixed top-0 bottom-0 inset-0 h-screen z-0 w-full  ">
        <Silk
          speed={20}
          scale={1}
          color="#221545"
          noiseIntensity={0.2}
          rotation={0}
        />
        <style>
          {`
         @keyframes fadeInSlideUp {
           from { opacity: 0; transform: translateY(30px); }
           to { opacity: 1; transform: translateY(0); }
         }
         @keyframes shimmer {
           0% { background-position: -200% 0; }
           100% { background-position: 200% 0; }
         }
         .animate-fadeInSlideUp {
           animation: fadeInSlideUp 0.8s ease-out forwards;
         }
         .animate-shimmer {
           background-image: linear-gradient(to right, #1f2937 0%, #374151 20%, #1f2937 40%);
           background-size: 200% 100%;
           animation: shimmer 1.5s infinite linear;
         }
         .animate-delay-100 { animation-delay: 0.1s; }
         .animate-delay-200 { animation-delay: 0.2s; }
         .animate-delay-300 { animation-delay: 0.3s; }
         .animate-delay-400 { animation-delay: 0.4s; }
         .animate-delay-500 { animation-delay: 0.5s; }
         .animate-delay-600 { animation-delay: 0.6s; }
         .animate-delay-700 { animation-delay: 0.7s; }
         .animate-delay-800 { animation-delay: 0.8s; }
         `}
        </style>
      </div>
      {/* Main content container with "glassmorphism" effect and padding for full-width feel */}
      <div className="relative w-full text-white px-4 py-20 sm:px-6 lg:px-8 z-10">
        <div className="w-full max-w-screen mx-auto bg-transparent backdrop-blur-7xl rounded-3xl shadow-3xl p-8 sm:p-12 border border-[#4a348c]/50">

          {/* Introduction Section with Profile Picture */}
          <section className="flex flex-col md:flex-row items-center md:items-start gap-20 mb-16 border-b-2 border-indigo-500/20 pb-12 animate-fadeInSlideUp animate-delay-100">
            <div className="w-48 h-48 flex-shrink-0 relative group">
              <div className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.5), transparent 70%)' }}></div>
              <img
                src={assets.myself}
                alt="Anish"
                className="rounded-full shadow-lg border-4 border-indigo-500 relative z-10 transform group-hover:scale-105 transition-transform"
              />
            </div>

            <div className="flex-1 text-center md:text-left space-y-4">
              <h1 className="text-5xl sm:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 pb-2">
                About Myself
              </h1>
              {/* --- MODIFICATION START --- */}
              <p className="text-2xl text-gray-300 font-semibold tracking-wide">
                Full Stack Developer <span className="text-gray-400">|</span> AI Enthusiast
              </p>
              <p className="text-gray-400 leading-relaxed text-lg max-w-2xl mx-auto md:mx-0">
                Results-driven Information Technology student with a CGPA of 9.02 and a strong foundation in full-stack development using the MERN stack. Passionate about building responsive, AI-integrated web applications and proven leader within the student community.
              </p>
              {/* --- MODIFICATION END --- */}
            </div>
          </section>

          {/*--My Stats and Insigts-- */}
          <div className="relative  inset-0 z-5 ">
            <MagicBento
              textAutoHide={true}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              spotlightRadius={300}
              particleCount={12}
              glowColor="132, 0, 255"
            />
          </div>

          {/* My Philosophy Section - No changes here */}
          <section className="my-16 animate-fadeInSlideUp animate-delay-200">
            <h2 className="text-3xl font-semibold mb-8 border-b border-gray-700 pb-3">My Philosophy</h2>
            <div className="text-gray-400 text-lg space-y-4">
              <p>
                I believe that technology should not only be functional but also beautiful and intuitive. My goal is to
                build digital products that are a joy to use, combining robust technical implementation with thoughtful design.
                I am a strong advocate for <strong className="text-indigo-400">clean code</strong>, <strong className="text-indigo-400">user-centric design</strong>, and <strong className="text-indigo-400">continuous learning</strong> through collaboration.
              </p>
            </div>
          </section>

          {/* Technical Stack and Skills Section */}
          <section className="my-16 animate-fadeInSlideUp animate-delay-300">
            <h2 className="text-3xl font-semibold mb-8 border-b border-gray-700 pb-3">Technical Stack & Skills</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-indigo-400">Core Technologies</h3>
                <div className="flex flex-wrap gap-3">
                  {coreTechnologies.map((skill, index) => (
                    <span
                      key={skill}
                      className={`bg-[#4a348c]/40 text-indigo-200 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 hover:scale-110 hover:bg-[#5f47a6]/50 hover:shadow-lg transform animate-rotateIn animate-delay-${(index + 4) * 50}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-indigo-400">Tools & Methodologies</h3>
                <div className="flex flex-wrap gap-3">
                  {toolsAndMethodologies.map((skill, index) => (
                    <span
                      key={skill}
                      className={`bg-gray-700/40 text-gray-200 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 hover:scale-110 hover:bg-gray-600/50 hover:shadow-lg transform animate-rotateIn animate-delay-${(index + 4) * 50}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* --- MODIFICATION START: Updated Education & Experience Section --- */}
          <section className="my-16 animate-fadeInSlideUp animate-delay-400">
            <h2 className="text-3xl font-semibold mb-8 border-b border-gray-700 pb-3">Journey So Far</h2>
            <div className="space-y-8 text-gray-400">
              <div className="bg-[#2f2258]/50 rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-indigo-400 mb-2">Education</h3>
                <p className="text-lg">B.S. Abdur Rahman Crescent Institute of Science & Technology</p>
                <p className="italic text-sm">B.Tech in Information Technology | 2022 - Present</p>
                <p className="mt-4 font-bold text-gray-300">
                  Current CGPA: 9.02
                </p>
              </div>

              <div className="bg-[#2f2258]/50 rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-indigo-400 mb-2">Internships</h3>
                <ul className="space-y-4 list-disc list-inside">
                  <li>
                    <strong className="text-gray-300">Mannit Innovations (June 2025):</strong> Completed a 15-day internship focused on engineering a full-stack, AI-powered blog application using the MERN stack.
                  </li>
                  <li>
                    <strong className="text-gray-300">StartMyCareer (June 2024):</strong> Developed a dynamic and fully responsive personal portfolio website during a 15-day offline internship.
                  </li>
                </ul>
              </div>

              <div className="bg-[#2f2258]/50 rounded-lg p-6 shadow-md transition-all duration-300 hover:shadow-xl">
                <h3 className="text-2xl font-bold text-indigo-400 mb-2">Leadership & Initiatives</h3>
                <div className="space-y-4">
                  <p>
                    <strong className="text-gray-300">Co-Founder, Spark Solutions (2022-Present):</strong> Co-founded a college-recognized student organization and serve as Chief Financial Officer, managing finances and strategic planning.
                  </p>
                  <p>
                    <strong className="text-gray-300">General Secretary, IT Trailblazer Club (2023-Present):</strong> Lead club initiatives by organizing MERN stack workshops and hackathons. Coordinated the "Build Your Brand With AI" workshop.
                  </p>
                  <p>
                    <strong className="text-gray-300">Class Representative (2022-Present):</strong> Serving as the primary liaison between faculty and students for four consecutive years.
                  </p>
                </div>
              </div>
            </div>
          </section>
          {/* --- MODIFICATION END --- */}


          {/* Resume Button */}
          <div>
            <button
              onClick={() => {
                window.open(assets.finalAk, '_blank');
              }}
              className="flex items-center gap-2 px-6 py-2 bg-[#2f2258]/50 text-white font-semibold rounded-md hover:bg-gray-800 transition"
            >
              {/* Live pulse icon */}
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
              </span>
              My Resume
            </button>
          </div>

          {/* Personal Interests & Fun Facts Section - No changes here */}
          <section className="my-16 animate-fadeInSlideUp animate-delay-500">
            <h2 className="text-3xl font-semibold mb-8 border-b border-gray-700 pb-3">Personal Interests & Fun Facts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-400">
              <div className="relative bg-[#2f2258]/50 rounded-lg p-8 shadow-lg overflow-hidden group transition-transform duration-500 hover:scale-105">
                <div className="absolute inset-0 bg-indigo-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="text-xl font-bold text-indigo-400 mb-2 relative z-10">Creative Outlets</h3>
                <p className="relative z-10">
                  Beyond the screen, I find my balance in playing **badminton**, capturing moments through **photography**, and exploring new perspectives through **reading**.
                </p>
              </div>
              <div className="relative bg-[#2f2258]/50 rounded-lg p-8 shadow-lg overflow-hidden group transition-transform duration-500 hover:scale-105">
                <div className="absolute inset-0 bg-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <h3 className="text-xl font-bold text-purple-400 mb-2 relative z-10">Fun Facts</h3>
                <ul className="relative z-10 list-disc list-inside space-y-2">
                  <li>I am a native **Tamil** speaker.</li>
                  <li>My favorite personal project was a web-based recipe manager.</li>
                  <li>I'm inspired by projects that have a positive impact on local communities.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="mt-16 text-center pt-12 border-t-2 border-gray-700 animate-fadeInSlideUp animate-delay-600">
            <h2 className="text-4xl font-extrabold text-indigo-400 mb-4">Let's Connect!</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
              I'm always open to new challenges and collaborations. If you have a project in mind or just want to say hello, get in touch!
            </p>
            <Link
              to="/contact"
              className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold py-4 px-10 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:brightness-110"
            >
              Contact Me
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
};