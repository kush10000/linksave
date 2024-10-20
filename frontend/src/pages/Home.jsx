import { useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { FaGoogle, FaBookmark, FaSearch, FaLock } from 'react-icons/fa';

function Home() {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      console.log('Google login successful:', credentialResponse);
      const token = credentialResponse.access_token;

      if (!token) {
        console.error('No access token found');
        return;
      }

      try {
        const response = await axios.post("http://localhost:3000/auth/google", {
          token: token,
        });

        console.log('Response from server:', response.data);
        // Check if login was successful
        if (response.status === 200) {
          navigate('/links');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    },
    onError: () => {
      console.log('Google login failed');
    }
  });

  function FeatureCard({ icon, title, description }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        {icon}
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">LinkSaver</div>
          <button
            onClick={() => login()}
            className="bg-white text-gray-800 font-bold py-2 px-4 rounded border border-gray-400 hover:bg-gray-100 flex items-center"
          >
            <FaGoogle className="mr-2" /> Login with Google
          </button>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            All-in-one bookmark manager
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Intuitive. Powerful. Runs everywhere.
          </p>
          <button className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 mr-4">
            Get Started
          </button>
          <button className="bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-lg hover:bg-gray-300">
            Learn More
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <FeatureCard
            icon={<FaBookmark className="text-4xl text-blue-600 mb-4" />}
            title="Organize with ease"
            description="Group related bookmarks within the same context. Thousands of predefined icons."
          />
          <FeatureCard
            icon={<FaSearch className="text-4xl text-blue-600 mb-4" />}
            title="Full-text search"
            description="The entire content of every web-page and PDF that you've saved is fully searchable."
          />
          <FeatureCard
            icon={<FaLock className="text-4xl text-blue-600 mb-4" />}
            title="Safe & secure"
            description="SSL everywhere, 100% cloud-based architecture secured behind a VPC. We keep your data safe, never sold."
          />
        </div>
      </main>
    </div>
  );
}

export default Home;
