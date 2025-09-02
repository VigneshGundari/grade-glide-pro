import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, BookOpen, TrendingUp, Calculator } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Ultimate Guide to CGPA to Percentage Conversion",
    excerpt: "Learn how different universities calculate percentage from CGPA, including VTU, Mumbai University, and other major institutions.",
    content: `
# Ultimate Guide to CGPA to Percentage Conversion

Understanding how to convert CGPA to percentage is crucial for students applying to higher education or jobs. Different universities use different formulas, and it's important to know which one applies to your institution.

## Standard Formula
The most common formula used is: **Percentage = CGPA × 9.5**

This formula is widely accepted and used by most universities across India.

## University-Specific Formulas

### Mumbai University
Mumbai University uses the standard formula: **Percentage = CGPA × 9.5**

### VTU (Visvesvaraya Technological University)
VTU uses a direct multiplication: **Percentage = CGPA × 10**

### Anna University
Anna University follows: **Percentage = CGPA × 10**

### MAKAUT
MAKAUT uses: **Percentage = (CGPA × 9) + 4**

## Why Different Formulas Exist

Universities develop their own conversion formulas based on:
- Historical grading patterns
- Industry requirements
- Academic standards
- Regional preferences

## Tips for Accurate Conversion

1. Always check your university's official conversion formula
2. Use our calculator for accurate results
3. Keep official transcripts for verification
4. Understand that some employers may have their own conversion methods

Using our CGPA to Percentage converter ensures you get accurate results based on your specific university's formula.
    `,
    author: "Academic Team",
    date: "2024-01-15",
    readTime: "5 min read",
    category: "Education",
    tags: ["CGPA", "Percentage", "Conversion", "University"]
  },
  {
    id: 2,
    title: "Understanding Different Grading Scales: 4.0, 5.0, and 10.0",
    excerpt: "A comprehensive breakdown of various grading scales used in educational institutions worldwide and how to convert between them.",
    content: `
# Understanding Different Grading Scales

Educational institutions worldwide use different grading scales to evaluate student performance. Understanding these scales is essential for academic planning and career decisions.

## The 10.0 Scale System

Most Indian universities use the 10.0 scale where:
- 10.0 = Outstanding (90-100%)
- 9.0-9.9 = Excellent (80-89%)
- 8.0-8.9 = Very Good (70-79%)
- 7.0-7.9 = Good (60-69%)
- 6.0-6.9 = Above Average (50-59%)
- 5.0-5.9 = Average (40-49%)

## The 4.0 Scale System

Commonly used in North American universities:
- 4.0 = A (90-100%)
- 3.0-3.9 = B (80-89%)
- 2.0-2.9 = C (70-79%)
- 1.0-1.9 = D (60-69%)
- 0.0-0.9 = F (Below 60%)

## Conversion Between Scales

### 10.0 to 4.0 Scale
**4.0 GPA = (10.0 CGPA) × 0.4**

### 4.0 to 10.0 Scale
**10.0 CGPA = (4.0 GPA) × 2.5**

## Benefits of Understanding Grading Scales

1. **International Applications**: Essential for studying abroad
2. **Job Applications**: Employers often require GPA conversions
3. **Academic Planning**: Helps set realistic academic goals
4. **Scholarship Applications**: Many scholarships have GPA requirements

Use our grade calculator to easily convert between different scales and plan your academic journey effectively.
    `,
    author: "Education Experts",
    date: "2024-01-10",
    readTime: "4 min read",
    category: "Academic",
    tags: ["GPA", "Grading", "Scale", "Conversion"]
  },
  {
    id: 3,
    title: "Grade Prediction Strategies for Academic Success",
    excerpt: "Learn how to predict your final grades and plan your studies effectively to achieve your target CGPA.",
    content: `
# Grade Prediction Strategies for Academic Success

Predicting your grades helps you plan your studies strategically and achieve your target CGPA. Here's how to make accurate predictions and improve your academic performance.

## Understanding Grade Prediction

Grade prediction involves:
- Analyzing current performance
- Understanding weightage of different assessments
- Calculating required scores for target grades
- Planning study schedules accordingly

## Key Factors Affecting Predictions

### Assessment Weightage
- **Internal Assessments**: Usually 20-30%
- **Mid-term Exams**: 20-30%
- **Final Exams**: 40-60%
- **Projects/Assignments**: 10-20%

### Subject Difficulty
Consider the historical difficulty level of subjects:
- Core subjects vs electives
- Practical vs theoretical subjects
- Professor's grading patterns

## Prediction Strategies

### 1. Historical Analysis
- Review past semester grades
- Identify improvement patterns
- Understand subject-wise strengths

### 2. Current Performance Tracking
- Monitor assignment scores
- Track attendance
- Evaluate quiz performance

### 3. Target Setting
- Set realistic CGPA goals
- Break down semester-wise targets
- Plan subject-wise improvements

## Using Our Grade Predictor

Our grade prediction tool helps you:
- Calculate required scores for target CGPA
- Plan study schedules
- Track progress throughout the semester
- Make informed academic decisions

## Tips for Better Predictions

1. **Be Realistic**: Consider your past performance
2. **Account for Difficulty**: Some subjects are naturally harder
3. **Plan Buffer**: Aim slightly higher than your target
4. **Regular Updates**: Update predictions as you get new scores

Start using our grade predictor today to take control of your academic journey and achieve your goals!
    `,
    author: "Study Strategists",
    date: "2024-01-05",
    readTime: "6 min read",
    category: "Strategy",
    tags: ["Grade Prediction", "Study Planning", "CGPA", "Academic Success"]
  }
];

interface BlogSectionProps {
  onNavigateTo: (section: string) => void;
}

export function BlogSection({ onNavigateTo }: BlogSectionProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-background to-secondary/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gradient mb-4">
            Academic Insights & Guides
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover expert tips, conversion guides, and strategies to excel in your academic journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="card-hover group">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {post.category}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {post.readTime}
                  </div>
                </div>
                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(post.date).toLocaleDateString()}
                  </div>
                  <Button variant="ghost" size="sm" className="group-hover:text-primary">
                    Read More
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {post.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-muted-foreground mb-4">
            <BookOpen className="h-4 w-4" />
            <span>Ready to start calculating?</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Button 
              onClick={() => onNavigateTo('cgpa-converter')}
              className="btn-calculator"
            >
              <Calculator className="h-4 w-4 mr-2" />
              Try CGPA Converter
            </Button>
            <Button 
              onClick={() => onNavigateTo('grade-predictor')}
              variant="outline"
              className="btn-outline-glow"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Grade Predictor
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}