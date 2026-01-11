import React from "react";
import { Link } from "react-router-dom";
import { Code2, Zap, Users, Award, ArrowRight } from "lucide-react";

const HomePage = () => {
  const features = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Code in Browser",
      description: "Write and execute code directly in your browser without any setup",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Feedback",
      description: "Get immediate test results and feedback on your solutions",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Driven",
      description: "Join thousands of developers solving problems together",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Track Progress",
      description: "Monitor your progress and earn badges as you solve problems",
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center border-b-2 border-punk-pink">
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-punk-pink via-punk-cyan to-punk-lime mb-6 uppercase tracking-tighter drop-shadow-lg">
          ROCK YOUR CODE
        </h1>
        <p className="text-xl text-punk-cyan mb-8 max-w-2xl mx-auto font-bold uppercase tracking-wide">
          Unleash your programming fury! Solve insane challenges, crush the leaderboard, and prove your coding prowess.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/problems"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-punk-pink to-punk-purple text-black rounded font-black uppercase tracking-wide hover:shadow-xl hover:shadow-punk-pink/60 transition transform hover:scale-105"
          >
            <span>ENTER THE BATTLE</span>
            <ArrowRight className="w-6 h-6" />
          </Link>
          <button className="px-8 py-4 border-3 border-punk-cyan text-punk-cyan rounded font-black uppercase tracking-wide hover:bg-punk-cyan hover:text-black transition transform hover:scale-105">
            MORE INFO
          </button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 border-b-2 border-punk-purple">
        <div className="grid grid-cols-3 gap-8 text-center">
          <div className="p-6 border-2 border-punk-lime bg-black hover:bg-punk-lime/5 transition">
            <p className="text-5xl font-black text-punk-lime mb-2">500+</p>
            <p className="text-punk-cyan font-bold uppercase">Battles</p>
          </div>
          <div className="p-6 border-2 border-punk-cyan bg-black hover:bg-punk-cyan/5 transition">
            <p className="text-5xl font-black text-punk-cyan mb-2">50K+</p>
            <p className="text-punk-pink font-bold uppercase">Warriors</p>
          </div>
          <div className="p-6 border-2 border-punk-pink bg-black hover:bg-punk-pink/5 transition">
            <p className="text-5xl font-black text-punk-pink mb-2">10M+</p>
            <p className="text-punk-cyan font-bold uppercase">Victories</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-punk-cyan to-punk-lime mb-12 text-center uppercase tracking-tight">WHY PUNK PROGRAMMING?</h2>
        <div className="grid grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-black p-8 border-2 border-punk-pink hover:border-punk-cyan hover:shadow-2xl hover:shadow-punk-pink/50 transition transform hover:scale-105"
            >
              <div className="text-blue-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join thousands of developers improving their skills daily
          </p>
          <Link
            to="/problems"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition font-semibold"
          >
            <span>Browse Problems</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>&copy; 2024 CodeChallenge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
