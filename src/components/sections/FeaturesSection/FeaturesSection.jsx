import React from 'react';
import { Shield, Zap, Users } from 'lucide-react';
import { Card } from '../../ui';

const features = [
  {
    icon: Shield,
    title: 'Safe & Legal',
    description: 'All pranks are harmless and comply with regulations. No harassment, just fun!'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Set up your prank in seconds. AI-powered voices respond instantly.'
  },
  {
    icon: Users,
    title: 'Community Loved',
    description: 'Join thousands of pranksters sharing epic moments and creative ideas.'
  }
];

export const FeaturesSection = () => {
  return (
    <section className="px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-4xl font-bold text-white text-center mb-12">
          Why Choose Prankie?
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} variant="feature" className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold text-white mb-4">{feature.title}</h4>
              <p className="text-white/80 leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};