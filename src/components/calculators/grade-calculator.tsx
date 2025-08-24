import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Minus, Calculator, BookOpen } from "lucide-react";

interface Subject {
  id: string;
  name: string;
  grade: string;
  credits: number;
}

interface GradeCalculatorProps {
  onAddToHistory: (result: any) => void;
}

export function GradeCalculator({ onAddToHistory }: GradeCalculatorProps) {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: "1", name: "Subject 1", grade: "", credits: 3 },
    { id: "2", name: "Subject 2", grade: "", credits: 3 },
    { id: "3", name: "Subject 3", grade: "", credits: 3 },
    { id: "4", name: "Subject 4", grade: "", credits: 3 },
  ]);
  
  const [gradingScale, setGradingScale] = useState("10");
  const [cgpaResult, setCgpaResult] = useState<number | null>(null);
  const [totalCredits, setTotalCredits] = useState<number>(0);

  const gradePoints = {
    "10": {
      "O": 10, "A+": 9, "A": 8, "B+": 7, "B": 6, "C+": 5, "C": 4, "D": 3, "F": 0
    },
    "4": {
      "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7, "C+": 2.3, "C": 2.0, "C-": 1.7, "D": 1.0, "F": 0.0
    },
    "5": {
      "A": 5.0, "B": 4.0, "C": 3.0, "D": 2.0, "E": 1.0, "F": 0.0
    }
  };

  const addSubject = () => {
    const newSubject: Subject = {
      id: Date.now().toString(),
      name: `Subject ${subjects.length + 1}`,
      grade: "",
      credits: 3
    };
    setSubjects([...subjects, newSubject]);
  };

  const removeSubject = (id: string) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter(subject => subject.id !== id));
    }
  };

  const updateSubject = (id: string, field: keyof Subject, value: string | number) => {
    setSubjects(subjects.map(subject => 
      subject.id === id ? { ...subject, [field]: value } : subject
    ));
  };

  const calculateCGPA = () => {
    const scale = gradingScale as keyof typeof gradePoints;
    const gradePointsMap = gradePoints[scale];
    
    let totalPoints = 0;
    let totalCreditsSum = 0;
    
    subjects.forEach(subject => {
      if (subject.grade && subject.credits > 0) {
        const points = gradePointsMap[subject.grade as keyof typeof gradePointsMap];
        if (points !== undefined) {
          totalPoints += points * subject.credits;
          totalCreditsSum += subject.credits;
        }
      }
    });
    
    if (totalCreditsSum > 0) {
      const calculatedCGPA = totalPoints / totalCreditsSum;
      setCgpaResult(calculatedCGPA);
      setTotalCredits(totalCreditsSum);
      
      onAddToHistory({
        type: "grade-calculation",
        subjects: subjects.filter(s => s.grade),
        cgpa: calculatedCGPA,
        scale: gradingScale,
        totalCredits: totalCreditsSum,
        timestamp: new Date()
      });
    }
  };

  const reset = () => {
    setSubjects(subjects.map(subject => ({ ...subject, grade: "" })));
    setCgpaResult(null);
    setTotalCredits(0);
  };

  const getGradeOptions = () => {
    const scale = gradingScale as keyof typeof gradePoints;
    return Object.keys(gradePoints[scale]);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gradient mb-2">Grade Calculator</h2>
        <p className="text-muted-foreground">Calculate your CGPA from individual subject grades and credits</p>
      </div>

      <Card className="card-calculator">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Subject-wise Grade Calculator
          </CardTitle>
          <CardDescription>
            Enter your subject grades and credits to calculate overall CGPA
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Grading Scale</Label>
            <Select value={gradingScale} onValueChange={setGradingScale}>
              <SelectTrigger className="input-enhanced max-w-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10.0 Scale (O, A+, A, B+, B, C+, C, D, F)</SelectItem>
                <SelectItem value="4">4.0 Scale (A, A-, B+, B, B-, C+, C, C-, D, F)</SelectItem>
                <SelectItem value="5">5.0 Scale (A, B, C, D, E, F)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Subjects</h3>
              <Button onClick={addSubject} variant="outline" size="sm" className="btn-outline-glow">
                <Plus className="h-4 w-4 mr-2" />
                Add Subject
              </Button>
            </div>

            {subjects.map((subject, index) => (
              <div key={subject.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-border rounded-lg bg-muted/30">
                <div className="space-y-2">
                  <Label>Subject Name</Label>
                  <Input
                    value={subject.name}
                    onChange={(e) => updateSubject(subject.id, "name", e.target.value)}
                    className="input-enhanced"
                    placeholder="Subject name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Grade</Label>
                  <Select
                    value={subject.grade}
                    onValueChange={(value) => updateSubject(subject.id, "grade", value)}
                  >
                    <SelectTrigger className="input-enhanced">
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {getGradeOptions().map(grade => (
                        <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Credits</Label>
                  <Input
                    type="number"
                    value={subject.credits}
                    onChange={(e) => updateSubject(subject.id, "credits", parseInt(e.target.value) || 0)}
                    className="input-enhanced"
                    min="0"
                    max="10"
                  />
                </div>
                
                <div className="flex items-end">
                  <Button
                    onClick={() => removeSubject(subject.id)}
                    variant="outline"
                    size="sm"
                    disabled={subjects.length <= 1}
                    className="w-full"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Button onClick={calculateCGPA} className="btn-calculator flex-1">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate CGPA
            </Button>
            <Button onClick={reset} variant="outline" className="btn-outline-glow">
              Reset
            </Button>
          </div>

          {cgpaResult !== null && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gradient-primary rounded-lg p-6 text-center">
                <div className="text-white text-3xl font-bold mb-2">
                  {cgpaResult.toFixed(2)}
                </div>
                <div className="text-white/80">
                  Overall CGPA
                </div>
              </div>
              
              <div className="bg-gradient-secondary rounded-lg p-6 text-center">
                <div className="text-white text-3xl font-bold mb-2">
                  {totalCredits}
                </div>
                <div className="text-white/80">
                  Total Credits
                </div>
              </div>
            </div>
          )}

          {cgpaResult !== null && (
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-semibold mb-3">Grade Breakdown</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                {subjects.filter(s => s.grade).map(subject => {
                  const scale = gradingScale as keyof typeof gradePoints;
                  const points = gradePoints[scale][subject.grade as keyof typeof gradePoints[typeof scale]];
                  return (
                    <div key={subject.id} className="flex justify-between">
                      <span>{subject.name}: {subject.grade}</span>
                      <span>{points} × {subject.credits} = {(points * subject.credits).toFixed(1)}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}