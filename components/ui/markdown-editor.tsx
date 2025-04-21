'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { Button } from './button';
import { HelpCircle, Bold, Italic, Link, List, ListOrdered, Image, Video, Code, Heading2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './dialog';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
  name?: string;
  required?: boolean;
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder = 'Write your content in Markdown...',
  rows = 10,
  className = '',
  name,
  required = false,
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState<string>('edit');
  const [helpOpen, setHelpOpen] = useState(false);

  const insertMarkdown = (prefix: string, suffix: string = '') => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = 
      value.substring(0, start) + 
      prefix + selectedText + suffix + 
      value.substring(end);
    
    onChange(newText);
    
    // Set cursor position after operation
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length, 
        end + prefix.length
      );
    }, 0);
  };

  const insertMarkdownControls = [
    { icon: <Bold size={16} />, action: () => insertMarkdown('**', '**'), title: 'Bold' },
    { icon: <Italic size={16} />, action: () => insertMarkdown('*', '*'), title: 'Italic' },
    { icon: <Link size={16} />, action: () => insertMarkdown('[', '](url)'), title: 'Link' },
    { icon: <List size={16} />, action: () => insertMarkdown('- '), title: 'Bullet List' },
    { icon: <ListOrdered size={16} />, action: () => insertMarkdown('1. '), title: 'Numbered List' },
    { icon: <Image size={16} />, action: () => insertMarkdown('![alt text](', ')'), title: 'Image' },
    { icon: <Video size={16} />, action: () => insertMarkdown('<video src="url" controls></video>'), title: 'Video' },
    { icon: <Code size={16} />, action: () => insertMarkdown('```\n', '\n```'), title: 'Code Block' },
    { icon: <Heading2 size={16} />, action: () => insertMarkdown('## '), title: 'Heading' },
  ];

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
  ];

  return (
    <div className={`w-full ${className}`}>
      <Tabs defaultValue="edit" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-2">
          <TabsList>
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center space-x-1">
            {activeTab === 'edit' && insertMarkdownControls.map((control, index) => (
              <Button 
                key={index} 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0" 
                onClick={(e) => {
                  e.preventDefault();
                  control.action();
                }}
                title={control.title}
              >
                {control.icon}
              </Button>
            ))}
            
            <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 ml-2" 
                  title="Markdown Help"
                >
                  <HelpCircle size={16} />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Markdown Guide</DialogTitle>
                  <DialogDescription>
                    Format your text using Markdown syntax
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
          </div>
        </div>
        
        <TabsContent value="edit" className="mt-0">
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className="font-mono resize-y"
            name={name}
            required={required}
          />
        </TabsContent>
        
        <TabsContent value="preview" className="mt-0">
          <div className="border rounded-md p-4 min-h-[200px] prose dark:prose-invert max-w-full">
            {value ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSanitize]}
              >
                {value}
              </ReactMarkdown>
            ) : (
              <p className="text-muted-foreground">Nothing to preview</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 