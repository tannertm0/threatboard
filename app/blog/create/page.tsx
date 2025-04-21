import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import BlogPostForm from "./blog-post-form";

export default async function CreateBlogPage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect to sign-in if no user
  if (!user) {
    return redirect("/auth/signin?redirectTo=/blog/create");
  }

  return (
    <div className="container mx-auto py-8">
      <BlogPostForm user={user} />
    </div>
  );
} 