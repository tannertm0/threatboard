import { createClient } from "@/utils/supabase/server";

export default async function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  
  return (
    <div className="flex-1 w-full">
      {children}
    </div>
  );
} 