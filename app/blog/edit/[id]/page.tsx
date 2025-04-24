'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { ArrowLeft, Save } from 'lucide-react';
import { slugify } from '@/lib/utils';
import { createSupabaseClient, handleAuthError } from '@/utils/supabase/client';
import { MarkdownEditor } from '@/components/ui/markdown-editor';

type BlogPost = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  status: 'draft' | 'published' | 'archived';
  slug: string;
};

type ParamsType = Promise<{ id: string }> | { id: string };

export default async function EditBlogPost({ params }: { params: ParamsType }) {
  const { id: postId } = 'then' in params ? await params : params;
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>('draft');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const router = useRouter();
  const supabase = createSupabaseClient();

  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  const fetchPost = async () => {
    if (!supabase) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', postId)
        .single();

      if (error) throw error;
      
      setTitle(data.title);
      setContent(data.content);
      setExcerpt(data.excerpt || '');
      setStatus(data.status);
    } catch (error) {
      console.error('Error fetching post:', error);
      
      // Handle the case where error might be an empty object
      const errorMessage = error && typeof error === 'object' && Object.keys(error).length === 0
        ? 'Failed to load blog post (Server connection error)'
        : 'Failed to load blog post';
        
      handleAuthError(error, errorMessage);
      router.push('/blog');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error('Title and content are required');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Generate a slug from the title if needed
      const slug = slugify(title);
      
      const { error } = await supabase
        .from('blog_posts')
        .update({
          title,
          content,
          excerpt,
          status,
          slug,
          updated_at: new Date().toISOString()
        })
        .eq('id', postId);
        
      if (error) throw error;
      
      toast.success('Blog post updated successfully!');
      router.push(`/blog/${postId}`);
    } catch (error) {
      console.error('Error updating post:', error);
      handleAuthError(error, 'Failed to update blog post');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const goBack = () => {
    router.push(`/blog/${postId}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="flex items-center gap-2"
          onClick={goBack}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Post
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Edit Blog Post</CardTitle>
          <CardDescription>
            Update the details of your blog post.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt (Optional)</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Enter a brief excerpt or summary"
                rows={3}
              />
              <p className="text-xs text-gray-500">
                If left empty, the first 150 characters of the content will be used.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <MarkdownEditor
                value={content}
                onChange={setContent}
                placeholder="Write your blog post content using Markdown..."
                rows={15}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={status}
                onValueChange={(value) => setStatus(value as 'draft' | 'published' | 'archived')}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
} 