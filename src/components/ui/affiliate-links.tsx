import { ExternalLink, Calculator, BookOpen, Target } from "lucide-react";
import { Card } from "./card";

export function AffiliateLinks() {
  const affiliateLinks = [
    {
      title: "Scientific Calculator Pro",
      description: "Advanced calculator for complex calculations",
      price: "Free Trial",
      link: "https://example.com?ref=YOUR_AFFILIATE_ID",
      icon: Calculator,
      commission: "30%"
    },
    {
      title: "Math Learning Course",
      description: "Master calculus and advanced mathematics",
      price: "$29.99",
      link: "https://udemy.com/course/advanced-math?ref=YOUR_ID",
      icon: BookOpen,
      commission: "20%"
    },
    {
      title: "Grade Tracking Software",
      description: "Professional grade management system",
      price: "$9.99/month",
      link: "https://gradebook.com?affiliate=YOUR_ID",
      icon: Target,
      commission: "50%"
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Recommended Tools</h3>
      {affiliateLinks.map((item, index) => (
        <Card key={index} className="p-4 hover:shadow-md transition-shadow">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <item.icon className="h-5 w-5 text-primary" />
            </div>
            
            <div className="flex-1">
              <h4 className="font-medium">{item.title}</h4>
              <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary">{item.price}</span>
                <a 
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-sm text-primary hover:underline"
                >
                  <span>Learn More</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}