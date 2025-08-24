import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, ArrowRightLeft, TrendingUp } from "lucide-react";

interface ConversionResult {
  input: number;
  output: number;
  scale: string;
  university: string;
  timestamp: Date;
}

interface CGPAConverterProps {
  onAddToHistory: (result: ConversionResult) => void;
}

export function CGPAConverter({ onAddToHistory }: CGPAConverterProps) {
  const [cgpa, setCgpa] = useState("");
  const [percentage, setPercentage] = useState("");
  const [scale, setScale] = useState("10");
  const [university, setUniversity] = useState("normal");
  const [result, setResult] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("cgpa-to-percentage");

  const universityFormulas = {
    normal: { multiplier: 9.5, offset: 0 },
    vtu: { multiplier: 10, offset: 0 },
    mumbai: { multiplier: 8.8, offset: 12 },
    makaut: { multiplier: 9, offset: 4 },
    anna: { multiplier: 10, offset: 0 },
    bits: { multiplier: 10, offset: 0 },
    bhu: { multiplier: 9.5, offset: 0 },
  };

  const calculateCGPAToPercentage = () => {
    if (!cgpa) return;
    
    const cgpaValue = parseFloat(cgpa);
    const formula = universityFormulas[university as keyof typeof universityFormulas];
    let calculatedPercentage: number;
    
    if (scale === "4") {
      calculatedPercentage = (cgpaValue * 25);
    } else if (scale === "5") {
      calculatedPercentage = (cgpaValue * 20);
    } else {
      calculatedPercentage = (cgpaValue * formula.multiplier) + formula.offset;
    }
    
    const finalResult = Math.min(100, Math.max(0, calculatedPercentage));
    setResult(finalResult);
    
    onAddToHistory({
      input: cgpaValue,
      output: finalResult,
      scale: scale,
      university: university,
      timestamp: new Date()
    });
  };

  const calculatePercentageToCGPA = () => {
    if (!percentage) return;
    
    const percentageValue = parseFloat(percentage);
    const formula = universityFormulas[university as keyof typeof universityFormulas];
    let calculatedCGPA: number;
    
    if (scale === "4") {
      calculatedCGPA = percentageValue / 25;
    } else if (scale === "5") {
      calculatedCGPA = percentageValue / 20;
    } else {
      calculatedCGPA = (percentageValue - formula.offset) / formula.multiplier;
    }
    
    const maxCGPA = parseFloat(scale);
    const finalResult = Math.min(maxCGPA, Math.max(0, calculatedCGPA));
    setResult(finalResult);
    
    onAddToHistory({
      input: percentageValue,
      output: finalResult,
      scale: scale,
      university: university,
      timestamp: new Date()
    });
  };

  const reset = () => {
    setCgpa("");
    setPercentage("");
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gradient mb-2">CGPA & Percentage Converter</h2>
        <p className="text-muted-foreground">Convert between CGPA and percentage with multiple university formulas</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cgpa-to-percentage" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            CGPA to Percentage
          </TabsTrigger>
          <TabsTrigger value="percentage-to-cgpa" className="flex items-center gap-2">
            <ArrowRightLeft className="h-4 w-4" />
            Percentage to CGPA
          </TabsTrigger>
        </TabsList>

        <TabsContent value="cgpa-to-percentage">
          <Card className="card-calculator">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                CGPA to Percentage
              </CardTitle>
              <CardDescription>
                Enter your CGPA to get the equivalent percentage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cgpa">CGPA</Label>
                  <Input
                    id="cgpa"
                    type="number"
                    placeholder="Enter CGPA"
                    value={cgpa}
                    onChange={(e) => setCgpa(e.target.value)}
                    className="input-enhanced"
                    step="0.01"
                    min="0"
                    max={scale}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="scale">Grading Scale</Label>
                  <Select value={scale} onValueChange={setScale}>
                    <SelectTrigger className="input-enhanced">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4">4.0 Scale</SelectItem>
                      <SelectItem value="5">5.0 Scale</SelectItem>
                      <SelectItem value="10">10.0 Scale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="university">University System</Label>
                <Select value={university} onValueChange={setUniversity}>
                  <SelectTrigger className="input-enhanced">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Standard Formula</SelectItem>
                    <SelectItem value="vtu">VTU (Visvesvaraya Technological University)</SelectItem>
                    <SelectItem value="mumbai">Mumbai University</SelectItem>
                    <SelectItem value="makaut">MAKAUT</SelectItem>
                    <SelectItem value="anna">Anna University</SelectItem>
                    <SelectItem value="bits">BITS Pilani</SelectItem>
                    <SelectItem value="bhu">Banaras Hindu University</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3">
                <Button onClick={calculateCGPAToPercentage} className="btn-calculator flex-1">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate Percentage
                </Button>
                <Button onClick={reset} variant="outline" className="btn-outline-glow">
                  Reset
                </Button>
              </div>

              {result !== null && (
                <div className="bg-gradient-success rounded-lg p-6 text-center">
                  <div className="text-white text-2xl font-bold mb-2">
                    {result.toFixed(2)}%
                  </div>
                  <div className="text-white/80">
                    Equivalent Percentage
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="percentage-to-cgpa">
          <Card className="card-calculator">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRightLeft className="h-5 w-5" />
                Percentage to CGPA
              </CardTitle>
              <CardDescription>
                Enter your percentage to get the equivalent CGPA
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="percentage">Percentage</Label>
                  <Input
                    id="percentage"
                    type="number"
                    placeholder="Enter percentage"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                    className="input-enhanced"
                    step="0.01"
                    min="0"
                    max="100"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="scale-2">Grading Scale</Label>
                  <Select value={scale} onValueChange={setScale}>
                    <SelectTrigger className="input-enhanced">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4">4.0 Scale</SelectItem>
                      <SelectItem value="5">5.0 Scale</SelectItem>
                      <SelectItem value="10">10.0 Scale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="university-2">University System</Label>
                <Select value={university} onValueChange={setUniversity}>
                  <SelectTrigger className="input-enhanced">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Standard Formula</SelectItem>
                    <SelectItem value="vtu">VTU (Visvesvaraya Technological University)</SelectItem>
                    <SelectItem value="mumbai">Mumbai University</SelectItem>
                    <SelectItem value="makaut">MAKAUT</SelectItem>
                    <SelectItem value="anna">Anna University</SelectItem>
                    <SelectItem value="bits">BITS Pilani</SelectItem>
                    <SelectItem value="bhu">Banaras Hindu University</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3">
                <Button onClick={calculatePercentageToCGPA} className="btn-calculator flex-1">
                  <Calculator className="h-4 w-4 mr-2" />
                  Calculate CGPA
                </Button>
                <Button onClick={reset} variant="outline" className="btn-outline-glow">
                  Reset
                </Button>
              </div>

              {result !== null && (
                <div className="bg-gradient-primary rounded-lg p-6 text-center">
                  <div className="text-white text-2xl font-bold mb-2">
                    {result.toFixed(2)}
                  </div>
                  <div className="text-white/80">
                    Equivalent CGPA ({scale}.0 Scale)
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}