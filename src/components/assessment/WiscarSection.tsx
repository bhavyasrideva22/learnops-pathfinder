import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Zap, Heart, Wrench, Brain, GraduationCap, MapPin, ArrowRight, ArrowLeft } from "lucide-react";

interface WiscarSectionProps {
  onComplete: (data: any) => void;
  onPrevious?: () => void;
}

const WiscarSection = ({ onComplete, onPrevious }: WiscarSectionProps) => {
  const [currentDimension, setCurrentDimension] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});

  const dimensions = [
    {
      title: "Will",
      icon: Zap,
      description: "Drive, grit, and consistency in pursuing goals",
      color: "bg-red-500",
      questions: [
        "I consistently follow through on commitments, even when it gets difficult",
        "I maintain focus on long-term goals despite short-term obstacles", 
        "I actively seek out challenging projects that push my capabilities",
        "I persist through setbacks and learn from failures",
        "I maintain high standards for my work even under pressure"
      ]
    },
    {
      title: "Interest",
      icon: Heart,
      description: "Curiosity and perceived value in operations management",
      color: "bg-pink-500",
      questions: [
        "I genuinely enjoy learning about business processes and systems",
        "I find operations management topics intellectually stimulating",
        "I see clear value in developing operations management skills",
        "I'm excited about the career opportunities in this field",
        "I would study operations management even if not required"
      ]
    },
    {
      title: "Skill",
      icon: Wrench,
      description: "Existing soft and technical skills relevant to OM",
      color: "bg-blue-500", 
      questions: [
        "I have strong analytical and problem-solving abilities",
        "I'm effective at coordinating multiple tasks and deadlines",
        "I communicate well with different types of stakeholders",
        "I have experience with data analysis and spreadsheet tools",
        "I'm skilled at identifying inefficiencies and improvement opportunities"
      ]
    },
    {
      title: "Cognitive Readiness",
      icon: Brain,
      description: "Learning speed and problem-solving capacity",
      color: "bg-purple-500",
      questions: [
        "I quickly grasp new concepts and frameworks",
        "I can think systematically about complex problems",
        "I learn effectively from both theoretical and practical materials",
        "I can adapt my thinking when new information becomes available",
        "I process and synthesize information from multiple sources well"
      ]
    },
    {
      title: "Ability to Learn",
      icon: GraduationCap,
      description: "Feedback receptivity and learning persistence",
      color: "bg-green-500",
      questions: [
        "I actively seek feedback to improve my performance",
        "I remain motivated to learn even when topics are challenging",
        "I can learn effectively through various methods (reading, practice, discussion)",
        "I apply lessons learned from one situation to new contexts",
        "I maintain curiosity and ask questions to deepen understanding"
      ]
    },
    {
      title: "Real-world Alignment",
      icon: MapPin,
      description: "Fit with actual job roles and work settings",
      color: "bg-orange-500",
      questions: [
        "I thrive in structured, process-oriented work environments",
        "I'm comfortable working with data, metrics, and KPIs",
        "I enjoy collaborating with cross-functional teams",
        "I'm motivated by improving efficiency and reducing waste",
        "I can handle the pace and pressure of operations roles"
      ]
    }
  ];

  const likertOptions = [
    { value: "1", label: "Strongly Disagree" },
    { value: "2", label: "Disagree" },
    { value: "3", label: "Neutral" },
    { value: "4", label: "Agree" },
    { value: "5", label: "Strongly Agree" }
  ];

  const currentDim = dimensions[currentDimension];
  const progress = ((currentDimension + 1) / dimensions.length) * 100;

  const handleResponse = (questionIndex: number, value: string) => {
    const key = `${currentDimension}-${questionIndex}`;
    setResponses(prev => ({ ...prev, [key]: value }));
  };

  const isDimensionComplete = () => {
    for (let i = 0; i < currentDim.questions.length; i++) {
      const key = `${currentDimension}-${i}`;
      if (!responses[key]) return false;
    }
    return true;
  };

  const handleNext = () => {
    if (currentDimension < dimensions.length - 1) {
      setCurrentDimension(currentDimension + 1);
    } else {
      const scores = calculateWiscarScores();
      onComplete({
        wiscar: {
          responses,
          scores,
          completed: true
        }
      });
    }
  };

  const handlePrevious = () => {
    if (currentDimension > 0) {
      setCurrentDimension(currentDimension - 1);
    } else if (onPrevious) {
      onPrevious();
    }
  };

  const calculateWiscarScores = () => {
    const dimensionScores = dimensions.map((_, dimIndex) => {
      let total = 0;
      let count = 0;
      for (let i = 0; i < dimensions[dimIndex].questions.length; i++) {
        const key = `${dimIndex}-${i}`;
        if (responses[key]) {
          total += parseInt(responses[key]);
          count++;
        }
      }
      return count > 0 ? ((total / count - 1) / 4) * 100 : 0; // Convert to 0-100 scale
    });

    const overallScore = dimensionScores.reduce((a, b) => a + b, 0) / dimensionScores.length;

    return {
      will: Math.round(dimensionScores[0]),
      interest: Math.round(dimensionScores[1]),
      skill: Math.round(dimensionScores[2]),
      cognitiveReadiness: Math.round(dimensionScores[3]),
      abilityToLearn: Math.round(dimensionScores[4]),
      realWorldAlignment: Math.round(dimensionScores[5]),
      overallScore: Math.round(overallScore)
    };
  };

  const IconComponent = currentDim.icon;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <Badge className="bg-gradient-success text-white border-0">
          WISCAR Framework Analysis
        </Badge>
        <h2 className="text-2xl font-bold">Comprehensive Readiness Assessment</h2>
        <p className="text-muted-foreground">
          Dimension {currentDimension + 1} of {dimensions.length}: {currentDim.title}
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>WISCAR Progress</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* WISCAR Overview */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6">
        {dimensions.map((dim, index) => {
          const DimIcon = dim.icon;
          return (
            <div
              key={index}
              className={`p-2 rounded-lg text-center transition-all ${
                index === currentDimension
                  ? "bg-primary text-primary-foreground shadow-medium"
                  : index < currentDimension
                  ? "bg-assessment-success/10 text-assessment-success"
                  : "bg-muted/50 text-muted-foreground"
              }`}
            >
              <DimIcon className="w-4 h-4 mx-auto mb-1" />
              <span className="text-xs font-medium">{dim.title[0]}</span>
            </div>
          );
        })}
      </div>

      {/* Current Dimension */}
      <Card className="border-0 shadow-medium">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-success rounded-lg flex items-center justify-center">
              <IconComponent className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                {currentDim.title}
                <Badge variant="outline" className="text-xs">
                  {currentDimension + 1}/{dimensions.length}
                </Badge>
              </CardTitle>
              <CardDescription>{currentDim.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentDim.questions.map((question, index) => {
            const key = `${currentDimension}-${index}`;
            return (
              <div key={index} className="space-y-3">
                <h4 className="font-medium text-sm">
                  {index + 1}. {question}
                </h4>
                <RadioGroup
                  value={responses[key] || ""}
                  onValueChange={(value) => handleResponse(index, value)}
                  className="grid grid-cols-5 gap-2"
                >
                  {likertOptions.map((option) => (
                    <div key={option.value} className="flex flex-col items-center space-y-2">
                      <RadioGroupItem
                        value={option.value}
                        id={`${key}-${option.value}`}
                        className="mx-auto"
                      />
                      <Label 
                        htmlFor={`${key}-${option.value}`}
                        className="text-xs text-center cursor-pointer"
                      >
                        {option.label}
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
          disabled={!isDimensionComplete()}
          className="min-w-[120px]"
        >
          {currentDimension < dimensions.length - 1 ? "Next Dimension" : "Complete WISCAR"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default WiscarSection;