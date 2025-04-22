'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  User, 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Upload,
  ChevronDown,
  Image as ImageIcon
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { ProjectCarousel, Project } from '@/components/project-carousel';
import { PhotoCarousel, Photo } from '@/components/photo-carousel';

// Sample project data
const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'ThreatBoard',
    description: 'A comprehensive security toolkit with vulnerability assessment tools, featuring real-time threat monitoring and reporting.',
    imageUrl: '/placeholder1.jpg',
    tags: ['Next.js', 'Supabase', 'TypeScript', 'Security'],
    githubUrl: 'https://github.com/yourusername/threatboard',
    liveUrl: '/dashboard'
  },
  {
    id: '2',
    title: 'Atlantic Surf Park - Wave Garden',
    description: 'Atlantic Park is a year-round district that is home to a state-of-the-art live entertainment and events venue, creative office space, urban-style residences',
    imageUrl: '/placeholder2.jpg',
    tags: ['Virginia Beach', 'Wave Pool', 'WM Jordan'],
    githubUrl: 'https://github.com/yourusername/homelab'
  },
  {
    id: '3',
    title: 'Network Monitor',
    description: 'Real-time network traffic analysis tool that helps detect anomalies and potential security threats.',
    imageUrl: '/placeholder3.jpg',
    tags: ['Python', 'Data Visualization', 'Network Security'],
    githubUrl: 'https://github.com/yourusername/networkmonitor'
  },
  {
    id: '4',
    title: 'Security Scanner',
    description: 'Automated vulnerability scanning tool that identifies potential security issues in web applications.',
    imageUrl: '/placeholder4.jpg',
    tags: ['Node.js', 'API', 'Security'],
    githubUrl: 'https://github.com/yourusername/securityscanner'
  }
];

// Sample photo data
const PHOTOS: Photo[] = [
  {
    id: '1',
    url: '/placeholder1.jpg',
    alt: 'Security conference presentation',
    caption: 'Speaking at CyberSec 2023 Conference'
  },
  {
    id: '2',
    url: '/placeholder2.jpg',
    alt: 'Team collaboration',
    caption: 'Working with the security team on threat detection'
  },
  {
    id: '3',
    url: '/placeholder3.jpg',
    alt: 'Award ceremony',
    caption: 'Receiving the Cybersecurity Excellence Award'
  },
  {
    id: '4',
    url: '/placeholder4.jpg',
    alt: 'Workshop session',
    caption: 'Leading a workshop on penetration testing'
  }
];

export default function AboutPage() {
  // State for animations
  const [animationStates, setAnimationStates] = useState({
    header: false,
    aboutMe: false,
    photoGallery: false,
    projects: false,
    experience: false,
    accordionSection: false,
    skills: false,
    education: false
  });
  
  // Individual accordion states for each section
  const [internshipsOpen, setInternshipsOpen] = useState(false);
  const [courseworkOpen, setCourseworkOpen] = useState(false);
  const [sideProjectsOpen, setSideProjectsOpen] = useState(false);
  
  // Experience section dropdown states
  const [zellaOpen, setZellaOpen] = useState(false);
  const [sheepdogOpen, setSheepdogOpen] = useState(false);
  const [papaJohnsOpen, setPapaJohnsOpen] = useState(false);
  
  // Experience section tab states
  const [zellaTab, setZellaTab] = useState("what-i-did");
  const [sheepdogTab, setSheepdogTab] = useState("what-i-did");
  const [papaJohnsTab, setPapaJohnsTab] = useState("what-i-did");
  
  // Fade-in animation with sequence
  useEffect(() => {
    const animationSequence = async () => {
      // Helper function to set a specific section to visible and wait
      const animateSection = (section: string, delay: number): Promise<void> => {
        return new Promise<void>(resolve => {
          setTimeout(() => {
            setAnimationStates(prev => ({ ...prev, [section]: true }));
            resolve();
          }, delay);
        });
      };
      
      // Start the animation sequence
      await animateSection('header', 300);
      await animateSection('aboutMe', 600);
      await animateSection('photoGallery', 600);
      await animateSection('projects', 600);
      await animateSection('experience', 600);
      await animateSection('accordionSection', 600);
      await animateSection('skills', 600);
      await animateSection('education', 600);
    };
    
    animationSequence();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <header className={`mb-12 flex flex-col md:flex-row gap-8 items-center transition-opacity duration-1000 ease-in-out ${
          animationStates.header ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="relative">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
              <Image 
                src="/profile.jpg" 
                alt="Profile Picture" 
                width={200} 
                height={200} 
                className="object-cover w-full h-full"
                priority
              />
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2 text-foreground">Tanner League</h1>
            <h2 className="text-2xl text-muted-foreground mb-4">Cybersecurity Professional</h2>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
              <Button variant="outline" className="gap-2">
                <Mail size={16} />
                tannerleague@outlook.com
              </Button>
              <Link href="https://github.com/yourusername" target="_blank" className="inline-flex">
                <Button variant="outline" className="gap-2">
                  <Github size={16} />
                  GitHub
                </Button>
              </Link>
              <Link href="https://www.linkedin.com/in/tanner-league-92281a27" target="_blank" className="inline-flex">
                <Button variant="outline" className="gap-2">
                  <Linkedin size={16} />
                  LinkedIn
                </Button>
              </Link>
              <Link href="/resume.html" target="_blank">
                <Button className="gap-2">
                  <Download size={16} />
                  Download Resume
                </Button>
              </Link>
            </div>
          </div>
        </header>
        
        <section className={`mb-10 transition-all duration-1000 transform ${
          animationStates.aboutMe ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Card>
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                A passionate cybersecurity professional with expertise in backend system operations, user and permission management, and 
                secure application development. My background combines technical skills across platforms like WordPress, AWS, and Google Admin
                with a strong foundation in information security principles. I'm currently pursuing an Associates Degree in Cybersecurity while
                gaining hands-on experience through professional roles. I'm dedicated to building robust security solutions that protect organizations 
                from evolving cyber threats while maintaining system uptime and efficiency.
              </p>
            </CardContent>
          </Card>
        </section>
        
        {/* Photo Gallery Section */}
        <section className={`mb-10 transition-all duration-1000 transform ${
          animationStates.photoGallery ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon size={20} />
                Photo Gallery
              </CardTitle>
              <CardDescription>
                Highlights from conferences, workshops, and professional events
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 pb-12">
              <PhotoCarousel 
                photos={PHOTOS}
                aspectRatio="video"
                className="h-full py-2"
              />
            </CardContent>
          </Card>
        </section>
        
        {/* Projects Section */}
        <section className={`mb-10 transition-all duration-1000 transform ${
          animationStates.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code size={20} />
                Featured Projects
              </CardTitle>
              <CardDescription>
                Recent projects in cybersecurity and application development
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 pb-12">
              <ProjectCarousel 
                projects={PROJECTS} 
                className="h-full py-2"
              />
            </CardContent>
          </Card>
        </section>
        
        <section className={`mb-10 transition-all duration-1000 transform ${
          animationStates.experience ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase size={20} />
                Experience
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Zella Company */}
              <div className="border rounded-lg overflow-hidden">
                <div 
                  className="flex justify-between items-center p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setZellaOpen(!zellaOpen)}
                >
                  <div>
                    <h3 className="text-lg font-medium">Partner/Administrative Assistant</h3>
                    <div className="text-sm text-muted-foreground">The Zella Company, Williamsburg, VA</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">September 2023 - Present</span>
                    <ChevronDown 
                      size={18} 
                      className={`transition-transform ${zellaOpen ? 'rotate-180' : ''}`}
                    />
                  </div>
                </div>
                
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  zellaOpen ? 'max-h-[400px]' : 'max-h-0'
                }`}>
                  <div className="border-t">
                    <Tabs value={zellaTab} onValueChange={setZellaTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="what-i-did">What I Did</TabsTrigger>
                        <TabsTrigger value="accomplishments">Accomplishments</TabsTrigger>
                      </TabsList>
                      <TabsContent value="what-i-did" className="p-4">
                        <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-1">
                          <li>Managed comprehensive backend operations for multiple online brands, ensuring 24/7 uptime</li>
                          <li>Led user and permission management across five Google Admin environments and extended IAM systems</li>
                          <li>Identified technical trends and optimized processes to enhance security posture</li>
                          <li>Strengthened team communication, organization, and project management skills</li>
                        </ul>
                      </TabsContent>
                      <TabsContent value="accomplishments" className="p-4">
                        <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-1">
                          <li>Reduced security incidents by 40% through implementation of enhanced access controls</li>
                          <li>Streamlined backend operations resulting in 25% faster deployment of updates</li>
                          <li>Successfully migrated 3 e-commerce platforms to more secure hosting environments</li>
                          <li>Developed comprehensive documentation for all technical processes and security protocols</li>
                        </ul>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
              
              {/* Iron Sheepdog */}
              <div className="border rounded-lg overflow-hidden">
                <div 
                  className="flex justify-between items-center p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setSheepdogOpen(!sheepdogOpen)}
                >
                  <div>
                    <h3 className="text-lg font-medium">IT/Cybersecurity Intern</h3>
                    <div className="text-sm text-muted-foreground">Iron Sheepdog, Williamsburg, VA</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">June 2022 - October 2023</span>
                    <ChevronDown 
                      size={18} 
                      className={`transition-transform ${sheepdogOpen ? 'rotate-180' : ''}`}
                    />
                  </div>
                </div>
                
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  sheepdogOpen ? 'max-h-[400px]' : 'max-h-0'
                }`}>
                  <div className="border-t">
                    <Tabs value={sheepdogTab} onValueChange={setSheepdogTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="what-i-did">What I Did</TabsTrigger>
                        <TabsTrigger value="accomplishments">Accomplishments</TabsTrigger>
                      </TabsList>
                      <TabsContent value="what-i-did" className="p-4">
                        <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-1">
                          <li>Spearheaded cybersecurity initiatives under the guidance of senior IT staff</li>
                          <li>Created and delivered security awareness training to staff members</li>
                          <li>Conducted regular vulnerability scans and assisted with remediation efforts</li>
                          <li>Participated in the development of security policies and procedures</li>
                        </ul>
                      </TabsContent>
                      <TabsContent value="accomplishments" className="p-4">
                        <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-1">
                          <li>Successfully trained over 50 employees on security best practices</li>
                          <li>Identified and helped resolve 15 critical security vulnerabilities</li>
                          <li>Created a comprehensive security awareness program from scratch</li>
                          <li>Contributed to a 30% improvement in security compliance scores</li>
                        </ul>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
              
              {/* Papa Johns */}
              <div className="border rounded-lg overflow-hidden">
                <div 
                  className="flex justify-between items-center p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setPapaJohnsOpen(!papaJohnsOpen)}
                >
                  <div>
                    <h3 className="text-lg font-medium">Shift Leader (Part-time)</h3>
                    <div className="text-sm text-muted-foreground">Papa Johns International Inc., Williamsburg, VA</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">August 2021 - March 2022</span>
                    <ChevronDown 
                      size={18} 
                      className={`transition-transform ${papaJohnsOpen ? 'rotate-180' : ''}`}
                    />
                  </div>
                </div>
                
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  papaJohnsOpen ? 'max-h-[400px]' : 'max-h-0'
                }`}>
                  <div className="border-t">
                    <Tabs value={papaJohnsTab} onValueChange={setPapaJohnsTab} className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="what-i-did">What I Did</TabsTrigger>
                        <TabsTrigger value="accomplishments">Accomplishments</TabsTrigger>
                      </TabsList>
                      <TabsContent value="what-i-did" className="p-4">
                        <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-1">
                          <li>Supervised staff during assigned shifts, ensuring adherence to company procedures</li>
                          <li>Managed customer service issues and maintained quality control standards</li>
                          <li>Coordinated with team members to ensure timely order fulfillment</li>
                          <li>Handled cash management and end-of-day reconciliation procedures</li>
                        </ul>
                      </TabsContent>
                      <TabsContent value="accomplishments" className="p-4">
                        <ul className="list-disc list-inside text-muted-foreground space-y-1 pl-1">
                          <li>Improved shift efficiency by 15% through better task delegation</li>
                          <li>Received customer service excellence recognition on multiple occasions</li>
                          <li>Trained 8 new employees who successfully integrated into the team</li>
                          <li>Maintained 100% accuracy on cash handling responsibilities</li>
                        </ul>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        
        <section className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 transition-all duration-1000 transform ${
          animationStates.accordionSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Internships */}
          <Card>
            <div 
              className="cursor-pointer"
              onClick={() => setInternshipsOpen(!internshipsOpen)}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Briefcase size={20} />
                    Internships
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform ${internshipsOpen ? 'rotate-180' : ''}`}
                  />
                </CardTitle>
              </CardHeader>
            </div>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
              internshipsOpen ? 'max-h-96' : 'max-h-0'
            }`}>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-md font-medium">IT/Cybersecurity Intern</h3>
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">Iron Sheepdog, Williamsburg, VA</div>
                  <p className="text-sm text-muted-foreground">Spearheaded cybersecurity initiatives, created awareness training, conducted vulnerability scans.</p>
                </div>
              </CardContent>
            </div>
          </Card>
          
          {/* Coursework */}
          <Card>
            <div 
              className="cursor-pointer"
              onClick={() => setCourseworkOpen(!courseworkOpen)}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <GraduationCap size={20} />
                    Coursework
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform ${courseworkOpen ? 'rotate-180' : ''}`}
                  />
                </CardTitle>
              </CardHeader>
            </div>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
              courseworkOpen ? 'max-h-96' : 'max-h-0'
            }`}>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Network Attacks and </li>
                  
                </ul>
              </CardContent>
            </div>
          </Card>
          
          {/* Side Projects */}
          <Card>
            <div 
              className="cursor-pointer"
              onClick={() => setSideProjectsOpen(!sideProjectsOpen)}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Code size={20} />
                    Side Projects
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform ${sideProjectsOpen ? 'rotate-180' : ''}`}
                  />
                </CardTitle>
              </CardHeader>
            </div>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
              sideProjectsOpen ? 'max-h-96' : 'max-h-0'
            }`}>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-md font-medium mb-1">Network Home Lab</h3>
                  <p className="text-sm text-muted-foreground">Created a personalized home lab using an old computer, uses Ubuntu, Docker, PfSense, I wanted this to be a project that I could test and play around with different technologies</p>
                </div>
              </CardContent>
            </div>
          </Card>
        </section>
        
        <section className={`mb-10 transition-all duration-1000 transform ${
          animationStates.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Card>
            <CardHeader>
              <CardTitle>Skills & Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Cybersecurity Frameworks', 'Risk Assessment', 'Network Security', 'Malware Identification', 'Threat Hunting', 'IAM', 'Linux/Windows', 'Technical Troubleshooting', 'AWS', 'Splunk', 'OSINT', 'Team Collaboration'].map((skill) => (
                      <div key={skill} className="bg-muted px-3 py-1 rounded-full text-sm">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Certifications</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>CompTIA Security+</li>
                    <li>AWS Cloud Practitioner</li>
                    <li>Last Mile Education Fund Recipient (Microsoft Cybersecurity)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        
        <section className={`transition-all duration-1000 transform ${
          animationStates.education ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-medium">Associates Degree in IST - Cybersecurity</h3>
                  <span className="text-sm text-muted-foreground">Expected: July 2025</span>
                </div>
                <div className="text-muted-foreground">Blue Ridge Community College, Weyers Cave, VA</div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
} 