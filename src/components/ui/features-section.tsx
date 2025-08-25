import { Calculator, TrendingUp, BookOpen, History, Users, Zap } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Calculator,
      title: "CGPA ⇔ Percentage Converter",
      description: "Convert between CGPA and percentage with support for 50+ university systems including VTU, Mumbai, MAKAUT, and more."
    },
    {
      icon: BookOpen,
      title: "Grade Calculator",
      description: "Calculate your CGPA from individual subject grades and credits with accurate weighted calculations."
    },
    {
      icon: TrendingUp,
      title: "GPA Calculator",
      description: "Track cumulative GPA, plan target grades, and analyze your academic progress over multiple semesters."
    },
    {
      icon: Zap,
      title: "Smart Grade Predictor",
      description: "AI-powered predictions for future grades based on your current performance and academic trends."
    },
    {
      icon: History,
      title: "Calculation History",
      description: "Save and export all your calculations with searchable history and CSV export functionality."
    },
    {
      icon: Users,
      title: "Multiple Grading Systems",
      description: "Support for 4.0, 5.0, and 10.0 point scales with automatic conversion between different systems."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for
            <span className="text-transparent bg-gradient-primary bg-clip-text ml-2">
              Academic Success
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to calculate, track, and predict your academic grades with precision and ease.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-card border border-border rounded-xl p-6 hover:shadow-soft transition-all duration-300 hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-primary rounded-lg mb-4">
                <feature.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-card-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}