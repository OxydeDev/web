import React from 'react';
import { Palette, Heart, Star, Users, Zap, Award } from 'lucide-react';

const About = () => {
  const skills = [
    { name: 'Digital Illustration', level: 95 },
    { name: 'Animation', level: 88 },
    { name: 'Brand Design', level: 92 },
    { name: 'Color Theory', level: 90 },
    { name: 'Typography', level: 85 },
    { name: 'UI/UX Design', level: 80 }
  ];

  const achievements = [
    { icon: Users, label: 'Happy Clients', value: '7+' },
    { icon: Star, label: 'Average Rating', value: '4.9/5' },
    { icon: Zap, label: 'Projects Completed', value: '15+' },
    { icon: Award, label: 'Years Experience', value: '3+' }
  ];

  const tools = [
    'Adobe Photoshop',
    'Adobe Illustrator',
    'After Effects',
    'Procreate',
    'Figma',
    'Blender'
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="bg-gradient-to-br from-pink-100 to-pink-200 p-4 rounded-full w-32 h-32 mx-auto mb-8 flex items-center justify-center">
            <Palette className="h-16 w-16 text-black" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">About Hope</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Digital artist specializing in custom Discord artwork with a passion for creating unique, 
            memorable designs that bring communities together.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Story */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-black mb-6 flex items-center">
                <Heart className="h-8 w-8 text-pink-400 mr-3" />
                My Story
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Hi there! I'm Hope, a digital artist who discovered my passion for creating custom Discord artwork 
                  through my own involvement in online communities. What started as creating graphics for my friends' 
                  servers has grown into a thriving commission business.
                </p>
                <p>
                  I specialize in Discord banners, server logos, profile banners, and custom emoji sets. Each piece 
                  is crafted with care, attention to detail, and a deep understanding of what makes Discord communities 
                  special. I believe that great artwork can transform a server's atmosphere and help communities 
                  express their unique personality.
                </p>
                <p>
                  My approach combines modern design trends with timeless aesthetics, ensuring your artwork looks 
                  great today and will continue to represent your community well into the future. I work closely 
                  with each client to understand their vision and bring it to life in ways that exceed expectations.
                </p>
                <p>
                  When I'm not creating commissions, you can find me exploring new design techniques, participating 
                  in online art communities, and constantly learning to improve my craft. I'm always excited to take 
                  on new challenges and help Discord communities stand out with amazing custom artwork.
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-black mb-6">Skills & Expertise</h2>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700">{skill.name}</span>
                      <span className="text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-black to-pink-400 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Facts */}
            <div className="bg-pink-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-black mb-4">Quick Facts</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Specialization:</span>
                  <span className="font-medium text-black">Discord Art</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Style:</span>
                  <span className="font-medium text-black">Modern & Clean</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Turnaround:</span>
                  <span className="font-medium text-black">2-3 Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Availability:</span>
                  <span className="font-medium text-black">Open</span>
                </div>
              </div>
            </div>

            {/* Tools */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-black mb-4">Tools I Use</h3>
              <div className="flex flex-wrap gap-2">
                {tools.map((tool, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-black rounded-2xl p-6 text-center">
              <h3 className="text-xl font-bold text-white mb-3">Ready to Work Together?</h3>
              <p className="text-pink-200 text-sm mb-4">
                Let's create something amazing for your Discord community!
              </p>
              <a
                href="/commission"
                className="bg-pink-200 text-black px-6 py-3 rounded-full font-semibold hover:bg-pink-300 transition-all duration-200 hover:scale-105 inline-block"
              >
                Start a Commission
              </a>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-black text-center mb-12">Achievements & Milestones</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="bg-pink-50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <achievement.icon className="h-8 w-8 text-black" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-black mb-1">{achievement.value}</div>
                <div className="text-gray-600 font-medium">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy */}
        <div className="bg-gradient-to-br from-pink-50 to-white rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-black mb-6">My Design Philosophy</h2>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            "Great design is not just about making things look pretty—it's about creating visual experiences 
            that resonate with people and strengthen communities. Every Discord server has its own personality, 
            and my job is to capture that essence and translate it into artwork that members will love and 
            remember. I believe in the power of thoughtful design to bring people together and create lasting 
            impressions in the digital spaces we call home."
          </p>
          <div className="mt-8">
            <div className="inline-block bg-black text-pink-200 px-6 py-2 rounded-full font-medium">
              - Hope ✨
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;