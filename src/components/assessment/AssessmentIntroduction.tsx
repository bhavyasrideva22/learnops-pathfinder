import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Target, Users, BarChart3, Lightbulb, ArrowRight } from "lucide-react";

interface AssessmentIntroductionProps {
  onComplete: (data: any) => void;
  onPrevious?: () => void;
}

const AssessmentIntroduction = ({ onComplete }: AssessmentIntroductionProps) => {
  const handleStart = () => {
    onComplete({ introduction: { completed: true, timestamp: new Date() } });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge className="bg-gradient-accent text-white border-0 mb-4">
          Assessment Introduction
        </Badge>
        <h1 className="text-3xl md:text-4xl font-bold">
          Operations Management Career Assessment
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          This comprehensive assessment will help determine whether you're a good fit for pursuing 
          a career or upskilling in Operations Management based on psychological, aptitude, and career alignment factors.
        </p>
      </div>

      {/* What is Operations Management */}
      <Card className="border-0 shadow-soft">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle>What is Operations Management?</CardTitle>
              <CardDescription>Understanding the field you're considering</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Operations Management (OM) focuses on designing, overseeing, and optimizing processes in 
            manufacturing, services, logistics, supply chains, and delivery systems. It's essential for 
            organizational efficiency and customer satisfaction.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <Target className="w-4 h-4 text-assessment-primary" />
                Key Focus Areas
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Process optimization and design</li>
                <li>• Supply chain management</li>
                <li>• Quality control and improvement</li>
                <li>• Resource allocation and planning</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-assessment-accent" />
                Impact Areas
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Cost reduction and efficiency</li>
                <li>• Customer satisfaction</li>
                <li>• Competitive advantage</li>
                <li>• Organizational growth</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Career Paths */}
      <Card className="border-0 shadow-soft">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle>Typical Career Paths</CardTitle>
              <CardDescription>Where this field can take you</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { role: "Operations Manager", desc: "Oversee end-to-end processes in production/service delivery" },
              { role: "Supply Chain Analyst", desc: "Use data to streamline and optimize supply chains" },
              { role: "Logistics Manager", desc: "Coordinate and manage product movement and storage" },
              { role: "Production Planner", desc: "Schedule and coordinate manufacturing processes" },
              { role: "Process Improvement Consultant", desc: "Identify and implement process optimizations" },
              { role: "Project Manager (Operations)", desc: "Plan and execute operational projects on time and budget" }
            ].map((career, index) => (
              <div key={index} className="p-3 rounded-lg bg-muted/50 space-y-1">
                <h5 className="font-medium text-sm">{career.role}</h5>
                <p className="text-xs text-muted-foreground">{career.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Success Traits */}
      <Card className="border-0 shadow-soft">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-success rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle>Skills & Traits That Succeed in OM</CardTitle>
              <CardDescription>What makes someone effective in this field</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              "Systems thinking & process orientation",
              "High attention to detail",
              "Decision-making under pressure",
              "Strong coordination & organizational skills",
              "Analytical mindset with structured problem solving",
              "Preference for stability, structure, and continuous improvement"
            ].map((trait, index) => (
              <div key={index} className="flex items-center gap-3 p-2 rounded-lg bg-assessment-success/5">
                <CheckCircle className="w-4 h-4 text-assessment-success" />
                <span className="text-sm">{trait}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Assessment Overview */}
      <Card className="border-0 shadow-soft bg-gradient-hero/5">
        <CardHeader>
          <CardTitle className="text-center">What This Assessment Will Cover</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            {[
              { title: "Psychometric Analysis", desc: "Interest, personality, cognitive style, and motivation alignment" },
              { title: "Technical & Aptitude", desc: "General aptitude, prerequisite knowledge, and domain-specific skills" },
              { title: "WISCAR Framework", desc: "Will, Interest, Skill, Cognitive readiness, Ability to learn, Real-world alignment" }
            ].map((section, index) => (
              <div key={index} className="space-y-2">
                <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>
                <h4 className="font-semibold text-sm">{section.title}</h4>
                <p className="text-xs text-muted-foreground">{section.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <div className="text-center space-y-4">
        <p className="text-muted-foreground">
          Ready to discover if Operations Management is right for you?
        </p>
        <Button 
          size="xl" 
          variant="hero" 
          onClick={handleStart}
          className="min-w-[200px]"
        >
          Begin Assessment
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default AssessmentIntroduction;