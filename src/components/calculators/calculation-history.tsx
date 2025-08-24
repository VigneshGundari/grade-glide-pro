import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { History, Download, Trash2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CalculationHistoryProps {
  history: any[];
  onClearHistory: () => void;
}

export function CalculationHistory({ history, onClearHistory }: CalculationHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHistory = history.filter(item => 
    item.university?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.scale?.includes(searchTerm) ||
    item.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToCSV = () => {
    const csvData = history.map(item => ({
      Date: item.timestamp.toLocaleDateString(),
      Time: item.timestamp.toLocaleTimeString(),
      Type: item.type || "CGPA Conversion",
      Input: item.input,
      Output: item.output || item.cgpa,
      Scale: item.scale,
      University: item.university || "N/A"
    }));

    const csvContent = [
      Object.keys(csvData[0]).join(","),
      ...csvData.map(row => Object.values(row).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "grade_calculations.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "grade-calculation": return "bg-blue-100 text-blue-800";
      case "cumulative-gpa": return "bg-green-100 text-green-800";
      case "target-gpa": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatType = (type: string) => {
    switch (type) {
      case "grade-calculation": return "Grade Calc";
      case "cumulative-gpa": return "Cumulative GPA";
      case "target-gpa": return "Target GPA";
      default: return "CGPA Conversion";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gradient mb-2">Calculation History</h2>
        <p className="text-muted-foreground">View and manage your previous calculations</p>
      </div>

      <Card className="card-calculator">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Your Calculation History
          </CardTitle>
          <CardDescription>
            Track all your grade calculations and conversions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {history.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search calculations..."
                  className="pl-10 input-enhanced"
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={exportToCSV} variant="outline" size="sm" className="btn-outline-glow">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
                <Button onClick={onClearHistory} variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive hover:text-white">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>
            </div>
          )}

          {filteredHistory.length === 0 ? (
            <div className="text-center py-12">
              <History className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                {history.length === 0 ? "No calculations yet" : "No matching calculations"}
              </h3>
              <p className="text-muted-foreground">
                {history.length === 0 
                  ? "Start calculating to see your history here"
                  : "Try adjusting your search terms"
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Input</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Scale</TableHead>
                    <TableHead>University</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHistory.map((item, index) => (
                    <TableRow key={index} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <div className="text-sm">
                          <div>{item.timestamp.toLocaleDateString()}</div>
                          <div className="text-muted-foreground text-xs">
                            {item.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getTypeColor(item.type || "")}>
                          {formatType(item.type || "")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {item.type === "grade-calculation" ? (
                          <div className="text-sm">
                            <div>{item.subjects?.length || 0} subjects</div>
                            <div className="text-muted-foreground text-xs">
                              {item.totalCredits} credits
                            </div>
                          </div>
                        ) : (
                          <span className="font-medium">{item.input}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <span className="font-bold text-primary">
                          {(item.output || item.cgpa)?.toFixed(2)}
                          {item.type === "grade-calculation" || item.type === "cumulative-gpa" ? "" : 
                           item.type ? "" : "%"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.scale}.0</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm capitalize">
                          {item.university?.replace("-", " ") || "Standard"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}