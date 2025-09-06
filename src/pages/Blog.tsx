import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, BookOpen, TrendingUp, Calculator } from "lucide-react";
import { BlogPost } from "@/components/ui/blog-post";
import { Link } from "react-router-dom";
import { ArrowLeft, GraduationCap } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Ultimate Guide to CGPA to Percentage Conversion",
    excerpt: "Learn how different universities calculate percentage from CGPA, including VTU, Mumbai University, and other major institutions with detailed formulas and examples.",
    content: `Understanding how to convert CGPA to percentage is crucial for students applying to higher education or jobs. Different universities use different formulas, and it's important to know which one applies to your institution.

## What is CGPA?

CGPA (Cumulative Grade Point Average) is a measure of a student's overall academic performance across all semesters. It's calculated by taking the weighted average of all course grades, considering the credit hours of each course.

## Standard Formula

The most common formula used across Indian universities is:

**Percentage = CGPA × 9.5**

This formula is widely accepted and used by most universities across India. For example, if your CGPA is 8.5, your percentage would be 8.5 × 9.5 = 80.75%.

## University-Specific Formulas

### Mumbai University
Mumbai University uses the standard formula: **Percentage = CGPA × 9.5**

This makes it easy for Mumbai University students to convert their grades for job applications and higher education.

### VTU (Visvesvaraya Technological University)
VTU uses a direct multiplication: **Percentage = CGPA × 10**

This means VTU students typically get higher percentage equivalents compared to other universities.

### Anna University
Anna University follows: **Percentage = CGPA × 10**

Similar to VTU, Anna University students benefit from this higher conversion rate.

### MAKAUT (Maulana Abul Kalam Azad University of Technology)
MAKAUT uses: **Percentage = (CGPA × 9) + 4**

This unique formula gives MAKAUT students an additional 4% boost in their converted percentage.

### BITS Pilani
BITS Pilani uses: **Percentage = CGPA × 10**

Known for its rigorous academics, BITS uses the 10x multiplier for conversions.

## Why Different Formulas Exist

Universities develop their own conversion formulas based on several factors:

- **Historical grading patterns**: Each university has different standards for awarding grades
- **Industry requirements**: Some universities align with specific industry expectations  
- **Academic standards**: The difficulty level of curriculum affects conversion ratios
- **Regional preferences**: Local industry and educational norms influence formulas

## 4.0 and 5.0 Scale Conversions

For international applications, you might need to convert to 4.0 or 5.0 scales:

**10.0 to 4.0 Scale:** GPA = (CGPA ÷ 10) × 4
**10.0 to 5.0 Scale:** GPA = (CGPA ÷ 10) × 5

## Tips for Accurate Conversion

1. **Always check your university's official conversion formula** - This is the most reliable source
2. **Use our calculator for accurate results** - Avoid manual calculation errors
3. **Keep official transcripts for verification** - Some employers may request official documents
4. **Understand that some employers may have their own conversion methods** - Be prepared to explain your university's system

## Common Mistakes to Avoid

- **Using wrong university formula**: Always verify which formula applies to your institution
- **Rounding errors**: Be precise with decimal calculations
- **Mixing scales**: Don't confuse 4.0, 5.0, and 10.0 scale conversions
- **Outdated formulas**: Universities sometimes update their conversion methods

## Real-World Applications

CGPA to percentage conversion is essential for:

- **Job applications**: Most companies in India ask for percentage
- **Higher education**: Many universities require percentage for admission
- **Scholarship applications**: Merit-based scholarships often use percentage criteria
- **Government job applications**: Most government positions require percentage format

Using our CGPA to Percentage converter ensures you get accurate results based on your specific university's formula, helping you make informed decisions about your academic and career planning.`,
    author: "Academic Team",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Education",
    tags: ["CGPA", "Percentage", "Conversion", "University", "Academic"]
  },
  {
    id: 2,
    title: "Understanding Different Grading Scales: 4.0, 5.0, and 10.0",
    excerpt: "A comprehensive breakdown of various grading scales used in educational institutions worldwide and how to convert between them effectively.",
    content: `Educational institutions worldwide use different grading scales to evaluate student performance. Understanding these scales is essential for academic planning, international applications, and career decisions.

## The 10.0 Scale System

Most Indian universities use the 10.0 scale system, which is considered one of the most granular and precise grading methods.

### Grade Point Distribution (10.0 Scale)
- **10.0**: Outstanding (90-100%) - Exceptional performance
- **9.0-9.9**: Excellent (80-89%) - Superior achievement  
- **8.0-8.9**: Very Good (70-79%) - Above average performance
- **7.0-7.9**: Good (60-69%) - Satisfactory achievement
- **6.0-6.9**: Above Average (50-59%) - Acceptable performance
- **5.0-5.9**: Average (40-49%) - Minimum passing grade

### Benefits of 10.0 Scale
- **Higher precision**: More granular evaluation of student performance
- **Better differentiation**: Easier to distinguish between different performance levels
- **Industry preference**: Most Indian companies are familiar with this scale

## The 4.0 Scale System

Predominantly used in North American universities (USA and Canada), the 4.0 scale is the global standard for international education.

### Grade Point Distribution (4.0 Scale)
- **4.0**: A (90-100%) - Excellent
- **3.7**: A- (87-89%) - Very Good
- **3.3**: B+ (83-86%) - Good Plus
- **3.0**: B (80-82%) - Good
- **2.7**: B- (77-79%) - Good Minus
- **2.3**: C+ (73-76%) - Above Average
- **2.0**: C (70-72%) - Average
- **1.7**: C- (67-69%) - Below Average
- **1.0**: D (60-66%) - Poor
- **0.0**: F (Below 60%) - Fail

### Why 4.0 Scale Matters
- **International recognition**: Required for studying abroad
- **Scholarship applications**: Many international scholarships use 4.0 scale
- **Graduate school admissions**: Essential for PhD and Master's applications

## The 5.0 Scale System

Less common but used by some institutions, particularly in European countries and select universities.

### Grade Point Distribution (5.0 Scale)
- **5.0**: Excellent (90-100%)
- **4.0**: Good (80-89%)
- **3.0**: Satisfactory (70-79%)
- **2.0**: Acceptable (60-69%)
- **1.0**: Insufficient (Below 60%)

## Conversion Between Scales

### 10.0 to 4.0 Scale Conversion

**Method 1 (Linear):** 4.0 GPA = (CGPA ÷ 10) × 4

**Method 2 (WES Standard):** More complex but widely accepted
- 10.0 = 4.0
- 9.0-9.9 = 3.7-4.0
- 8.0-8.9 = 3.3-3.6
- 7.0-7.9 = 3.0-3.2
- 6.0-6.9 = 2.3-2.9

### 10.0 to 5.0 Scale Conversion
**Formula:** 5.0 GPA = (CGPA ÷ 10) × 5

### 4.0 to 10.0 Scale Conversion
**Formula:** 10.0 CGPA = (GPA ÷ 4) × 10

## Global Recognition and Standards

### United States
- Standard 4.0 scale used in all universities
- Some institutions use 4.3 scale (A+ = 4.3)
- Graduate schools typically require minimum 3.0 GPA

### Canada  
- Uses 4.0 scale similar to US
- Some provinces use percentage alongside GPA
- Conversion varies by province and institution

### United Kingdom
- Uses classification system (First Class, Upper Second, etc.)
- Percentage system for individual modules
- Different from both Indian and US systems

### Australia
- Grade Point Average (GPA) on 7.0 scale
- High Distinction, Distinction, Credit, Pass system
- Conversion formulas available for international students

## Benefits of Understanding Grading Scales

### Academic Planning
- **Realistic goal setting**: Understand what grades you need for target GPA
- **Course selection**: Choose courses that align with your GPA goals
- **Semester planning**: Balance difficult and easier courses

### Career Applications  
- **Job applications**: Employers often require GPA conversions
- **Professional programs**: Medical, law, and MBA programs have GPA requirements
- **Government positions**: Many require specific GPA thresholds

### International Opportunities
- **Study abroad**: Essential for exchange programs and foreign universities
- **Scholarships**: Merit-based awards often specify GPA requirements
- **Research programs**: PhD and research positions require GPA conversions

## Common Conversion Challenges

### Grade Inflation Differences
Different institutions have varying standards for awarding grades, making direct conversions challenging.

### Credit Hour Variations
Some universities use different credit systems, affecting GPA calculations.

### Rounding Policies
Institutions have different policies for rounding GPAs, leading to minor variations.

## Best Practices for GPA Conversion

1. **Use official conversion tables** when available from your institution
2. **Consult with academic advisors** for guidance on international applications
3. **Keep detailed transcripts** showing both grades and credit hours
4. **Use multiple conversion methods** to cross-verify results
5. **Understand the target institution's requirements** before converting

## Using Our Grade Calculator Tools

Our comprehensive grade calculator suite helps you:

- **Convert between any grading scales** with university-specific formulas
- **Plan target grades** for desired GPA outcomes  
- **Track progress** across multiple semesters
- **Prepare for international applications** with accurate conversions

Start using our grade calculator today to master your academic planning and achieve your educational goals!`,
    author: "Education Experts",
    date: "2024-01-10",
    readTime: "10 min read",
    category: "Academic",
    tags: ["GPA", "Grading", "Scale", "Conversion", "International"]
  },
  {
    id: 3,
    title: "Grade Prediction Strategies for Academic Success",
    excerpt: "Master the art of predicting your final grades and planning your studies strategically to achieve your target CGPA with proven methods.",
    content: `Predicting your grades helps you plan your studies strategically and achieve your target CGPA. This comprehensive guide will teach you professional techniques used by academic advisors and successful students.

## What is Grade Prediction?

Grade prediction is the systematic process of estimating your final course grades based on current performance, upcoming assessments, and historical data. It involves analyzing multiple factors to forecast academic outcomes accurately.

## Why Grade Prediction Matters

### Academic Planning
- **Resource allocation**: Focus more time on subjects where you need improvement
- **Stress management**: Reduce anxiety by having clear expectations
- **Goal setting**: Set realistic and achievable academic targets

### Career Preparation  
- **GPA targets**: Ensure you meet requirements for desired career paths
- **Scholarship maintenance**: Keep grades above scholarship thresholds
- **Graduate school preparation**: Plan for competitive program requirements

## Key Factors Affecting Grade Predictions

### Assessment Weightage Structure

Understanding how your final grade is calculated is crucial for accurate predictions.

**Typical University Weightage:**
- **Internal Assessments**: 20-30% (Assignments, quizzes, presentations)
- **Mid-term Exams**: 20-30% (Major examinations during semester)  
- **Final Exams**: 40-60% (End-of-semester comprehensive exams)
- **Projects/Practical**: 10-20% (Laboratory work, major projects)

### Subject Difficulty Analysis

Different subjects have varying difficulty levels that affect grade predictions:

**Core vs Elective Subjects:**
- Core subjects often have stricter grading standards
- Electives may offer more flexibility in assessment
- Consider your strengths when choosing electives

**Theoretical vs Practical Subjects:**
- Practical subjects may have different grading criteria
- Laboratory components often have different assessment patterns
- Project-based courses may have subjective evaluation elements

## Professional Prediction Strategies

### 1. Historical Performance Analysis

**Step-by-step process:**

**Analyze Past Semesters:**
- Calculate your average performance in similar subjects
- Identify patterns in your academic performance
- Note improvement or decline trends over time

**Subject-wise Analysis:**
- Mathematics/Technical subjects: Often require consistent practice
- Language/Literature: May depend on writing and analytical skills
- Science subjects: Balance of theoretical understanding and practical application

### 2. Current Performance Tracking

**Create a Performance Dashboard:**

**Weekly Tracking:**
- Record all assignment scores immediately
- Note attendance percentage for each subject
- Track quiz and test performances
- Monitor participation grades

**Monthly Reviews:**
- Calculate running averages for each subject
- Compare with target grades
- Identify subjects needing immediate attention
- Adjust study schedules based on performance

### 3. Advanced Prediction Techniques

**Weighted Average Method:**

For each subject, calculate: 
**(Current Score × Weight) + (Predicted Score × Remaining Weight) = Final Grade**

**Example Calculation:**
- Subject: Data Structures (Target: 85%)
- Internal Assessments (30%): Current score 80%
- Mid-term (30%): Scored 85%  
- Final Exam (40%): Need to score ?

**(80 × 0.30) + (85 × 0.30) + (X × 0.40) = 85**
**24 + 25.5 + 0.4X = 85**
**0.4X = 35.5**
**X = 88.75%**

You need 89% in the final exam to achieve your target.

## Using Our Grade Predictor Tool

Our advanced grade predictor helps you:

**Accurate Calculations:** 
- Input current grades and weightages
- Calculate required scores for target grades
- Handle complex grading schemes automatically

**Scenario Planning:**
- Test different "what-if" scenarios
- Plan for best and worst-case outcomes
- Optimize study time allocation

**Progress Tracking:**
- Monitor improvement over time
- Identify trends and patterns
- Receive automated recommendations

Start using our grade prediction tool today to master your academic planning and achieve your educational goals!`,
    author: "Study Success Team",
    date: "2024-01-05",
    readTime: "12 min read",
    category: "Strategy",
    tags: ["Prediction", "Study", "Planning", "Academic", "Success"]
  }
];

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
        <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/80">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link to="/" className="flex items-center space-x-2">
                <GraduationCap className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-gradient">GradeCalc Pro</span>
              </Link>
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Tools
                </Button>
              </Link>
            </div>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-8">
          <BlogPost post={selectedPost} onBack={() => setSelectedPost(null)} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/80">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-gradient">GradeCalc Pro</span>
            </Link>
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Tools
              </Button>
            </Link>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <BookOpen className="h-6 w-6" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gradient">
              Academic Blog
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Expert insights, practical tips, and comprehensive guides to help you excel in your academic journey. 
            From grade calculations to study strategies, we've got you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {blogPosts.map((post) => (
            <Card 
              key={post.id} 
              className="card-hover group cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    {post.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </div>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="group-hover:text-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPost(post);
                    }}
                  >
                    Read More
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="inline-block p-8 border-dashed">
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 rounded-full bg-muted/50">
                <TrendingUp className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">More Content Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  We're constantly working on new articles and guides to help you succeed academically.
                </p>
                <Badge variant="outline" className="px-4 py-1">
                  <Calculator className="h-3 w-3 mr-1" />
                  Grade Tools Available Now
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}