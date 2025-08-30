import { Calculator, ArrowRight, Star, Users, Award } from "lucide-react";
import { Button } from "./button";

interface HeroSectionProps {
  onGetStarted: () => void;
  onViewFeatures?: () => void;
}

export function HeroSection({ onGetStarted, onViewFeatures }: HeroSectionProps) {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    } else if (onViewFeatures) {
      onViewFeatures();
    }
  };
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgZmlsbC1vcGFjaXR5PSIwLjEiPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjQiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Star className="h-4 w-4 text-yellow-300" />
            <span className="text-sm font-medium">Most Advanced Grade Calculator</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Transform Your
            <span className="block text-transparent bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text">
              Academic Journey
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Calculate CGPA, GPA, percentages, and predict your grades with precision. 
            Support for multiple university systems and grading scales.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              onClick={onGetStarted}
              className="btn-hero"
              size="lg"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Start Calculating
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            
            <Button 
              onClick={scrollToFeatures}
              variant="hero-outline" 
              size="lg"
            >
              View Features
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg backdrop-blur-sm mb-4">
                <Users className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold mb-2">500K+</div>
              <div className="text-white/80">Students Helped</div>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg backdrop-blur-sm mb-4">
                <Award className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold mb-2">50+</div>
              <div className="text-white/80">University Systems</div>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg backdrop-blur-sm mb-4">
                <Calculator className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold mb-2">99.9%</div>
              <div className="text-white/80">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
}