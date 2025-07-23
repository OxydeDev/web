import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, Clock } from 'lucide-react';

const Home = () => {
  const featuredWorks = [
    {
      id: 1,
      title: 'Hope\'s Services Logo',
      type: 'Static Logo',
      image: 'https://media.discordapp.net/attachments/1380820797261746317/1397528226171060365/HS_Services.png?ex=68820d15&is=6880bb95&hm=adbfa396d844b34d87e1adbb0e6d319c0a15250f5aea01fbb36d997ecc907c9a&=&format=webp&quality=lossless'
    },
    {
      id: 2,
      title: 'Hope Anime Profile Banner',
      type: 'Animated',
      image: 'https://media.discordapp.net/attachments/1380820797261746317/1381235586601586698/hopeanimebannersafe.gif?ex=68817221&is=688020a1&hm=92af0c6d91fbcef5fcbde8abf0e6c225e24be98f28d80bebf30eba75857be262&='
    },
    {
      id: 3,
      title: 'Vorrak Profile Banner',
      type: 'Animated',
      image: 'https://media.discordapp.net/attachments/1380820797261746317/1380852501762281603/vorrak_watermarked.gif?ex=68815edb&is=68800d5b&hm=1e97500ac30ea13a9b225e45c5bf957f3c8604f07a1d170f185c17df4ee766b2&='
    }
  ];

  const stats = [
    { icon: Star, label: 'Happy Clients', value: '7+' },
    { icon: Users, label: 'Commissions Done', value: '15+' },
    { icon: Clock, label: 'Average Completion', value: '2 Days' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
              Hope's Services
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Custom Discord art made with care
            </p>
            <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
              Professional Discord banners, logos, and icons crafted to make your server stand out. 
              Quick turnaround, affordable pricing, and personalized service.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/commission"
                className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center group"
              >
                Request a Commission
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/gallery"
                className="bg-pink-200 text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-300 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                See My Work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-pink-50 hover:bg-pink-100 transition-colors duration-200">
                <div className="bg-black p-3 rounded-full w-fit mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-pink-200" />
                </div>
                <div className="text-3xl font-bold text-black mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Featured Artwork</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Take a look at some of my recent commissions and see the quality you can expect
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredWorks.map((work) => (
              <div
                key={work.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-black mb-2">{work.title}</h3>
                  <span className="inline-block bg-pink-200 text-black px-3 py-1 rounded-full text-sm font-medium">
                    {work.type}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/gallery"
              className="inline-flex items-center text-black hover:text-pink-600 font-semibold text-lg group"
            >
              View Full Gallery
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Transform your Discord server with custom artwork that reflects your community's personality
          </p>
          <Link
            to="/commission"
            className="bg-pink-200 text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-pink-300 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center group"
          >
            Start Your Commission
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;