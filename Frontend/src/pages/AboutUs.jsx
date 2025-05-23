import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 flex flex-col items-center justify-start p-6 pt-20">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-10 text-gray-800 mb-10">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">About Digital Ledger</h1>
        <p className="mb-4 leading-relaxed">
          <strong>Digital Ledger</strong> is a modern personal finance management tool built to simplify your financial life.
          Whether you're tracking expenses, managing group finances, or staying on top of recurring bills — we provide
          a powerful and intuitive interface for individuals and groups alike.
        </p>
        <p className="mb-4 leading-relaxed">
          Our goal is to promote smarter money habits through transparency, automation, and collaboration. With features like
          categorized transactions, real-time expense splitting, and insightful dashboards, Digital Ledger empowers you
          to stay financially organized and make informed decisions.
        </p>
        <p className="leading-relaxed">
          This project was crafted with love and code by a passionate team of developers aiming to make finance less stressful and more insightful.
        </p>
      </div>
    
      <br/>
      <br/>
      <br/>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {[
          {
            name: "Donald Jackman",
            role: "Content Creator",
            image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
            text: "I've been using Digital Ledger for nearly two years, primarily for expense tracking, and it has been incredibly user-friendly, making my work much easier."
          },
          {
            name: "Richard Nelson",
            role: "Instagram Influencer",
            image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
            text: "I love how Digital Ledger lets me split bills with friends effortlessly. The insights I get from the dashboards are amazing too!"
          },
          {
            name: "Jessica Patel",
            role: "Startup Founder",
            image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=200",
            text: "Digital Ledger has streamlined how I manage shared expenses with my co-founders. Highly recommended for teams!"
          },
        ].map(({ name, role, image, text }, idx) => (
          <div key={idx} className="text-sm w-80 border border-gray-300 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5">
            <div className="flex flex-col items-center px-5 py-4 relative">
              <img className="h-24 w-24 absolute -top-14 rounded-full object-cover border-4 border-white shadow-md" src={image} alt={name} />
              <div className="pt-10 text-center">
                <h1 className="text-lg font-medium text-gray-800">{name}</h1>
                <p className="text-gray-600">{role}</p>
              </div>
            </div>
            <p className="text-gray-500 px-6 text-center">{text}</p>
            <div className="flex justify-center pt-4">
              <div className="flex gap-0.5">
                {Array(5).fill(0).map((_, i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.525.464a.5.5 0 0 1 .95 0l2.107 6.482a.5.5 0 0 0 .475.346h6.817a.5.5 0 0 1 .294.904l-5.515 4.007a.5.5 0 0 0-.181.559l2.106 6.483a.5.5 0 0 1-.77.559l-5.514-4.007a.5.5 0 0 0-.588 0l-5.514 4.007a.5.5 0 0 1-.77-.56l2.106-6.482a.5.5 0 0 0-.181-.56L.832 8.197a.5.5 0 0 1 .294-.904h6.817a.5.5 0 0 0 .475-.346z" fill="#FF532E"/>
                  </svg>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
