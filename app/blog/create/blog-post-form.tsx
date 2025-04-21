'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { User } from '@supabase/supabase-js';
import { createBlogPostAction } from '@/app/actions';
import { MarkdownEditor } from '@/components/ui/markdown-editor';

type PostStatus = 'draft' | 'published';

export default function BlogPostForm({ user }: { user: User }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [status, setStatus] = useState<PostStatus>('draft');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();

  // Server action submission handler
  const handleCreatePost = async (formData: FormData) => {
    setError(null);
    
    startTransition(async () => {
      try {
        const result = await createBlogPostAction(formData);
        
        if (result.error) {
          setError(result.error);
          toast(result.error);
          return;
        }
        
        if (result.success && result.postId) {
          toast('Blog post created successfully!');
          router.push(`/blog/${result.postId}`);
        }
      } catch (err: any) {
        console.error('Error creating post:', err);
        setError(err.message || 'An unexpected error occurred');
        toast('Failed to create post');
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Blog Post</CardTitle>
        <CardDescription>Fill in the details below to create a new blog post</CardDescription>
      </CardHeader>
      <form action={handleCreatePost}>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 mb-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="excerpt" className="text-sm font-medium">
              Excerpt
            </label>
            <Textarea
              id="excerpt"
              name="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Enter a brief excerpt (optional)"
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="content" className="text-sm font-medium">
              Content
            </label>
            <input type="hidden" name="content" value={content} />
            <MarkdownEditor
              value={content}
              onChange={setContent}
              placeholder="Write your blog post content using Markdown..."
              rows={15}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium">
              Status
            </label>
            <input 
              type="hidden" 
              name="status" 
              value={status}
            />
            <Select 
              value={status} 
              onValueChange={(value: string) => setStatus(value as PostStatus)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Creating...' : 'Create Post'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}