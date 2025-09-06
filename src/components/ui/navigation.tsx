import { Calculator, GraduationCap, TrendingUp, History, BookOpen, FileText, Menu } from "lucide-react";
import { Button } from "./button";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import { useState } from "react";
import { Link } from "react-router-dom";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    { id: "cgpa-converter", label: "CGPA Converter", icon: Calculator },
    { id: "grade-calculator", label: "Grade Calculator", icon: GraduationCap },
    { id: "gpa-calculator", label: "GPA Calculator", icon: TrendingUp },
    { id: "grade-predictor", label: "Grade Predictor", icon: BookOpen },
    { id: "history", label: "History", icon: History },
  ];

  const handleBlogClick = () => {
    // This will be handled by React Router Link
  };

  const handleMobileNavClick = (sectionId: string) => {
    onSectionChange(sectionId);
    setIsOpen(false);
  };

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/80">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            {/* Replace this placeholder with your logo: */}
            {/* <img src="/path-to-your-logo.png" alt="GradeCalc Pro Logo" className="h-8 w-8" /> */}
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
            <Link to="/blog">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2 hover:bg-muted"
              >
                <FileText className="h-4 w-4" />
                <span>Blog</span>
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-2 mt-8">
                  <div className="flex items-center space-x-2 mb-6">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    <span className="text-lg font-bold text-gradient">Menu</span>
                  </div>
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.id}
                        variant={activeSection === item.id ? "default" : "ghost"}
                        className={`flex items-center justify-start space-x-3 w-full h-12 ${
                          activeSection === item.id 
                            ? "bg-gradient-primary text-white shadow-md" 
                            : "hover:bg-muted"
                        }`}
                        onClick={() => handleMobileNavClick(item.id)}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Button>
                    );
                  })}
                  <Link to="/blog" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="ghost"
                      className="flex items-center justify-start space-x-3 w-full h-12 hover:bg-muted"
                    >
                      <FileText className="h-5 w-5" />
                      <span>Blog</span>
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}