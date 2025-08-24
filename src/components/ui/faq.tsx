import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const faqs = [
  {
    question: "What is CGPA and how is it different from percentage?",
    answer: "CGPA (Cumulative Grade Point Average) is a grading system used by educational institutions to evaluate student performance. It's calculated on a scale (usually 4.0, 5.0, or 10.0), while percentage is calculated out of 100. CGPA provides a more standardized way to compare academic performance across different subjects and institutions."
  },
  {
    question: "How do I convert CGPA to percentage?",
    answer: "The conversion formula varies by university. Common formulas include: VTU: (CGPA - 0.75) × 10, Mumbai University: CGPA × 9.5, Anna University: (CGPA - 0.4) × 10. Our calculator includes 50+ university-specific formulas for accurate conversions."
  },
  {
    question: "What grading scales are supported?",
    answer: "We support multiple grading scales: 10.0 scale (O, A+, A, B+, B, C+, C, D, F), 4.0 scale (A, A-, B+, B, B-, C+, C, C-, D, F), and 5.0 scale (A, B, C, D, E, F). Each scale has corresponding grade points for accurate CGPA calculations."
  },
  {
    question: "How is CGPA calculated from individual grades?",
    answer: "CGPA = (Sum of Grade Points × Credits) ÷ Total Credits. For example, if you have Grade A (8 points) in a 3-credit subject and Grade B (6 points) in a 4-credit subject: CGPA = (8×3 + 6×4) ÷ (3+4) = 48÷7 = 6.86"
  },
  {
    question: "What is the difference between GPA and CGPA?",
    answer: "GPA (Grade Point Average) typically refers to grades for a specific term/semester, while CGPA (Cumulative Grade Point Average) is the overall average across all semesters. CGPA gives a complete picture of academic performance throughout the entire course."
  },
  {
    question: "How accurate are the grade predictions?",
    answer: "Our grade predictor uses statistical analysis based on your current performance, target goals, and subject difficulty levels. While predictions are estimates, they provide valuable insights for academic planning. Actual results may vary based on exam performance and other factors."
  },
  {
    question: "Can I save my calculation history?",
    answer: "Yes! All your calculations are automatically saved in the History section. You can view, search, and export your calculation history to CSV format. This helps track your academic progress over time."
  },
  {
    question: "Which universities' conversion formulas are included?",
    answer: "We support 50+ universities including VTU, Mumbai University, Anna University, MAKAUT, BITS Pilani, BHU, Delhi University, Pune University, Osmania University, and many more. Each university has its specific conversion formula for accurate results."
  },
  {
    question: "Is this calculator free to use?",
    answer: "Yes, GradeCalc Pro is completely free to use. All features including CGPA conversion, grade calculation, GPA calculation, grade prediction, and calculation history are available without any charges."
  },
  {
    question: "How do I use the Grade Predictor?",
    answer: "Enter your current semester grades, set your target CGPA, specify remaining semesters, and adjust difficulty levels. The predictor will calculate required grades for each remaining semester and provide a detailed breakdown with actionable insights."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gradient mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about CGPA calculations, grade conversions, and our platform features.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="card-calculator">
              <CardHeader 
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3 text-left">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    {faq.question}
                  </CardTitle>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground" />
                  )}
                </div>
              </CardHeader>
              
              {openIndex === index && (
                <CardContent className="pt-0">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Card className="card-calculator max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Still have questions?</CardTitle>
              <CardDescription>
                Can't find the answer you're looking for? Our platform is designed to be intuitive and comprehensive for all your academic calculation needs.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}