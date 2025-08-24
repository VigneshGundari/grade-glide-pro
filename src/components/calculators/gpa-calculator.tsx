import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, TrendingUp, Target } from "lucide-react";

interface Semester {
  id: string;
  name: string;
  gpa: number;
  credits: number;
}

interface GPACalculatorProps {
  onAddToHistory: (result: any) => void;
}

export function GPACalculator({ onAddToHistory }: GPACalculatorProps) {
  const [semesters, setSemesters] = useState<Semester[]>([
    { id: "1", name: "Semester 1", gpa: 0, credits: 20 },
    { id: "2", name: "Semester 2", gpa: 0, credits: 20 },
  ]);
  
  const [cumulativeGPA, setCumulativeGPA] = useState<number | null>(null);
  const [targetGPA, setTargetGPA] = useState("");
  const [currentGPA, setCurrentGPA] = useState("");
  const [currentCredits, setCurrentCredits] = useState("");
  const [plannedCredits, setPlannedCredits] = useState("");
  const [requiredGPA, setRequiredGPA] = useState<number | null>(null);

  const addSemester = () => {
    const newSemester: Semester = {
      id: Date.now().toString(),
      name: `Semester ${semesters.length + 1}`,
      gpa: 0,
      credits: 20
    };
    setSemesters([...semesters, newSemester]);
  };

  const removeSemester = (id: string) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter(semester => semester.id !== id));
    }
  };

  const updateSemester = (id: string, field: keyof Semester, value: string | number) => {
    setSemesters(semesters.map(semester => 
      semester.id === id ? { ...semester, [field]: value } : semester
    ));
  };

  const calculateCumulativeGPA = () => {
    let totalGradePoints = 0;
    let totalCredits = 0;
    
    semesters.forEach(semester => {
      if (semester.gpa > 0 && semester.credits > 0) {
        totalGradePoints += semester.gpa * semester.credits;
        totalCredits += semester.credits;
      }
    });
    
    if (totalCredits > 0) {
      const calculatedGPA = totalGradePoints / totalCredits;
      setCumulativeGPA(calculatedGPA);
      
      onAddToHistory({
        type: "cumulative-gpa",
        semesters: semesters.filter(s => s.gpa > 0),
        cumulativeGPA: calculatedGPA,
        totalCredits,
        timestamp: new Date()
      });
    }
  };

  const calculateRequiredGPA = () => {
    const target = parseFloat(targetGPA);
    const current = parseFloat(currentGPA);
    const currentCreds = parseFloat(currentCredits);
    const plannedCreds = parseFloat(plannedCredits);
    
    if (target && current && currentCreds && plannedCreds) {
      const totalCreditsAfter = currentCreds + plannedCreds;
      const requiredTotalPoints = target * totalCreditsAfter;
      const currentTotalPoints = current * currentCreds;
      const requiredPoints = requiredTotalPoints - currentTotalPoints;
      const required = requiredPoints / plannedCreds;
      
      setRequiredGPA(Math.max(0, required));
    }
  };

  const reset = () => {
    setSemesters(semesters.map(semester => ({ ...semester, gpa: 0 })));
    setCumulativeGPA(null);
    setRequiredGPA(null);
    setTargetGPA("");
    setCurrentGPA("");
    setCurrentCredits("");
    setPlannedCredits("");
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gradient mb-2">GPA Calculator</h2>
        <p className="text-muted-foreground">Calculate cumulative GPA and plan future academic goals</p>
      </div>

      <Tabs defaultValue="cumulative" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cumulative" className="flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Cumulative GPA
          </TabsTrigger>
          <TabsTrigger value="target" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Target GPA
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cumulative">
          <Card className="card-calculator">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Cumulative GPA Calculator
              </CardTitle>
              <CardDescription>
                Calculate your overall GPA across multiple semesters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Semesters</h3>
                  <Button onClick={addSemester} variant="outline" size="sm" className="btn-outline-glow">
                    Add Semester
                  </Button>
                </div>

                {semesters.map((semester, index) => (
                  <div key={semester.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border border-border rounded-lg bg-muted/30">
                    <div className="space-y-2">
                      <Label>Semester Name</Label>
                      <Input
                        value={semester.name}
                        onChange={(e) => updateSemester(semester.id, "name", e.target.value)}
                        className="input-enhanced"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>GPA</Label>
                      <Input
                        type="number"
                        value={semester.gpa || ""}
                        onChange={(e) => updateSemester(semester.id, "gpa", parseFloat(e.target.value) || 0)}
                        className="input-enhanced"
                        step="0.01"
                        min="0"
                        max="4"
                        placeholder="0.00"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Credits</Label>
                      <Input
                        type="number"
                        value={semester.credits || ""}
                        onChange={(e) => updateSemester(semester.id, "credits", parseInt(e.target.value) || 0)}
                        className="input-enhanced"
                        min="0"
                        placeholder="20"
                      />
                    </div>
                    
                    <div className="flex items-end">
                      <Button
                        onClick={() => removeSemester(semester.id)}
                        variant="outline"
                        size="sm"
                        disabled={semesters.length <= 1}
                        className="w-full"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button onClick={calculateCumulativeGPA} className="btn-calculator flex-1">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate Cumulative GPA
                </Button>
                <Button onClick={reset} variant="outline" className="btn-outline-glow">
                  Reset
                </Button>
              </div>

              {cumulativeGPA !== null && (
                <div className="bg-gradient-primary rounded-lg p-6 text-center">
                  <div className="text-white text-3xl font-bold mb-2">
                    {cumulativeGPA.toFixed(2)}
                  </div>
                  <div className="text-white/80">
                    Cumulative GPA
                  </div>
                  <div className="text-white/60 text-sm mt-2">
                    Based on {semesters.filter(s => s.gpa > 0).length} semesters
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="target">
          <Card className="card-calculator">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Target GPA Calculator
              </CardTitle>
              <CardDescription>
                Calculate what GPA you need to achieve your target
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="target-gpa">Target GPA</Label>
                  <Input
                    id="target-gpa"
                    type="number"
                    value={targetGPA}
                    onChange={(e) => setTargetGPA(e.target.value)}
                    className="input-enhanced"
                    step="0.01"
                    min="0"
                    max="4"
                    placeholder="3.50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="current-gpa">Current GPA</Label>
                  <Input
                    id="current-gpa"
                    type="number"
                    value={currentGPA}
                    onChange={(e) => setCurrentGPA(e.target.value)}
                    className="input-enhanced"
                    step="0.01"
                    min="0"
                    max="4"
                    placeholder="3.00"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="current-credits">Current Credits</Label>
                  <Input
                    id="current-credits"
                    type="number"
                    value={currentCredits}
                    onChange={(e) => setCurrentCredits(e.target.value)}
                    className="input-enhanced"
                    min="0"
                    placeholder="60"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="planned-credits">Planned Credits</Label>
                  <Input
                    id="planned-credits"
                    type="number"
                    value={plannedCredits}
                    onChange={(e) => setPlannedCredits(e.target.value)}
                    className="input-enhanced"
                    min="0"
                    placeholder="15"
                  />
                </div>
              </div>

              <Button onClick={calculateRequiredGPA} className="btn-calculator w-full">
                <Target className="h-4 w-4 mr-2" />
                Calculate Required GPA
              </Button>

              {requiredGPA !== null && (
                <div className="space-y-4">
                  <div className={`rounded-lg p-6 text-center ${
                    requiredGPA <= 4.0 ? "bg-gradient-success" : "bg-gradient-to-r from-destructive to-orange-500"
                  }`}>
                    <div className="text-white text-3xl font-bold mb-2">
                      {requiredGPA.toFixed(2)}
                    </div>
                    <div className="text-white/80">
                      Required GPA for next {plannedCredits} credits
                    </div>
                  </div>
                  
                  {requiredGPA > 4.0 && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <div className="text-orange-800 font-medium">⚠️ Achievement Alert</div>
                      <div className="text-orange-700 text-sm mt-1">
                        The required GPA ({requiredGPA.toFixed(2)}) exceeds the maximum possible (4.0). 
                        Consider adjusting your target or taking additional credits.
                      </div>
                    </div>
                  )}
                  
                  {requiredGPA <= 4.0 && requiredGPA > 3.5 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="text-yellow-800 font-medium">📚 Study Hard!</div>
                      <div className="text-yellow-700 text-sm mt-1">
                        You'll need to maintain excellent grades to reach your target.
                      </div>
                    </div>
                  )}
                  
                  {requiredGPA <= 3.5 && requiredGPA >= 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="text-green-800 font-medium">🎯 Achievable Goal!</div>
                      <div className="text-green-700 text-sm mt-1">
                        Your target GPA is well within reach with consistent effort.
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}