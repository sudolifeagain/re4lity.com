import React, { useState, useEffect, Suspense } from 'react';
import { Code, Shield, Cpu } from 'lucide-react';
import Loading from './components/Loading';
import Terminal from './components/Terminal';
import CyberBackground from './components/CyberBackground';
const Section = React.lazy(() => import('./components/Section'));
const Footer = React.lazy(() => import('./components/Footer'));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-black text-green-500 min-h-screen">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 min-w-full min-h-full object-cover opacity-30 z-0"
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-binary-code-running-through-a-screen-31559-large.mp4"
          type="video/mp4"
        />
      </video>

      {/* Cyberpunk Background Animation */}
      <CyberBackground />

      <div className="relative z-10">
        <Suspense fallback={<Loading />}>
          <Section className="text-center">
            <div className="w-full max-w-4xl mx-auto px-4">
              <Terminal />
            </div>
          </Section>

          <Section>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto p-6">
              <div className="bg-black/50 p-6 rounded-lg border border-green-500">
                <Code className="w-12 h-12 mb-4" />
                <h2 className="text-2xl font-mono mb-4">CODE</h2>
                <p>Advanced programming techniques and system architecture.</p>
              </div>
              <div className="bg-black/50 p-6 rounded-lg border border-green-500">
                <Shield className="w-12 h-12 mb-4" />
                <h2 className="text-2xl font-mono mb-4">SECURITY</h2>
                <p>Implementing robust security measures and protocols.</p>
              </div>
            </div>
          </Section>

          <Section>
            <div className="max-w-4xl mx-auto p-6">
              <Cpu className="w-16 h-16 mb-6 mx-auto" />
              <div className="bg-black/50 p-8 rounded-lg border border-green-500">
                <h2 className="text-3xl font-mono mb-6 text-center">SYSTEM SPECS</h2>
                <div className="space-y-4 font-mono">
                  <p>CPU: Quantum Processing Unit v2.0</p>
                  <p>RAM: 128TB Neural Memory</p>
                  <p>OS: CyberKernel 3.0</p>
                </div>
              </div>
            </div>
          </Section>

          <Footer />
        </Suspense>
      </div>
    </div>
  );
}

export default App;