import Link from 'next/link';
import TeamMember from '../../components/about/TeamMember';
import MissionStatement from '../../components/about/MissionStatement';
import Timeline from '../../components/about/Timeline';
import Stats from '../../components/about/Stats';
import Testimonial from '../../components/about/Testimonial';
import Layout from '../../components/layout/Layout';

export default function AboutPage() {
  // Team members data
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      bio: "Blockchain enthusiast with 8+ years in DeFi and gaming. Previously led product at a major crypto exchange.",
      imageSrc: "/images/team/alex.jpg",
      socialLinks: {
        twitter: "https://twitter.com/alexjohnson",
        linkedin: "https://linkedin.com/in/alexjohnson",
        github: "https://github.com/alexjohnson"
      }
    },
    {
      name: "Sophia Chen",
      role: "CTO",
      bio: "Solana developer since 2020. Contributed to multiple Solana ecosystem projects and passionate about blockchain education.",
      imageSrc: "/images/team/sophia.jpg",
      socialLinks: {
        twitter: "https://twitter.com/sophiachen",
        github: "https://github.com/sophiachen"
      }
    },
    {
      name: "Marcus Williams",
      role: "Lead Designer",
      bio: "Award-winning UI/UX designer specialized in creating engaging experiences for Web3 applications.",
      imageSrc: "/images/team/marcus.jpg",
      socialLinks: {
        twitter: "https://twitter.com/marcuswilliams",
        linkedin: "https://linkedin.com/in/marcuswilliams"
      }
    },
    {
      name: "Elena Rodriguez",
      role: "Community Manager",
      bio: "Community builder with experience growing several successful DAOs and NFT communities.",
      imageSrc: "/images/team/elena.jpg",
      socialLinks: {
        twitter: "https://twitter.com/elenarodriguez"
      }
    }
  ];

  // Company values data
  const companyValues = {
    title: "Our Mission & Values",
    description: "We're on a mission to make blockchain education fun, accessible, and rewarding for everyone.",
    values: [
      {
        icon: "",
        title: "Innovation",
        description: "We constantly push the boundaries of what's possible in blockchain education and gamification."
      },
      {
        icon: "",
        title: "Security",
        description: "We prioritize the security of our users' assets and data above all else."
      },
      {
        icon: "",
        title: "Accessibility",
        description: "We believe blockchain knowledge should be accessible to everyone, regardless of technical background."
      }
    ]
  };

  // Timeline events data
  const timelineEvents = [
    {
      year: "2023",
      title: "SolanaFlow Founded",
      description: "Our journey began with a simple idea: make learning about blockchain fun and rewarding."
    },
    {
      year: "2023",
      title: "Seed Funding",
      description: "Secured $1.5M in seed funding from leading crypto VCs to build our platform."
    },
    {
      year: "2024",
      title: "Beta Launch",
      description: "Released our beta platform to 500 early users who helped shape our product."
    },
    {
      year: "2025",
      title: "Public Launch",
      description: "Officially launched SolanaFlow to the public with our innovative quiz-to-earn model."
    }
  ];

  // Stats data
  const statsData = [
    {
      value: 25000,
      label: "Active Users",
      prefix: "",
      suffix: "+"
    },
    {
      value: 100000,
      label: "Quizzes Completed",
      prefix: "",
      suffix: "+"
    },
    {
      value: 50000,
      label: "SOL Distributed",
      prefix: "",
      suffix: ""
    },
    {
      value: 95,
      label: "User Satisfaction",
      prefix: "",
      suffix: "%"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      quote: "SolanaFlow completely changed how I learn about blockchain. The quiz format makes it fun, and earning SOL while learning is a game-changer!",
      author: "David K.",
      role: "Software Developer",
      imageSrc: "/images/testimonials/david.jpg"
    },
    {
      quote: "As someone new to crypto, this platform made it easy to understand complex concepts through interactive quizzes. Highly recommend!",
      author: "Sarah M.",
      role: "Marketing Professional",
      imageSrc: "/images/testimonials/sarah.jpg"
    },
    {
      quote: "The competitive aspect keeps me coming back. I've learned more about Solana in a month of quizzes than I did in a year of reading articles.",
      author: "Michael T.",
      role: "Crypto Enthusiast",
      imageSrc: "/images/testimonials/michael.jpg"
    }
  ];

  return (
    <Layout activePage="about">
      {/* Header */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-purple-900/30 to-indigo-900/30">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-green-300 bg-clip-text text-transparent">
              About SolanaFlow
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We're building the future of blockchain education through gamified learning and rewards
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <MissionStatement 
            title="Empowering Blockchain Education Through Gamification"
            content="At SolanaQuiz, we believe that education should be engaging, accessible, and rewarding. Our mission is to demystify blockchain technology and make learning about Solana fun and interactive. We&apos;re committed to creating a platform where curiosity is rewarded and knowledge is valued."
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900/20 to-indigo-900/20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-purple-400 to-green-300 bg-clip-text text-transparent">
              Our Impact
            </span>
          </h2>
          <Stats stats={statsData} />
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-purple-400 to-green-300 bg-clip-text text-transparent">
              Our Journey
            </span>
          </h2>
          <Timeline events={timelineEvents} />
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900/20 to-indigo-900/20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-purple-400 to-green-300 bg-clip-text text-transparent">
              Meet Our Team
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember 
                key={index}
                name={member.name}
                role={member.role}
                bio={member.bio}
                imageSrc={member.imageSrc}
                socialLinks={member.socialLinks}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-purple-400 to-green-300 bg-clip-text text-transparent">
              What Our Users Say
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Testimonial 
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                imageSrc={testimonial.imageSrc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900/30 to-indigo-900/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 to-green-300 bg-clip-text text-transparent">
              Ready to Start Learning and Earning?
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Join thousands of users who are already learning about blockchain while earning SOL tokens.
          </p>
          <Link 
            href="/quiz" 
            className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105"
          >
            Try a Quiz Now
          </Link>
        </div>
      </section>
    </Layout>
  );
}
