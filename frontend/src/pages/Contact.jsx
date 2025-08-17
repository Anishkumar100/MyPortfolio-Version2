import React, { useState } from 'react';
import { Silk } from '../components/indexComponents';
import emailjs from '@emailjs/browser';

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            setSubmitStatus('error');
            return;
        }
        
        setIsSubmitting(true);

        // =================================================================================
        // HOW TO SET UP EMAILJS:
        // 1. Go to https://www.emailjs.com/ and create a free account.
        // 2. Add a new email service (e.g., Gmail) and get your SERVICE ID.
        // 3. Create a new email template and get your TEMPLATE ID.
        // 4. Find your PUBLIC KEY in your account settings.
        // 5. Replace the placeholder values below with your actual credentials.
        // =================================================================================
        
        const serviceID = 'service_j6475y9';
        const templateID = 'template_dngfxlu';
        const publicKey = 'jL4yK9dtp_gKmZalj';

        emailjs.send(serviceID, templateID, formData, publicKey)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setSubmitStatus('success');
                setIsSubmitting(false);
                setFormData({ name: '', email: '', message: '' });
            }, (err) => {
                console.log('FAILED...', err);
                setSubmitStatus('error');
                setIsSubmitting(false);
            });
    };

    return (
        <main className="relative min-h-screen overflow-auto w-full bg-[#111827]">
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
            <div className="relative z-10 flex flex-col items-center p-4 sm:p-8 min-h-screen">
                {/* Page Header */}
                <div className="text-center w-full max-w-4xl mx-auto my-16 sm:my-24">
                    <h1 className="text-5xl sm:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500 pb-4 leading-tight">
                        Get In Touch
                    </h1>
                    <p className="text-slate-300 text-lg sm:text-xl mt-4">
                        Have a project in mind or just want to say hello? I'd love to hear from you.
                    </p>
                </div>

                {/* Contact Form Section */}
                <div className="w-full max-w-2xl mx-auto bg-slate-800/40 backdrop-blur-lg border border-slate-700/50 rounded-xl p-8 shadow-2xl shadow-purple-500/10">
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label htmlFor="name" className="block text-left text-slate-300 font-semibold mb-2">Your Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                    required 
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-left text-slate-300 font-semibold mb-2">Your Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                    required 
                                />
                            </div>
                        </div>
                        <div className="mb-6">
                            <label htmlFor="message" className="block text-left text-slate-300 font-semibold mb-2">Your Message</label>
                            <textarea 
                                id="message" 
                                name="message" 
                                rows="6"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                required
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full px-8 py-4 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>
                    </form>
                    
                    {/* Submission Status Messages */}
                    {submitStatus === 'success' && (
                        <p className="mt-6 text-center text-green-400">Thank you! Your message has been sent successfully.</p>
                    )}
                    {submitStatus === 'error' && (
                        <p className="mt-6 text-center text-red-400">Something went wrong. Please fill out all fields and try again.</p>
                    )}
                </div>
            </div>
        </main>
    );
};
