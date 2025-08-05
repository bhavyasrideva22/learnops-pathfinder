import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle } from "lucide-react";
import AssessmentIntroduction from "@/components/assessment/AssessmentIntroduction";
import PsychometricSection from "@/components/assessment/PsychometricSection";
import TechnicalSection from "@/components/assessment/TechnicalSection";
import WiscarSection from "@/components/assessment/WiscarSection";
import RecommendationSection from "@/components/assessment/RecommendationSection";
import CareerGuidanceSection from "@/components/assessment/CareerGuidanceSection";

const Assessment = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [assessmentData, setAssessmentData] = useState({
    psychometric: {},
    technical: {},
    wiscar: {},
    scores: {}
  });

  const sections = [
    { name: "Introduction", component: AssessmentIntroduction, time: "2 min" },
    { name: "Psychometric Analysis", component: PsychometricSection, time: "8-10 min" },
    { name: "Technical & Aptitude", component: TechnicalSection, time: "6-8 min" },
    { name: "WISCAR Framework", component: WiscarSection, time: "5-7 min" },
    { name: "Recommendations", component: RecommendationSection, time: "3-4 min" },
    { name: "Career Guidance", component: CareerGuidanceSection, time: "2-3 min" }
  ];

  const progress = ((currentSection + 1) / sections.length) * 100;

  const handleSectionComplete = (sectionData: any) => {
    setAssessmentData(prev => ({
      ...prev,
      ...sectionData
    }));
    
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const CurrentComponent = sections[currentSection].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold">Operations Management Assessment</h1>
              <Badge variant="secondary">
                Section {currentSection + 1} of {sections.length}
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{sections[currentSection].time}</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progress</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          {/* Section Navigation */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            {sections.map((section, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                  index === currentSection
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : index < currentSection
                    ? "bg-assessment-success/10 text-assessment-success"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {index < currentSection ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    index === currentSection 
                      ? "border-primary-foreground bg-primary-foreground" 
                      : "border-current"
                  }`} />
                )}
                <span>{section.name}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Assessment Content */}
      <main className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto border-0 shadow-medium bg-gradient-card">
          <CardContent className="p-8">
          <CurrentComponent
            onComplete={handleSectionComplete}
            onPrevious={currentSection > 0 ? handlePrevious : undefined}
            {...(currentSection > 0 && { assessmentData })}
            {...(currentSection > 0 && { sectionIndex: currentSection })}
          />
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Assessment;