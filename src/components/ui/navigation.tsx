import { Calculator, GraduationCap, TrendingUp, History, BookOpen } from "lucide-react";
import { Button } from "./button";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const navItems = [
    { id: "cgpa-converter", label: "CGPA Converter", icon: Calculator },
    { id: "grade-calculator", label: "Grade Calculator", icon: GraduationCap },
    { id: "gpa-calculator", label: "GPA Calculator", icon: TrendingUp },
    { id: "grade-predictor", label: "Grade Predictor", icon: BookOpen },
    { id: "history", label: "History", icon: History },
  ];

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-gradient">GradeCalc Pro</span>
          </div>
          
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onSectionChange(item.id)}
                  className={`flex items-center space-x-2 ${
                    activeSection === item.id 
                      ? "bg-gradient-primary text-white shadow-md" 
                      : "hover:bg-muted"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              );
            })}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <Calculator className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}