import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Briefcase, Calendar, MapPin } from "lucide-react";

export function Experience() {
  const experiences = [
    {
      title: "Multi-Agent Robotics Researcher",
      company: "UCL",
      location: "London, UK",
      period: "2025 - Present",
      description: "Developed autonomous target search and retrieval system using TurtleBot3 robots with ROS 2 Humble, achieving zero-collision performance in real-world deployment.",
      technologies: ["Python", "C++", "Gazebo", "Cartographer", "Catkin", "Docker"]
    },
    {
      title: "Software Engineer",
      company: "theSOFTtribe",
      location: "Accra, GH",
      period: "2022 - 2025",
      description: "Built and deployed software infrastructure for a nationwide digital agriculture system supporting 3,500+ users with low-latency performance.",
      technologies: ["TypeScript", "Git", "Python"]
    },
    {
      title: "Software Developer",
      company: "Bornbalanced+",
      location: "Remote",
      period: "2024 - 2025",
      description: "Designed and implemented a scalable backend using Django, PostgreSQL, and GCP-based infrastructure.",
      technologies: ["Python", "Django", "PostgreSQL", "GCP", "Agile"]
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl">Professional Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Over 5 years of experience building scalable web applications and 
            leading development teams in fast-paced environments.
          </p>
        </div>
        
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      {exp.title}
                    </CardTitle>
                    <p className="text-primary mt-1">{exp.company}</p>
                  </div>
                  <div className="flex flex-col md:items-end gap-1">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {exp.period}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {exp.location}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}