import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Code, Settings, Globe, Database, TestTube, Cloud, Brain } from "lucide-react";

export function Skills() {
  const skillCategories = [
    {
      icon: Code,
      title: "Programming Languages",
      skills: ["Python", "C/C++", "Java", "SQL", "Bash", "JavaScript", "Dart"]
    },
    {
      icon: Settings,
      title: "Robotics & Autonomous Systems",
      skills: ["ROS2(Humble)", "ROS1(Noetic)", "SLAM", "Multi-Agent Coordination", "Odometry", "Motion Planning(A*, Djikstra)", "LIDAR", "Simulation(Gazebo, PyBullet)"]
    },
    {
      icon: Brain,
      title: "AI/ML",
      skills: ["PyTorch", "TensorFlow", "Scikit-learn", "CNNs", "RNNs","Transformers(BERT, GPT)", "YOLOv8", "Model Training & Evaluation"]
    },
    {
      icon: Database,
      title: "DevOps & Infrastructure",
      skills: ["Jenkins", "Ansible", "Apache", "Docker", "Kubernetes", "CI/CD Pipelines"]
    },
    {
      icon: Cloud,
      title: "Cloud",
      skills: ["GCP", "AWS", "Azure", "IAM", "Networking"]
    },
    {
      icon: Globe,
      title: "Web Development",
      skills: ["React", "Node.js", "REST APIs", "Git/GitHub", "Agile/Scrum", "Testing & Deployment"]
    }
  ];

  return (
    <section className="py-20 px-4 bg-secondary/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl">Technical Skills</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive expertise across modern development stack with focus on 
            scalable web applications and DevOps practices.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <IconComponent className="h-5 w-5 text-primary" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}