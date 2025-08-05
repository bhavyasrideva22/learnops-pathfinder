import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calculator, BookOpen, Cog, ArrowRight, ArrowLeft } from "lucide-react";

interface TechnicalSectionProps {
  onComplete: (data: any) => void;
  onPrevious?: () => void;
}

const TechnicalSection = ({ onComplete, onPrevious }: TechnicalSectionProps) => {
  const [currentSubsection, setCurrentSubsection] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});

  const subsections = [
    {
      title: "General Aptitude",
      icon: Calculator,
      description: "Testing logical reasoning, basic numeracy, and pattern recognition",
      questions: [
        {
          question: "If a factory produces 240 units in 8 hours, how many units does it produce per hour?",
          options: ["20", "25", "30", "35"],
          correct: "2"
        },
        {
          question: "A company's efficiency improved by 15% this quarter. If they produced 2000 units last quarter, how many did they produce this quarter?",
          options: ["2150", "2300", "2250", "2400"],
          correct: "1"
        },
        {
          question: "In a sequence: 2, 6, 18, 54, ?, what comes next?",
          options: ["108", "162", "216", "270"],
          correct: "1"
        },
        {
          question: "If Process A takes 4 hours and Process B takes 6 hours, working together they complete the job in:",
          options: ["2.4 hours", "3.2 hours", "5 hours", "10 hours"],
          correct: "0"
        },
        {
          question: "A warehouse has a 20% error rate. If 500 orders are processed, approximately how many will have errors?",
          options: ["50", "75", "100", "125"],
          correct: "2"
        }
      ]
    },
    {
      title: "Prerequisite Knowledge",
      icon: BookOpen,
      description: "Basic statistics, Excel/spreadsheet familiarity, and business process awareness",
      questions: [
        {
          question: "What does 'standard deviation' measure in a dataset?",
          options: ["The average value", "The spread of data points", "The highest value", "The trend direction"],
          correct: "1"
        },
        {
          question: "In Excel, what function would you use to find the average of cells A1 to A10?",
          options: ["=SUM(A1:A10)", "=AVERAGE(A1:A10)", "=COUNT(A1:A10)", "=MEDIAN(A1:A10)"],
          correct: "1"
        },
        {
          question: "What is a KPI in business context?",
          options: ["Key Personnel Indicator", "Key Performance Indicator", "Key Process Improvement", "Key Product Information"],
          correct: "1"
        },
        {
          question: "Which chart type is best for showing trends over time?",
          options: ["Pie chart", "Bar chart", "Line chart", "Scatter plot"],
          correct: "2"
        },
        {
          question: "What does ROI stand for?",
          options: ["Return on Investment", "Rate of Interest", "Risk of Investment", "Revenue over Income"],
          correct: "0"
        }
      ]
    },
    {
      title: "Operations-Specific Knowledge",
      icon: Cog,
      description: "Inventory control, Lean/Agile basics, supply chain concepts, and process optimization",
      questions: [
        {
          question: "What is the primary goal of Just-In-Time (JIT) inventory management?",
          options: ["Maximize inventory", "Reduce holding costs", "Increase safety stock", "Automate ordering"],
          correct: "1"
        },
        {
          question: "In Lean methodology, what does 'waste' typically refer to?",
          options: ["Physical garbage", "Non-value-adding activities", "Defective products only", "Employee breaks"],
          correct: "1"
        },
        {
          question: "What is a bottleneck in operations management?",
          options: ["A type of container", "The fastest process step", "The slowest process step that limits overall output", "A quality control checkpoint"],
          correct: "2"
        },
        {
          question: "EOQ stands for:",
          options: ["Economic Order Quantity", "Efficient Operations Quality", "Emergency Order Queue", "Expected Output Quality"],
          correct: "0"
        },
        {
          question: "What is the main purpose of a supply chain?",
          options: ["To store products", "To manage employees", "To move products from suppliers to customers", "To handle customer complaints"],
          correct: "2"
        },
        {
          question: "In process improvement, what does DMAIC stand for?",
          options: ["Define, Measure, Analyze, Improve, Control", "Design, Manage, Act, Implement, Check", "Develop, Monitor, Assess, Integrate, Complete", "Direct, Modify, Adjust, Inspect, Conclude"],
          correct: "0"
        }
      ]
    }
  ];

  const currentSection = subsections[currentSubsection];
  const progress = ((currentSubsection + 1) / subsections.length) * 100;

  const handleResponse = (questionIndex: number, value: string) => {
    const key = `${currentSubsection}-${questionIndex}`;
    setResponses(prev => ({ ...prev, [key]: value }));
  };

  const isSubsectionComplete = () => {
    for (let i = 0; i < currentSection.questions.length; i++) {
      const key = `${currentSubsection}-${i}`;
      if (!responses[key]) return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentSubsection < subsections.length - 1) {
      setCurrentSubsection(currentSubsection + 1);
    } else {
      const scores = calculateScores();
      onComplete({
        technical: {
          responses,
          scores,
          completed: true
        }
      });
    }
  };

  const handlePrevious = () => {
    if (currentSubsection > 0) {
      setCurrentSubsection(currentSubsection - 1);
    } else if (onPrevious) {
      onPrevious();
    }
  };

  const calculateScores = () => {
    const subsectionScores = subsections.map((section, sectionIndex) => {
      let correct = 0;
      section.questions.forEach((_, questionIndex) => {
        const key = `${sectionIndex}-${questionIndex}`;
        const userAnswer = responses[key];
        const correctAnswer = section.questions[questionIndex].correct;
        if (userAnswer === correctAnswer) {
          correct++;
        }
      });
      return (correct / section.questions.length) * 100;
    });

    const averageScore = subsectionScores.reduce((a, b) => a + b, 0) / subsectionScores.length;

    return {
      aptitudeScore: Math.round(subsectionScores[0]),
      prerequisiteScore: Math.round(subsectionScores[1]),
      domainScore: Math.round(subsectionScores[2]),
      overallScore: Math.round(averageScore)
    };
  };

  const IconComponent = currentSection.icon;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <Badge className="bg-gradient-accent text-white border-0">
          Technical & Aptitude Assessment
        </Badge>
        <h2 className="text-2xl font-bold">Testing Your Technical Readiness</h2>
        <p className="text-muted-foreground">
          Section {currentSubsection + 1} of {subsections.length}
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Technical Progress</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Current Subsection */}
      <Card className="border-0 shadow-medium">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
              <IconComponent className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle>{currentSection.title}</CardTitle>
              <CardDescription>{currentSection.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentSection.questions.map((item, index) => {
            const key = `${currentSubsection}-${index}`;
            return (
              <div key={index} className="space-y-3 p-4 rounded-lg bg-muted/30">
                <h4 className="font-medium">
                  {index + 1}. {item.question}
                </h4>
                <RadioGroup
                  value={responses[key] || ""}
                  onValueChange={(value) => handleResponse(index, value)}
                  className="space-y-2"
                >
                  {item.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={optionIndex.toString()}
                        id={`${key}-${optionIndex}`}
                      />
                      <Label 
                        htmlFor={`${key}-${optionIndex}`}
                        className="cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          className="min-w-[120px]"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>
        <Button
          variant="hero"
          onClick={handleNext}
          disabled={!isSubsectionComplete()}
          className="min-w-[120px]"
        >
          {currentSubsection < subsections.length - 1 ? "Next" : "Complete Section"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default TechnicalSection;