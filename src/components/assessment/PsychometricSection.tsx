import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Brain, Heart, Gauge, Target, ArrowRight, ArrowLeft } from "lucide-react";

interface PsychometricSectionProps {
  onComplete: (data: any) => void;
  onPrevious?: () => void;
}

const PsychometricSection = ({ onComplete, onPrevious }: PsychometricSectionProps) => {
  const [currentSubsection, setCurrentSubsection] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});

  const subsections = [
    {
      title: "Interest Scale",
      icon: Heart,
      description: "How curious and engaged are you about managing systems, processes, and resources?",
      questions: [
        "I find myself naturally drawn to understanding how things work in organizations",
        "I enjoy analyzing workflows and identifying bottlenecks",
        "I'm interested in learning about supply chain and logistics",
        "I like the idea of optimizing processes for better efficiency",
        "I find satisfaction in creating order from chaos"
      ]
    },
    {
      title: "Personality Compatibility", 
      icon: Brain,
      description: "Assessing your personality traits against successful OM professionals",
      questions: [
        "I prefer structured, predictable work environments",
        "I pay close attention to details and rarely make careless mistakes",
        "I remain calm and focused when faced with tight deadlines",
        "I enjoy coordinating with multiple teams and stakeholders",
        "I prefer data-driven decision making over intuition"
      ]
    },
    {
      title: "Cognitive Style & Preferences",
      icon: Gauge,
      description: "Understanding how you prefer to work and think",
      questions: [
        "I prefer having clear procedures and guidelines to follow",
        "I work better with concrete, measurable goals than abstract concepts",
        "I enjoy stability and consistent routines in my work",
        "I prefer analytical problem-solving over creative brainstorming",
        "I like working with systems and processes more than people"
      ]
    },
    {
      title: "Motivation Type",
      icon: Target,
      description: "What drives you in your career and work life",
      questions: [
        "I'm motivated by improving efficiency and reducing waste",
        "I find satisfaction in helping organizations run smoothly",
        "I'm driven by measurable results and KPIs",
        "I enjoy the stability that comes with process-oriented work",
        "I'm motivated by solving complex logistical challenges"
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
      // Calculate scores and complete section
      const scores = calculateScores();
      onComplete({
        psychometric: {
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
    const subsectionScores = subsections.map((_, index) => {
      let total = 0;
      let count = 0;
      for (let i = 0; i < subsections[index].questions.length; i++) {
        const key = `${index}-${i}`;
        if (responses[key]) {
          total += parseInt(responses[key]);
          count++;
        }
      }
      return count > 0 ? (total / count) : 0;
    });

    const averageScore = subsectionScores.reduce((a, b) => a + b, 0) / subsectionScores.length;
    const normalizedScore = ((averageScore - 1) / 4) * 100; // Convert 1-5 scale to 0-100

    return {
      interestScore: ((subsectionScores[0] - 1) / 4) * 100,
      personalityScore: ((subsectionScores[1] - 1) / 4) * 100,
      cognitiveScore: ((subsectionScores[2] - 1) / 4) * 100,
      motivationScore: ((subsectionScores[3] - 1) / 4) * 100,
      overallScore: Math.round(normalizedScore)
    };
  };

  const IconComponent = currentSection.icon;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <Badge className="bg-gradient-hero text-white border-0">
          Psychometric Analysis
        </Badge>
        <h2 className="text-2xl font-bold">Understanding Your Psychological Fit</h2>
        <p className="text-muted-foreground">
          Section {currentSubsection + 1} of {subsections.length}
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Psychometric Progress</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Current Subsection */}
      <Card className="border-0 shadow-medium">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <IconComponent className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle>{currentSection.title}</CardTitle>
              <CardDescription>{currentSection.description}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentSection.questions.map((question, index) => {
            const key = `${currentSubsection}-${index}`;
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

export default PsychometricSection;