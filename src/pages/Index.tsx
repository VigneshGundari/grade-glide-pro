import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { HeroSection } from "@/components/ui/hero-section";
import { CGPAConverter } from "@/components/calculators/cgpa-converter";
import { GradeCalculator } from "@/components/calculators/grade-calculator";
import { GPACalculator } from "@/components/calculators/gpa-calculator";
import { GradePredictor } from "@/components/calculators/grade-predictor";
import { CalculationHistory } from "@/components/calculators/calculation-history";
import { FAQ } from "@/components/ui/faq";

const Index = () => {
  const [activeSection, setActiveSection] = useState("hero");
  const [calculationHistory, setCalculationHistory] = useState<any[]>([]);

  const addToHistory = (result: any) => {
    setCalculationHistory(prev => [result, ...prev].slice(0, 50)); // Keep last 50 calculations
  };

  const clearHistory = () => {
    setCalculationHistory([]);
  };

  const handleGetStarted = () => {
    setActiveSection("cgpa-converter");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "cgpa-converter":
        return <CGPAConverter onAddToHistory={addToHistory} />;
      case "grade-calculator":
        return <GradeCalculator onAddToHistory={addToHistory} />;
      case "gpa-calculator":
        return <GPACalculator onAddToHistory={addToHistory} />;
      case "grade-predictor":
        return <GradePredictor onAddToHistory={addToHistory} />;
      case "history":
        return <CalculationHistory history={calculationHistory} onClearHistory={clearHistory} />;
      default:
        return <HeroSection onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {activeSection !== "hero" && (
        <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />
      )}
      
      <main className={activeSection === "hero" ? "" : "container mx-auto px-4 py-8"}>
        {renderContent()}
      </main>
      
      {activeSection === "hero" && <FAQ />}
      
      {activeSection === "hero" && (
        <footer className="bg-muted/30 border-t border-border py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground">
              © 2024 GradeCalc Pro. Empowering students with accurate grade calculations.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Index;
