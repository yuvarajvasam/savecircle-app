
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-full flex flex-col font-display transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-20 flex items-center justify-between bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md px-4 py-3 border-b border-border-light dark:border-white/5">
         <div className="flex w-12 items-center justify-start">
            <button onClick={() => navigate(-1)} className="h-10 w-10 flex items-center justify-center text-text-primary-light dark:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
            </button>
         </div>
         <h1 className="text-lg font-bold text-text-primary-light dark:text-white">Privacy Policy</h1>
         <div className="w-12"></div>
      </header>

      <main className="flex-1 overflow-y-auto p-6 pb-12">
         <div className="prose dark:prose-invert prose-sm max-w-none text-text-secondary-light dark:text-text-secondary-dark">
             <p className="font-bold text-text-primary-light dark:text-white mb-6">Last Updated: October 24, 2024</p>
             
             <section className="mb-8">
                 <h3 className="text-lg font-bold text-text-primary-light dark:text-white mb-3">1. Introduction</h3>
                 <p className="mb-4">
                     Welcome to SaveCircle. We value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data.
                 </p>
             </section>

             <section className="mb-8">
                 <h3 className="text-lg font-bold text-text-primary-light dark:text-white mb-3">2. Information We Collect</h3>
                 <ul className="list-disc pl-5 space-y-2 mb-4">
                     <li><strong>Account Information:</strong> Name, email address, profile picture, and phone number.</li>
                     <li><strong>Financial Data:</strong> Transaction history, savings goals, and circle contributions. Note: We do not store sensitive banking credentials directly; they are handled by secure payment processors.</li>
                     <li><strong>Usage Data:</strong> App interaction patterns, streak data, and feature usage to improve user experience.</li>
                 </ul>
             </section>

             <section className="mb-8">
                 <h3 className="text-lg font-bold text-text-primary-light dark:text-white mb-3">3. How We Use Your Data</h3>
                 <p className="mb-4">We use your data to:</p>
                 <ul className="list-disc pl-5 space-y-2">
                     <li>Provide and maintain the SaveCircle service.</li>
                     <li>Process transactions and track savings progress.</li>
                     <li>Facilitate social features like Circles and Leaderboards.</li>
                     <li>Send important notifications regarding your account and goals.</li>
                 </ul>
             </section>

             <section className="mb-8">
                 <h3 className="text-lg font-bold text-text-primary-light dark:text-white mb-3">4. Data Security</h3>
                 <p>
                     We implement industry-standard security measures, including encryption and secure server infrastructure, to protect your data from unauthorized access, alteration, disclosure, or destruction.
                 </p>
             </section>

             <section className="mb-8">
                 <h3 className="text-lg font-bold text-text-primary-light dark:text-white mb-3">5. Third-Party Services</h3>
                 <p>
                     Our app may contain links to third-party websites or services (e.g., UPI apps, Banking portals) that are not owned or controlled by SaveCircle. We are not responsible for the content or privacy practices of these sites.
                 </p>
             </section>

             <section className="mb-8">
                 <h3 className="text-lg font-bold text-text-primary-light dark:text-white mb-3">6. Contact Us</h3>
                 <p>
                     If you have any questions about this Privacy Policy, please contact us at <span className="text-primary-dark dark:text-primary font-bold">support@savecircle.app</span>.
                 </p>
             </section>
         </div>
      </main>
    </div>
  );
};
