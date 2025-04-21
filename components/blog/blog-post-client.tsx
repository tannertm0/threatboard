"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { toast } from "sonner";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createSupabaseClient, handleAuthError } from "@/utils/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

type BlogPost = {
  id: string;
  title: string;
  content: string;
  status: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  view_count: number;
  author_id: string;
  slug: string;
};

export function BlogPostClient({ postId }: { postId: string }) {
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (postId) {
      fetchPost(postId);
    }
  }, [postId]);

  const fetchPost = async (id: string) => {
    try {
      setLoading(true);
      const supabase = await createSupabaseClient();
      if (!supabase) {
        return;
      }

      // Get the post
      const { data: post, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }

      if (post) {
        setPost(post);
        incrementViewCount(post.id);

        // Check if the user has liked this post
        const { data: user } = await supabase.auth.getUser();
        if (user?.user) {
          const { data: like, error: likeError } = await supabase
            .from("blog_likes")
            .select("*")
            .eq("post_id", post.id)
            .eq("user_id", user.user.id)
            .single();

          if (!likeError && like) {
            setIsLiked(true);
          }
        }

        // Get like count
        const { count, error: countError } = await supabase
          .from("blog_likes")
          .select("*", { count: "exact" })
          .eq("post_id", post.id);

        if (!countError && count !== null) {
          setLikeCount(count);
        }
      }
    } catch (error) {
      handleAuthError(error);
      toast.error("Failed to fetch post");
    } finally {
      setLoading(false);
    }
  };

  const incrementViewCount = async (postId: string) => {
    try {
      const supabase = await createSupabaseClient();
      if (!supabase) {
        return;
      }

      await supabase.rpc("increment_blog_post_views", {
        post_id: postId
      });
    } catch (error) {
      console.error("Error incrementing view count:", error);
    }
  };

  const handleLike = async () => {
    try {
      const supabase = await createSupabaseClient();
      if (!supabase) {
        return;
      }

      const { data: user } = await supabase.auth.getUser();
      if (!user?.user) {
        toast.error("You must be signed in to like posts");
        return;
      }

      if (isLiked) {
        // Unlike
        const { error } = await supabase
          .from("blog_likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", user.user.id);

        if (error) throw error;
        setIsLiked(false);
        setLikeCount(prev => prev - 1);
        toast.success("Post unliked");
      } else {
        // Like
        const { error } = await supabase
          .from("blog_likes")
          .insert({
            post_id: postId,
            user_id: user.user.id
          });

        if (error) throw error;
        setIsLiked(true);
        setLikeCount(prev => prev + 1);
        toast.success("Post liked");
      }
    } catch (error) {
      handleAuthError(error);
      toast.error("Failed to like/unlike post");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-4xl">
          <CardContent className="pt-6">
            <p className="text-center text-gray-500">Post not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>
              <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                <span>
                  {format(new Date(post.created_at), "MMMM d, yyyy")}
                </span>
                <span>•</span>
                <span>{post.view_count} views</span>
              </div>
            </div>
            <Badge variant={post.status === "published" ? "default" : "outline"}>
              {post.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLike}
            className={isLiked ? "text-red-500" : ""}
          >
            <Heart className={`mr-2 h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            {likeCount} {likeCount === 1 ? "Like" : "Likes"}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => router.push(`/blog/edit/${post.id}`)}
          >
            Edit Post
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 