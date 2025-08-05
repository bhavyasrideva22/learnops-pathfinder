import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Users, TrendingUp, BarChart3, Settings, ArrowRight } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [isStarting, setIsStarting] = useState(false);

  const handleStartAssessment = () => {
    setIsStarting(true);
    // TODO: Navigate to assessment
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Should I Learn This?™️</span>
          </div>
          <Badge variant="secondary" className="font-medium">
            Assessment Series
          </Badge>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <Badge className="mb-6 bg-gradient-accent text-white border-0">
              Operations Management Assessment
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              Should I Learn Operations Management?
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              An intelligent career alignment and learning readiness framework for the future workforce
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="xl" 
                variant="hero"
                onClick={handleStartAssessment}
                disabled={isStarting}
                className="min-w-[200px]"
              >
                {isStarting ? "Starting..." : "Begin Assessment"}
                <ArrowRight className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>25-30 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is Operations Management */}
      <section className="py-16 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              What is Operations Management?
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="border-0 shadow-medium hover:shadow-strong transition-shadow duration-300">
                <CardHeader>
                  <Settings className="w-8 h-8 text-assessment-primary mb-2" />
                  <CardTitle>Process Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Design, oversee, and optimize processes in manufacturing, services, logistics, 
                    and supply chains for maximum efficiency and customer satisfaction.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-medium hover:shadow-strong transition-shadow duration-300">
                <CardHeader>
                  <TrendingUp className="w-8 h-8 text-assessment-secondary mb-2" />
                  <CardTitle>Strategic Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Essential for organizational efficiency, cost reduction, and competitive advantage 
                    in today's fast-paced business environment.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Career Paths */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Typical Career Paths
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Operations Manager", desc: "Oversee end-to-end processes in production/service delivery" },
                { title: "Supply Chain Analyst", desc: "Use data to streamline and optimize supply chains" },
                { title: "Logistics Manager", desc: "Coordinate and manage product movement and storage" },
                { title: "Production Planner", desc: "Schedule and coordinate manufacturing processes" },
                { title: "Process Improvement Consultant", desc: "Identify and implement process optimizations" },
                { title: "Project Manager (Operations)", desc: "Plan and execute operational projects on time and budget" }
              ].map((career, index) => (
                <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-lg">{career.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{career.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Success Traits */}
      <section className="py-16 bg-gradient-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">
              Skills & Traits That Succeed in OM
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Systems thinking & process orientation",
                "High attention to detail",
                "Decision-making under pressure",
                "Strong coordination & organizational skills",
                "Analytical mindset with structured problem solving",
                "Preference for stability, structure, and continuous improvement"
              ].map((trait, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-background/50">
                  <CheckCircle className="w-5 h-5 text-assessment-success" />
                  <span className="text-sm">{trait}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Assessment Overview
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="border-0 shadow-medium text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>6 Sections</CardTitle>
                  <CardDescription>Comprehensive evaluation</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Psychometric, technical, aptitude, and WISCAR framework analysis
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-medium text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>25-30 Minutes</CardTitle>
                  <CardDescription>Time investment</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Thorough yet efficient assessment of your fit and readiness
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-medium text-center">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>Personalized Results</CardTitle>
                  <CardDescription>Actionable insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Detailed recommendations and personalized learning paths
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="text-center">
              <Button 
                size="xl" 
                variant="hero"
                onClick={handleStartAssessment}
                disabled={isStarting}
                className="min-w-[250px]"
              >
                {isStarting ? "Starting Assessment..." : "Start Your Assessment Now"}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 Should I Learn This?™️ Assessment Series. 
            <span className="ml-2">Powered by intelligent career alignment framework.</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;