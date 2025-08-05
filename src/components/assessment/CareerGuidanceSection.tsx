import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download, Share2, RotateCcw, Users, BookOpen, TrendingUp, Target, CheckCircle, ArrowLeft, Home } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CareerGuidanceSectionProps {
  onComplete: (data: any) => void;
  onPrevious?: () => void;
  assessmentData: any;
}

const CareerGuidanceSection = ({ onComplete, onPrevious, assessmentData }: CareerGuidanceSectionProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const careerPaths = [
    {
      title: "Operations Manager",
      description: "Oversees end-to-end processes in production/service delivery",
      responsibilities: ["Process optimization", "Team coordination", "Performance monitoring", "Cost management"],
      salary: "$65,000 - $95,000",
      growth: "High demand, 8% growth expected"
    },
    {
      title: "Supply Chain Analyst", 
      description: "Uses data to streamline and optimize supply chains",
      responsibilities: ["Data analysis", "Vendor management", "Logistics planning", "Risk assessment"],
      salary: "$55,000 - $80,000",
      growth: "Very high demand, 12% growth expected"
    },
    {
      title: "Process Improvement Consultant",
      description: "Identifies and implements process optimizations",
      responsibilities: ["Process mapping", "Lean implementation", "Change management", "Training delivery"],
      salary: "$70,000 - $110,000",
      growth: "Strong demand in digital transformation"
    },
    {
      title: "Business Process Analyst",
      description: "Maps and improves internal business processes",
      responsibilities: ["Process documentation", "Gap analysis", "Solution design", "Stakeholder management"],
      salary: "$60,000 - $85,000",
      growth: "Steady growth, especially in tech"
    }
  ];

  const learningPath = {
    beginner: [
      { title: "Operations Fundamentals", duration: "2-3 weeks", provider: "Coursera/edX" },
      { title: "Supply Chain Basics", duration: "2-3 weeks", provider: "LinkedIn Learning" },
      { title: "Excel for Operations", duration: "1-2 weeks", provider: "Microsoft Learn" }
    ],
    intermediate: [
      { title: "Lean Six Sigma Yellow Belt", duration: "4-6 weeks", provider: "ASQ/Coursera" },
      { title: "Process Mapping & Analysis", duration: "3-4 weeks", provider: "Udemy/Skillshare" },
      { title: "Operations Analytics", duration: "4-5 weeks", provider: "Coursera" }
    ],
    advanced: [
      { title: "ERP Systems (SAP/Oracle)", duration: "6-8 weeks", provider: "Vendor Training" },
      { title: "Operations Research", duration: "8-10 weeks", provider: "University Course" },
      { title: "Strategic Operations Management", duration: "6-8 weeks", provider: "Executive Education" }
    ]
  };

  const skillGaps = {
    current: ["Analytical thinking", "Problem solving", "Attention to detail"],
    target: ["Lean/Six Sigma", "Excel mastery", "KPIs & metrics", "ERP systems", "Project management"],
    recommendations: [
      "Focus on Excel advanced functions and pivot tables",
      "Get certified in Lean Six Sigma methodology", 
      "Learn basic SQL for data analysis",
      "Understand key operations KPIs and dashboards"
    ]
  };

  const alternativeFields = [
    {
      title: "Business Intelligence",
      fit: "High analytical skills, data-driven thinking",
      transition: "Focus on data visualization and SQL skills"
    },
    {
      title: "Product Management",
      fit: "Systems thinking, process orientation",
      transition: "Learn user research and product strategy"
    },
    {
      title: "Customer Success",
      fit: "Process improvement, stakeholder management",
      transition: "Develop customer relationship and communication skills"
    }
  ];

  const handleDownloadReport = async () => {
    setIsDownloading(true);
    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Report Downloaded",
        description: "Your complete assessment report has been downloaded successfully.",
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error downloading your report. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Operations Management Assessment Results",
        text: "I just completed an Operations Management career assessment!",
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Assessment link copied to clipboard!",
      });
    }
  };

  const handleRetakeAssessment = () => {
    window.location.href = "/";
  };

  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleFinish = () => {
    onComplete({
      careerGuidance: {
        completed: true,
        timestamp: new Date(),
        downloadedReport: false
      }
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <Badge className="bg-gradient-success text-white border-0">
          Career & Learning Guidance
        </Badge>
        <h2 className="text-2xl font-bold">Your Operations Management Journey</h2>
        <p className="text-muted-foreground">
          Complete career guidance and next steps
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        <Button 
          variant="hero" 
          onClick={handleDownloadReport}
          disabled={isDownloading}
          className="min-w-[140px]"
        >
          <Download className="w-4 h-4" />
          {isDownloading ? "Generating..." : "Download Report"}
        </Button>
        <Button variant="outline" onClick={handleShare}>
          <Share2 className="w-4 h-4" />
          Share Results
        </Button>
        <Button variant="outline" onClick={handleRetakeAssessment}>
          <RotateCcw className="w-4 h-4" />
          Retake Assessment
        </Button>
      </div>

      {/* Top Career Paths */}
      <Card className="border-0 shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Top Career Paths in Operations Management
          </CardTitle>
          <CardDescription>Roles that match your profile and market demand</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {careerPaths.map((career, index) => (
              <div key={index} className="p-4 rounded-lg bg-gradient-card border">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold">{career.title}</h4>
                  <Badge variant="outline" className="text-xs">
                    {career.salary}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{career.description}</p>
                <div className="space-y-2">
                  <h5 className="text-xs font-medium text-muted-foreground uppercase">Key Responsibilities</h5>
                  <div className="flex flex-wrap gap-1">
                    {career.responsibilities.map((resp, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {resp}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-3 p-2 rounded bg-assessment-success/10 text-assessment-success text-xs">
                  {career.growth}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Skill Gaps Analysis */}
      <Card className="border-0 shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Skill Gaps vs Target Skills
          </CardTitle>
          <CardDescription>What you have vs what you need</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-assessment-success" />
                Current Strengths
              </h4>
              <div className="space-y-2">
                {skillGaps.current.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 rounded bg-assessment-success/10">
                    <CheckCircle className="w-4 h-4 text-assessment-success" />
                    <span className="text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Target Skills Needed</h4>
              <div className="space-y-2">
                {skillGaps.target.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 rounded bg-muted/30">
                    <div className="w-4 h-4 border-2 border-muted-foreground rounded-full" />
                    <span className="text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <h4 className="font-semibold mb-3">Priority Recommendations</h4>
            <div className="space-y-2">
              {skillGaps.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start gap-2 p-3 rounded-lg bg-primary/5">
                  <TrendingUp className="w-4 h-4 text-primary mt-0.5" />
                  <span className="text-sm">{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Path */}
      <Card className="border-0 shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Your Ideal Learning Path
          </CardTitle>
          <CardDescription>Structured progression from beginner to expert</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(learningPath).map(([level, courses]) => (
              <div key={level}>
                <h4 className="font-semibold mb-3 capitalize">{level} Level</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {courses.map((course, index) => (
                    <div key={index} className="p-3 rounded-lg bg-gradient-card border">
                      <h5 className="font-medium text-sm mb-1">{course.title}</h5>
                      <p className="text-xs text-muted-foreground mb-2">{course.provider}</p>
                      <Badge variant="outline" className="text-xs">
                        {course.duration}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alternative Suggestions */}
      <Card className="border-0 shadow-medium">
        <CardHeader>
          <CardTitle>Alternative Career Suggestions</CardTitle>
          <CardDescription>If operations management isn't the perfect fit</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alternativeFields.map((field, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/30">
                <h4 className="font-semibold mb-2">{field.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  <strong>Why it fits:</strong> {field.fit}
                </p>
                <p className="text-sm text-primary">
                  <strong>Transition path:</strong> {field.transition}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Final Actions */}
      <div className="text-center space-y-4">
        <h3 className="text-xl font-semibold">Ready to Begin Your Journey?</h3>
        <p className="text-muted-foreground">
          You now have a complete roadmap for your operations management career path.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button variant="hero" onClick={handleFinish} className="min-w-[140px]">
            Complete Assessment
          </Button>
          <Button variant="outline" onClick={handleGoHome}>
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between border-t pt-6">
        <Button
          variant="outline"
          onClick={onPrevious}
          className="min-w-[120px]"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </Button>
        <Button
          variant="ghost"
          onClick={handleFinish}
          className="min-w-[120px] text-muted-foreground"
        >
          Finish Assessment
        </Button>
      </div>
    </div>
  );
};

export default CareerGuidanceSection;