'use client';

import React from 'react';
import { 
  AlertTriangle, 
  Code, 
  Database, 
  Github, 
  Lock, 
  Shield, 
  Terminal, 
  Wrench, 
  Zap 
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function ProjectPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-foreground">About ThreatBoard</h1>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <Badge variant="outline" className="text-sm px-3 py-1">Next.js</Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">TypeScript</Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">Supabase</Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">React</Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">Cybersecurity</Badge>
          </div>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            ThreatBoard is a comprehensive security toolkit designed to provide cybersecurity professionals with the tools they need for threat monitoring, vulnerability assessment, and security analysis.
          </p>
        </header>
        
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Project Overview
              </CardTitle>
              <CardDescription>
                What is ThreatBoard and why was it created?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                ThreatBoard was created as a centralized platform for cybersecurity tools and resources. The project aims to consolidate various security utilities into a single, user-friendly interface, making it easier for security professionals to monitor threats, analyze vulnerabilities, and respond to incidents.
              </p>
              <p className="text-muted-foreground">
                With the increasing frequency and sophistication of cyber attacks, having quick access to security tools and threat intelligence is essential. ThreatBoard addresses this need by integrating multiple data sources and providing robust analysis capabilities.
              </p>
            </CardContent>
          </Card>
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-primary" />
                Key Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Vulnerability Board</span>
                    <p className="text-sm text-muted-foreground">Track and monitor the latest security vulnerabilities and CVEs</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Lock className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Password Generator</span>
                    <p className="text-sm text-muted-foreground">Generate secure passwords with customizable parameters</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Virus Scanner</span>
                    <p className="text-sm text-muted-foreground">Scan files for potential security threats</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Database className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Malware Database</span>
                    <p className="text-sm text-muted-foreground">Access a database of recent malware samples for research</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                Technology Stack
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Zap className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Next.js & React</span>
                    <p className="text-sm text-muted-foreground">Modern frontend framework for building a responsive UI</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Terminal className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">TypeScript</span>
                    <p className="text-sm text-muted-foreground">Type-safe language for robust code quality</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Database className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Supabase</span>
                    <p className="text-sm text-muted-foreground">Backend services for authentication and data storage</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Security APIs</span>
                    <p className="text-sm text-muted-foreground">Integration with various security data providers</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
        
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Github className="h-5 w-5 text-primary" />
                Open Source & Contribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                ThreatBoard is an open-source project committed to improving cybersecurity tools and accessibility. We welcome contributions from security enthusiasts, developers, and researchers who share our mission of making security tools more accessible and effective.
              </p>
              <div className="flex flex-wrap gap-3 mt-4">
                <Link 
                  href="https://github.com/yourusername/threatboard" 
                  target="_blank" 
                  className="inline-flex items-center gap-2 px-4 py-2 border rounded-md text-sm font-medium hover:bg-accent transition-colors"
                >
                  <Github className="h-4 w-4" />
                  GitHub Repository
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
        
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Future Development</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                ThreatBoard is continuously evolving with new features and improvements planned:
              </p>
              <ul className="space-y-2 text-muted-foreground list-disc pl-5">
                <li>Enhanced threat intelligence integration</li>
                <li>Advanced network monitoring tools</li>
                <li>Expanded malware analysis capabilities</li>
                <li>Customizable security dashboards</li>
                <li>Community-driven vulnerability reporting</li>
                <li>Comprehensive API documentation for developers</li>
              </ul>
            </CardContent>
            <CardFooter className="border-t pt-6">
              <p className="text-sm text-muted-foreground">
                Have suggestions or feature requests? Feel free to open an issue on GitHub or contact the development team.
              </p>
            </CardFooter>
          </Card>
        </section>
      </div>
    </div>
  );
} 