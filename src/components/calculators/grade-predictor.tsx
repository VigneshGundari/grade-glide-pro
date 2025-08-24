import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Target, TrendingUp, AlertCircle } from "lucide-react";

interface GradePredictorProps {
  onAddToHistory: (result: any) => void;
}

export function GradePredictor({ onAddToHistory }: GradePredictorProps) {
  const [currentCGPA, setCurrentCGPA] = useState("");
  const [completedCredits, setCompletedCredits] = useState("");
  const [remainingCredits, setRemainingCredits] = useState("");
  const [targetGrade, setTargetGrade] = useState("");
  const [scale, setScale] = useState("10");
  
  const [predictions, setPredictions] = useState<any>(null);

  const gradeMapping = {
    "10": {
      "O": { min: 9.5, label: "Outstanding (O)" },
      "A+": { min: 8.5, label: "Excellent (A+)" },
      "A": { min: 7.5, label: "Very Good (A)" },
      "B+": { min: 6.5, label: "Good (B+)" },
      "B": { min: 5.5, label: "Above Average (B)" },
      "C": { min: 4.0, label: "Average (C)" }
    },
    "4": {
      "A": { min: 3.7, label: "Excellent (A)" },
      "A-": { min: 3.3, label: "Very Good (A-)" },
      "B+": { min: 3.0, label: "Good (B+)" },
      "B": { min: 2.7, label: "Above Average (B)" },
      "B-": { min: 2.3, label: "Average (B-)" },
      "C+": { min: 2.0, label: "Below Average (C+)" }
    }
  };

  const calculatePredictions = () => {
    const current = parseFloat(currentCGPA);
    const completed = parseFloat(completedCredits);
    const remaining = parseFloat(remainingCredits);
    
    if (!current || !completed || !remaining) return;
    
    const totalCredits = completed + remaining;
    const currentTotalPoints = current * completed;
    
    // Calculate what CGPA is needed for different target grades
    const scale_num = parseFloat(scale);
    const mapping = gradeMapping[scale as keyof typeof gradeMapping];
    
    const predictionResults = [];
    
    for (const [grade, data] of Object.entries(mapping)) {
      const requiredTotalPoints = data.min * totalCredits;
      const requiredPointsFromRemaining = requiredTotalPoints - currentTotalPoints;
      const requiredCGPAForRemaining = requiredPointsFromRemaining / remaining;
      
      const isAchievable = requiredCGPAForRemaining <= scale_num && requiredCGPAForRemaining >= 0;
      const difficulty = requiredCGPAForRemaining / scale_num;
      
      predictionResults.push({
        grade,
        label: data.label,
        minRequired: data.min,
        requiredCGPA: Math.max(0, requiredCGPAForRemaining),
        isAchievable,
        difficulty: Math.min(1, Math.max(0, difficulty)),
        maxPossible: scale_num
      });
    }
    
    // Calculate maximum possible final CGPA
    const maxPossiblePoints = currentTotalPoints + (scale_num * remaining);
    const maxPossibleCGPA = maxPossiblePoints / totalCredits;
    
    // Calculate minimum possible final CGPA (if they get 0 in remaining)
    const minPossibleCGPA = currentTotalPoints / totalCredits;
    
    setPredictions({
      results: predictionResults,
      maxPossible: maxPossibleCGPA,
      minPossible: minPossibleCGPA,
      currentCGPA: current,
      totalCredits,
      completed,
      remaining
    });

    onAddToHistory({
      type: "grade-prediction",
      currentCGPA: current,
      completedCredits: completed,
      remainingCredits: remaining,
      scale,
      predictions: predictionResults,
      timestamp: new Date()
    });
  };

  const reset = () => {
    setCurrentCGPA("");
    setCompletedCredits("");
    setRemainingCredits("");
    setTargetGrade("");
    setPredictions(null);
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 0.6) return "text-green-600 bg-green-100";
    if (difficulty <= 0.8) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getDifficultyText = (difficulty: number) => {
    if (difficulty <= 0.6) return "Easy";
    if (difficulty <= 0.8) return "Moderate";
    return "Challenging";
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gradient mb-2">Grade Predictor</h2>
        <p className="text-muted-foreground">Predict what grades you need to achieve your target CGPA</p>
      </div>

      <Card className="card-calculator">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Academic Performance Predictor
          </CardTitle>
          <CardDescription>
            Enter your current academic standing to see what you need for different grade targets
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="current-cgpa">Current CGPA</Label>
              <Input
                id="current-cgpa"
                type="number"
                value={currentCGPA}
                onChange={(e) => setCurrentCGPA(e.target.value)}
                className="input-enhanced"
                step="0.01"
                min="0"
                max={scale}
                placeholder="7.50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="scale">Grading Scale</Label>
              <Select value={scale} onValueChange={setScale}>
                <SelectTrigger className="input-enhanced">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10.0 Scale</SelectItem>
                  <SelectItem value="4">4.0 Scale</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="completed-credits">Completed Credits</Label>
              <Input
                id="completed-credits"
                type="number"
                value={completedCredits}
                onChange={(e) => setCompletedCredits(e.target.value)}
                className="input-enhanced"
                min="0"
                placeholder="120"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="remaining-credits">Remaining Credits</Label>
              <Input
                id="remaining-credits"
                type="number"
                value={remainingCredits}
                onChange={(e) => setRemainingCredits(e.target.value)}
                className="input-enhanced"
                min="0"
                placeholder="40"
              />
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={calculatePredictions} className="btn-calculator flex-1">
              <Target className="h-4 w-4 mr-2" />
              Predict Grades
            </Button>
            <Button onClick={reset} variant="outline" className="btn-outline-glow">
              Reset
            </Button>
          </div>

          {predictions && (
            <div className="space-y-6">
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-primary rounded-lg p-4 text-center">
                  <div className="text-white text-lg font-bold">
                    {predictions.currentCGPA.toFixed(2)}
                  </div>
                  <div className="text-white/80 text-sm">Current CGPA</div>
                </div>
                
                <div className="bg-gradient-success rounded-lg p-4 text-center">
                  <div className="text-white text-lg font-bold">
                    {predictions.maxPossible.toFixed(2)}
                  </div>
                  <div className="text-white/80 text-sm">Maximum Possible</div>
                </div>
                
                <div className="bg-gradient-secondary rounded-lg p-4 text-center">
                  <div className="text-white text-lg font-bold">
                    {predictions.remaining}
                  </div>
                  <div className="text-white/80 text-sm">Credits Remaining</div>
                </div>
              </div>

              {/* Grade Predictions */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Grade Achievement Breakdown
                </h3>
                
                {predictions.results.map((result: any) => (
                  <div key={result.grade} className="border border-border rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold text-lg">{result.label}</div>
                        <div className="text-muted-foreground text-sm">
                          Minimum CGPA: {result.minRequired.toFixed(2)}
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(result.difficulty)}`}>
                        {result.isAchievable ? getDifficultyText(result.difficulty) : "Not Achievable"}
                      </div>
                    </div>
                    
                    {result.isAchievable ? (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Required CGPA for remaining {predictions.remaining} credits:</span>
                          <span className="font-bold text-primary">
                            {result.requiredCGPA.toFixed(2)}/{result.maxPossible.toFixed(1)}
                          </span>
                        </div>
                        <Progress 
                          value={(result.requiredCGPA / result.maxPossible) * 100} 
                          className="h-2"
                        />
                        {result.difficulty > 0.85 && (
                          <div className="flex items-center gap-2 text-orange-600 text-xs">
                            <AlertCircle className="h-3 w-3" />
                            <span>This target will require exceptional performance</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-red-600 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        <span>
                          This grade is no longer achievable. Required CGPA: {result.requiredCGPA.toFixed(2)} 
                          (exceeds maximum {result.maxPossible.toFixed(1)})
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Advice Section */}
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">💡 Academic Advice</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Focus on high-credit courses for maximum impact</li>
                  <li>• Consider retaking low-scoring courses if your university allows</li>
                  <li>• Maintain consistent performance rather than sporadic excellence</li>
                  <li>• Seek help early if you're struggling with any subject</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}