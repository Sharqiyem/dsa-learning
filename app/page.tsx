'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { StackVisualizer } from '@/components/Visualizer/StackVisualizer';
import { CoreOperations } from '@/components/Operations/CoreOperations';
import { RealWorldSimulators } from '@/components/Applications/RealWorldSimulators';
import { PythonCodeExplorer } from '@/components/CodeExplorer/PythonCodeExplorer';
import { StepByStepDocs } from '@/components/Documentation/StepByStepDocs';
import { ExercisesSection } from '@/components/Exercises/ExercisesSection';
import { Footer } from '@/components/Footer';

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<string>('visualizer');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['visualizer', 'operations', 'applications', 'python-code', 'documentation', 'exercises'];
      const scrollPosition = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* 3-Zone Top Bar Navigation */}
      <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onExplore={scrollToSection} />

        {/* 1. Core Visualizer Sandbox (Animated Push / Pop / Peek) */}
        <StackVisualizer />

        {/* 2. Abstract Data Type (ADT) Fundamental Operations */}
        <CoreOperations />

        {/* 3. Real-World Applications Simulator */}
        <RealWorldSimulators />

        {/* 4. Python Implementation & Line-by-Line Memory Logic */}
        <PythonCodeExplorer />

        {/* 5. Complete Step-by-Step Educational Documentation */}
        <StepByStepDocs />

        {/* 6. Extensive Interactive Exercises with Hidden Answers */}
        <ExercisesSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
