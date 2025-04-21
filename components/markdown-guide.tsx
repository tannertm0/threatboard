'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { HelpCircle } from 'lucide-react';

export function MarkdownGuide() {
  const [open, setOpen] = useState(false);

  const examples = [
    { title: 'Headings', markdown: '# Heading 1\n## Heading 2\n### Heading 3', description: 'Use # for headings' },
    { title: 'Bold', markdown: '**bold text**', description: 'Surround text with double asterisks' },
    { title: 'Italic', markdown: '*italic text*', description: 'Surround text with single asterisks' },
    { title: 'Links', markdown: '[Link text](https://example.com)', description: 'Create hyperlinks' },
    { title: 'Images', markdown: '![Alt text](https://example.com/image.jpg)', description: 'Insert images' },
    { title: 'Lists', markdown: '- Item 1\n- Item 2\n- Item 3', description: 'Create bullet points with hyphens' },
    { title: 'Numbered Lists', markdown: '1. First item\n2. Second item\n3. Third item', description: 'Create numbered lists' },
    { title: 'Blockquotes', markdown: '> This is a blockquote', description: 'Use > for quotes' },
    { title: 'Code', markdown: '`inline code`', description: 'Surround with backticks for inline code' },
    { title: 'Code Blocks', markdown: '```\nfunction example() {\n  return true;\n}\n```', description: 'Use triple backticks for code blocks' },
    { title: 'Horizontal Rules', markdown: '---', description: 'Three hyphens create a divider' },
    { title: 'Tables', markdown: '| Header 1 | Header 2 |\n| -------- | -------- |\n| Cell 1   | Cell 2   |', description: 'Create tables with pipes and hyphens' },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <HelpCircle className="h-4 w-4" />
          <span>Markdown Guide</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Markdown Guide</DialogTitle>
          <DialogDescription>
            Markdown is a lightweight markup language that helps you format your text.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          <p className="text-sm text-muted-foreground">
            You can use markdown to add formatting to your blog posts. Here are some common examples:
          </p>
          
          <div className="grid gap-4">
            {examples.map((example, index) => (
              <div key={index} className="border rounded-md p-3">
                <h3 className="text-sm font-medium mb-1">{example.title}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted rounded p-2 text-xs font-mono whitespace-pre">{example.markdown}</div>
                  <div className="text-xs text-muted-foreground">{example.description}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-sm text-muted-foreground mt-4">
            <p>To add videos, you can use HTML:</p>
            <div className="bg-muted rounded p-2 text-xs font-mono my-2">
              {'<video src="url_to_video.mp4" controls></video>'}
            </div>
            <p>For YouTube videos, you can embed them using iframes:</p>
            <div className="bg-muted rounded p-2 text-xs font-mono my-2">
              {'<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID" frameborder="0" allowfullscreen></iframe>'}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 