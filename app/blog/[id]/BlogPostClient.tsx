'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow, format } from 'date-fns';
import { Heart, Edit, ArrowLeft, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { createSupabaseClient, handleAuthError } from '@/utils/supabase/client';

type BlogPost = {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
  published_at: string | null;
  view_count: number;
  author_id: string;
  slug: string;
};

// Client Component that receives the ID as a prop
export default function BlogPostClient({ postId }: { postId: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasLiked, setHasLiked] = useState(false);
  const router = useRouter();
  
  // Initialize Supabase client using our utility function
  const supabase = createSupabaseClient();

  useEffect(() => {
    fetchPost();
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
      
      setPost(data);
      
      // Check if user has liked this post
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: likeData } = await supabase
          .from('blog_likes')
          .select('*')
          .eq('post_id', postId)
          .eq('user_id', user.id)
          .single();
          
        setHasLiked(!!likeData);
      }
      
      // Increment view count
      incrementViewCount();
    } catch (error) {
      console.error('Error fetching post:', error);
      handleAuthError(error, 'Failed to load blog post');
      router.push('/blog');
    } finally {
      setLoading(false);
    }
  };

  const incrementViewCount = async () => {
    if (!supabase || !post) return;
    
    try {
      const { error } = await supabase.rpc('increment_post_view_count', {
        post_id: post.id
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error incrementing view count:', error);
    }
  };

  const handleLike = async () => {
    if (!supabase || !post) return;
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast('You must be logged in to like posts');
        return;
      }
      
      if (hasLiked) {
        // Unlike
        const { error } = await supabase
          .from('blog_likes')
          .delete()
          .eq('post_id', post.id)
          .eq('user_id', user.id);
          
        if (error) throw error;
        setHasLiked(false);
        toast('Post unliked');
      } else {
        // Like
        const { error } = await supabase
          .from('blog_likes')
          .insert({
            post_id: post.id,
            user_id: user.id
          });
          
        if (error) throw error;
        setHasLiked(true);
        toast('Post liked');
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      handleAuthError(error, 'Failed to update like status');
    }
  };

  const handleEdit = () => {
    router.push(`/blog/edit/${postId}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500">Published</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'archived':
        return <Badge variant="secondary">Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
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

  if (!post) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-500 mb-4">The blog post you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => router.push('/blog')}>Back to Blog Posts</Button>
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
          onClick={() => router.push('/blog')}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog Posts
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl mb-2">{post.title}</CardTitle>
              <div className="flex items-center gap-2 mb-2">
                {getStatusBadge(post.status)}
                <span className="text-sm text-gray-500">
                  {post.published_at 
                    ? `Published ${formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}`
                    : `Created ${formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}`}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleLike} className="flex items-center gap-1">
                <Heart className={`h-4 w-4 ${hasLiked ? 'fill-current' : ''}`} />
                {hasLiked ? 'Liked' : 'Like'}
              </Button>
              <Button variant="outline" size="sm" onClick={handleEdit} className="flex items-center gap-1">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            </div>
          </div>
          <CardDescription>
            Last updated: {format(new Date(post.updated_at), 'PPP')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {post.view_count} views
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 