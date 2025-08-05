import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, XCircle, TrendingUp, BookOpen, ArrowRight, ArrowLeft } from "lucide-react";

interface RecommendationSectionProps {
  onComplete: (data: any) => void;
  onPrevious?: () => void;
  assessmentData: any;
}

const RecommendationSection = ({ onComplete, onPrevious, assessmentData }: RecommendationSectionProps) => {
  const [recommendation, setRecommendation] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    // Simulate processing time for recommendations
    const timer = setTimeout(() => {
      const rec = generateRecommendation();
      setRecommendation(rec);
      setIsGenerating(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [assessmentData]);

  const generateRecommendation = () => {
    // Extract scores from assessment data
    const psychScore = assessmentData.psychometric?.scores?.overallScore || 0;
    const techScore = assessmentData.technical?.scores?.overallScore || 0;
    const wiscarScore = assessmentData.wiscar?.scores?.overallScore || 0;
    
    const averageScore = (psychScore + techScore + wiscarScore) / 3;
    
    let decision, confidence, insights, nextSteps, timeline;

    if (averageScore >= 75) {
      decision = "yes";
      confidence = "high";
      insights = [
        "Your cognitive style and personality align well with process optimization roles",
        "You demonstrate strong analytical abilities and systems thinking",
        "Your motivation patterns match those of successful operations professionals",
        "You show high potential for learning operations management concepts quickly"
      ];
      nextSteps = [
        {
          title: "Start with Operations Fundamentals",
          desc: "Begin with 'Introduction to Operations & Process Design' course",
          duration: "2-3 weeks"
        },
        {
          title: "Learn Core Tools",
          desc: "Master Excel, basic statistics, and process mapping tools",
          duration: "3-4 weeks"
        },
        {
          title: "Apply Knowledge",
          desc: "Work on a real operations improvement project",
          duration: "4-6 weeks"
        }
      ];
      timeline = "3-4 months for job-ready level";
    } else if (averageScore >= 60) {
      decision = "maybe";
      confidence = "moderate";
      insights = [
        "You show potential but may need to develop specific areas first",
        "Your technical skills could benefit from strengthening",
        "Consider exploring related fields that might be a better fit",
        "Focus on building foundational knowledge before diving deep"
      ];
      nextSteps = [
        {
          title: "Explore Related Fields",
          desc: "Look into Business Analysis or Project Coordination roles",
          duration: "1-2 weeks"
        },
        {
          title: "Take Foundation Course",
          desc: "Complete a business fundamentals or analytics course",
          duration: "4-6 weeks"
        },
        {
          title: "Reassess Interest",
          desc: "Take a specialized operations course to test genuine interest",
          duration: "2-3 weeks"
        }
      ];
      timeline = "2-3 months to determine fit";
    } else {
      decision = "no";
      confidence = "high";
      insights = [
        "Your current profile suggests operations management may not be the best fit",
        "Your strengths might be better suited for other career paths",
        "Consider fields that better match your natural preferences and abilities",
        "This doesn't reflect on your capabilities - just alignment with this specific field"
      ];
      nextSteps = [
        {
          title: "Explore Alternative Fields",
          desc: "Consider Product Design (creative + structured thinking)",
          duration: "1-2 weeks"
        },
        {
          title: "Try UX Research",
          desc: "Blend analytical skills with user-focused work",
          duration: "2-3 weeks"
        },
        {
          title: "Consider Consulting",
          desc: "Use problem-solving skills in varied business contexts",
          duration: "1-2 weeks"
        }
      ];
      timeline = "1-2 months to explore alternatives";
    }

    return {
      decision,
      confidence,
      overallScore: Math.round(averageScore),
      psychometricScore: Math.round(psychScore),
      technicalScore: Math.round(techScore),
      wiscarScore: Math.round(wiscarScore),
      insights,
      nextSteps,
      timeline
    };
  };

  const handleComplete = () => {
    onComplete({
      recommendation: {
        ...recommendation,
        completed: true,
        timestamp: new Date()
      }
    });
  };

  if (isGenerating) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="text-center space-y-4">
          <Badge className="bg-gradient-hero text-white border-0">
            Generating Recommendations
          </Badge>
          <h2 className="text-2xl font-bold">Analyzing Your Results</h2>
          <p className="text-muted-foreground">
            Processing your assessment data to provide personalized recommendations...
          </p>
        </div>
        
        <Card className="border-0 shadow-medium">
          <CardContent className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto animate-pulse">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <Progress value={66} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Analyzing psychometric fit, technical readiness, and WISCAR scores...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getDecisionIcon = () => {
    switch (recommendation.decision) {
      case "yes": return <CheckCircle className="w-8 h-8 text-assessment-success" />;
      case "maybe": return <AlertCircle className="w-8 h-8 text-assessment-warning" />;
      case "no": return <XCircle className="w-8 h-8 text-destructive" />;
      default: return null;
    }
  };

  const getDecisionText = () => {
    switch (recommendation.decision) {
      case "yes": return "Yes - Strong Fit";
      case "maybe": return "Maybe - Moderate Fit";
      case "no": return "No - Misaligned";
      default: return "";
    }
  };

  const getDecisionBadge = () => {
    switch (recommendation.decision) {
      case "yes": return "bg-gradient-success";
      case "maybe": return "bg-gradient-accent";
      case "no": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <Badge className="bg-gradient-hero text-white border-0">
          Personalized Recommendations
        </Badge>
        <h2 className="text-2xl font-bold">Your Assessment Results</h2>
        <p className="text-muted-foreground">
          Based on your comprehensive evaluation
        </p>
      </div>

      {/* Main Recommendation */}
      <Card className="border-0 shadow-medium">
        <CardHeader className="text-center pb-4">
          <div className="flex flex-col items-center gap-4">
            {getDecisionIcon()}
            <div>
              <CardTitle className="text-2xl">
                Should You Learn Operations Management?
              </CardTitle>
              <Badge className={`${getDecisionBadge()} text-white border-0 mt-2`}>
                {getDecisionText()}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Score Breakdown */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <div className="text-2xl font-bold text-primary">{recommendation.overallScore}%</div>
              <div className="text-sm text-muted-foreground">Overall Fit</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <div className="text-2xl font-bold text-assessment-primary">{recommendation.psychometricScore}%</div>
              <div className="text-sm text-muted-foreground">Psychological</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <div className="text-2xl font-bold text-assessment-accent">{recommendation.technicalScore}%</div>
              <div className="text-sm text-muted-foreground">Technical</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <div className="text-2xl font-bold text-assessment-success">{recommendation.wiscarScore}%</div>
              <div className="text-sm text-muted-foreground">WISCAR</div>
            </div>
          </div>

          {/* Confidence Level */}
          <div className="text-center p-4 rounded-lg bg-gradient-card">
            <h4 className="font-semibold mb-2">Confidence Level</h4>
            <Badge variant={recommendation.confidence === "high" ? "default" : "secondary"}>
              {recommendation.confidence.charAt(0).toUpperCase() + recommendation.confidence.slice(1)} Confidence
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Personalized Insights */}
      <Card className="border-0 shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Personalized Insights
          </CardTitle>
          <CardDescription>What your assessment reveals about your fit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendation.insights.map((insight: string, index: number) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                <CheckCircle className="w-5 h-5 text-assessment-success mt-0.5 flex-shrink-0" />
                <span className="text-sm">{insight}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="border-0 shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Recommended Next Steps
          </CardTitle>
          <CardDescription>Your personalized learning path</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recommendation.nextSteps.map((step: any, index: number) => (
              <div key={index} className="flex gap-4 p-4 rounded-lg bg-gradient-card">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">{step.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{step.desc}</p>
                  <Badge variant="outline" className="text-xs">
                    {step.duration}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
            <h4 className="font-semibold text-primary mb-1">Timeline Estimate</h4>
            <p className="text-sm text-muted-foreground">{recommendation.timeline}</p>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={onPrevious}
          className="min-w-[120px]"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>
        <Button
          variant="hero"
          onClick={handleComplete}
          className="min-w-[120px]"
        >
          View Career Guidance
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default RecommendationSection;