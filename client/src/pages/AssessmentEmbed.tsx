import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Clock, 
  CheckCircle, 
  Eye, 
  Shield,
  Play,
  FileText,
  Monitor
} from 'lucide-react';

export default function AssessmentEmbed() {
  useEffect(() => {
    // Add robots meta tag to prevent indexing
    const robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta) {
      robotsMeta.setAttribute('content', 'noindex,nofollow');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'noindex,nofollow';
      document.head.appendChild(meta);
    }
    
    // Style adjustments for iframe embedding
    document.body.style.margin = '0';
    document.body.style.padding = '16px';
    document.body.style.backgroundColor = '#ffffff';
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Assessment Header */}
      <div className="bg-primary text-primary-foreground p-6 rounded-lg mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Talpro Technical Assessment</h1>
          <div className="flex items-center gap-2 bg-primary/20 px-3 py-1 rounded-full">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">45:00 remaining</span>
          </div>
        </div>
        <p className="text-primary-foreground/90">
          Welcome to your technical assessment. This is a secure, proctored environment designed to evaluate your technical skills fairly and accurately.
        </p>
      </div>

      {/* Assessment Status */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Secure Environment</h3>
                <p className="text-sm text-muted-foreground">Proctoring active</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Monitoring</h3>
                <p className="text-sm text-muted-foreground">Tab switches logged</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Connection</h3>
                <p className="text-sm text-muted-foreground">Stable</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Placeholder Content */}
      <div className="grid gap-6">
        {/* Instructions */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Assessment Instructions</h2>
            </div>
            <div className="space-y-3 text-muted-foreground">
              <p>• This assessment evaluates your technical skills in programming, cloud technologies, and problem-solving</p>
              <p>• You have 45 minutes to complete all sections</p>
              <p>• Your screen activity is being monitored for security purposes</p>
              <p>• AI assistance tools are discouraged unless explicitly permitted</p>
              <p>• You may resume once if your connection drops</p>
            </div>
          </CardContent>
        </Card>

        {/* Demo Assessment Section */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Monitor className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Technical Assessment Demo</h2>
            </div>
            
            <div className="bg-muted/50 border border-dashed border-border rounded-lg p-8 text-center">
              <Play className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Assessment Simulation</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                This is a demonstration of the AI-powered technical assessment environment. 
                In a real assessment, you would see interactive coding challenges, multiple-choice questions, 
                and hands-on technical tasks tailored to your role.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 max-w-xl mx-auto mb-6">
                <div className="bg-card border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Code Challenges</h4>
                  <p className="text-sm text-muted-foreground">Interactive programming tasks with auto-grading</p>
                </div>
                <div className="bg-card border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Technical Questions</h4>
                  <p className="text-sm text-muted-foreground">Role-specific knowledge evaluation</p>
                </div>
              </div>
              
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90" data-testid="button-start-demo">
                Start Assessment Demo
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Assessment Areas */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Assessment Areas</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                'Programming & Scripting',
                'Cloud Technologies',
                'Data & SQL',
                'Problem Solving',
                'DevOps Fundamentals',
                'System Design',
                'Code Quality',
                'Communication'
              ].map((area, index) => (
                <div key={index} className="bg-muted/30 border rounded-lg p-3 text-center">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-xs font-semibold text-primary">{index + 1}</span>
                  </div>
                  <p className="text-sm font-medium">{area}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="text-center text-sm text-muted-foreground py-4">
          <p>This is a demonstration environment. In production, candidates would see the actual assessment interface with real questions and coding challenges.</p>
        </div>
      </div>
    </div>
  );
}