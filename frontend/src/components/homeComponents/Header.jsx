import React from "react";
import { Link } from "react-router-dom";
import { DecryptedText } from "../DecryptedText";

export const Header = () => {
  const roles = [
    "Full Stack Developer",
    "UI/UX Designer",
    "Creative Problem Solver",
    "Tech Enthusiast",
    "Open Source Contributor",
    "Passionate Innovator",
    "React Specialist",
    "Node.js Expert",
    "Tailwind CSS Lover",
    "API Architect",
    "Performance Optimizer",
    "Agile Practitioner",
    "Team Player",
    "Lifelong Learner",
    "Problem Solver",
  ];

  const scrollingText = roles.join("  •  ");

  return (
    <div>
      <header
        className=" 
    relative
    w-full max-w-4xl
    mx-auto top-28 mb-10  max-sm:top-20 flex flex-col items-center justify-center
    px-4 sm:px-6 md:px-8 lg:px-12
    text-center text-white 
  
  "
        style={{ left: "auto" }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/80 via-transparent to-black/90" />

        {/* Main content container */}
        <div className="max-w-4xl space-y-6 sm:space-y-8 w-full min-w-0">
          {/* Intro */}
          <h1
            className="
            text-5xl 
            font-extrabold
            leading-tight sm:leading-tight md:leading-snug
            break-words
            max-w-full
          "
            style={{ wordWrap: "break-word" }}
          >
            <DecryptedText
              text="Hello I'm "
              animateOn="view"
              revealDirection="center"
            />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
              <DecryptedText
                text="ANISH KUMAR"
                animateOn="view"
                revealDirection="center"
              />
            </span>
          </h1>

          {/* Scrolling roles container */}
          <div className="relative w-full max-w-full overflow-x-hidden whitespace-nowrap border-t border-b border-white/20 py-4 sm:py-3">
            <div
              className="
              inline-block
              min-w-max
              whitespace-nowrap
              text-sm sm:text-base md:text-lg
              font-semibold
              text-gray-300
              
            "
              style={{
                animation: "scrollLeft 30s linear infinite",
                willChange: "transform",
              }}
            >
              {scrollingText} &#x2022; {scrollingText}
            </div>
          </div>

          {/* Professional summary */}
          <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed break-words max-sm:text-justify">
            <DecryptedText
              text=" I specialize in developing high-quality, scalable web applications that combine elegant design with optimal performance. My focus is on creating intuitive, responsive experiences that engage users across devices."
              speed={800}
              maxIterations={10}
              characters="ABCD1234!?"
              className="revealed"
              parentClassName="all-letters"
              encryptedClassName="encrypted"
            />
           
          </p>

          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed break-words">
            Proficient in the MERN stack, React, Node.js, and Tailwind CSS, I bring a comprehensive approach to both frontend and backend development, delivering robust solutions tailored to your needs.
          </p>

          {/* Call-to-action buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-6 w-full mx-auto">
            <Link
              to="/projects"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold shadow-lg hover:shadow-[0_0_30px_rgba(131,90,255,0.8)] transition-transform hover:scale-105 text-center"
            >
              View Projects
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-white/30 rounded-full text-white hover:bg-white/10 hover:shadow-[0_0_25px_rgba(255,255,255,0.35)] transition-all font-semibold text-center"
            >
              More About Me
            </Link>

            <Link
              to="https://kanchigga-run.netlify.app/"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border border-white/30 rounded-full text-white hover:bg-white/10 hover:shadow-[0_0_25px_rgba(255,255,255,0.35)] transition-all font-semibold text-center max-lg:hidden"
            >
              Play A Game
            </Link>
          </div>
        </div>
        <br />

        {/* Keyframes animation */}
        <style>
          {`
          @keyframes scrollLeft {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}
        </style>
      </header>
    </div>
  );
};
