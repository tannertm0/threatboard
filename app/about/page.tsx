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
  
  // Accordion states
  const [openSections, setOpenSections] = useState({
    internships: false,
    coursework: false,
    sideProjects: false
  });
  
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
  
  const toggleSection = (section: 'internships' | 'coursework' | 'sideProjects') => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section]
    });
  };

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
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-medium">Partner/Administrative Assistant</h3>
                  <span className="text-sm text-muted-foreground">September 2023 - Present</span>
                </div>
                <div className="text-muted-foreground mb-2">The Zella Company, Williamsburg, VA</div>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Manage comprehensive backend operations for multiple online brands, ensuring 24/7 uptime and strong cybersecurity standards for platforms like WordPress, AWS, Google, and Woocommerce</li>
                  <li>Lead user and permission management across five Google Admin environments and extended IAM systems</li>
                  <li>Identify technical trends and optimize processes to enhance security posture</li>
                  <li>Strengthen team communication, organization, and project management skills through collaborative problem-solving</li>
                </ul>
              </div>
              
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-medium">IT/Cybersecurity Intern</h3>
                  <span className="text-sm text-muted-foreground">June 2022 - October 2023</span>
                </div>
                <div className="text-muted-foreground mb-2">Iron Sheepdog, Williamsburg, VA</div>
                <p className="text-sm text-muted-foreground">Spearheaded cybersecurity initiatives, created awareness training, conducted vulnerability scans.</p>
              </div>

              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-lg font-medium">Shift Leader (Part-time)</h3>
                  <span className="text-sm text-muted-foreground">August 2021 - March 2022</span>
                </div>
                <div className="text-muted-foreground mb-2">Papa Johns International Inc., Williamsburg, VA</div>
                <p className="text-sm text-muted-foreground">Developed transferable skills in leadership, customer service, and team management.</p>
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
              onClick={() => toggleSection('internships')}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Briefcase size={20} />
                    Internships
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform ${openSections.internships ? 'rotate-180' : ''}`}
                  />
                </CardTitle>
              </CardHeader>
            </div>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
              openSections.internships ? 'max-h-96' : 'max-h-0'
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
              onClick={() => toggleSection('coursework')}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <GraduationCap size={20} />
                    Coursework
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform ${openSections.coursework ? 'rotate-180' : ''}`}
                  />
                </CardTitle>
              </CardHeader>
            </div>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
              openSections.coursework ? 'max-h-96' : 'max-h-0'
            }`}>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Cybersecurity Fundamentals</li>
                  <li>Network Security & Infrastructure</li>
                  <li>Information Assurance & Management</li>
                  <li>Identity & Access Management</li>
                  <li>Risk Assessment & Mitigation</li>
                  <li>Threat Detection & Hunting</li>
                  <li>Secure Cloud Infrastructure</li>
                </ul>
              </CardContent>
            </div>
          </Card>
          
          {/* Side Projects */}
          <Card>
            <div 
              className="cursor-pointer"
              onClick={() => toggleSection('sideProjects')}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Code size={20} />
                    Side Projects
                  </div>
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform ${openSections.sideProjects ? 'rotate-180' : ''}`}
                  />
                </CardTitle>
              </CardHeader>
            </div>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
              openSections.sideProjects ? 'max-h-96' : 'max-h-0'
            }`}>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-md font-medium mb-1">Security Awareness Training</h3>
                  <p className="text-sm text-muted-foreground">Developed and implemented security awareness training programs reaching over 50 employees.</p>
                </div>
                <div>
                  <h3 className="text-md font-medium mb-1">Security Documentation</h3>
                  <p className="text-sm text-muted-foreground">Created comprehensive documentation for security procedures and incident response protocols.</p>
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