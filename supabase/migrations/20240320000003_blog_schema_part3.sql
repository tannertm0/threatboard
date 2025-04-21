-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_blog_posts_updated_at') THEN
        CREATE TRIGGER update_blog_posts_updated_at
            BEFORE UPDATE ON blog_posts
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_blog_comments_updated_at') THEN
        CREATE TRIGGER update_blog_comments_updated_at
            BEFORE UPDATE ON blog_comments
            FOR EACH ROW
            EXECUTE FUNCTION update_updated_at_column();
    END IF;
END$$;

-- Create function to get auth.uid()
CREATE OR REPLACE FUNCTION get_auth_uid()
RETURNS UUID AS $$
BEGIN
    RETURN auth.uid();
EXCEPTION
    WHEN OTHERS THEN
        RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_bookmarks ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DO $$
BEGIN
    -- Drop blog_posts policies
    DROP POLICY IF EXISTS "Public can view published posts" ON blog_posts;
    DROP POLICY IF EXISTS "Authors can view their own posts" ON blog_posts;
    DROP POLICY IF EXISTS "Authors can create posts" ON blog_posts;
    DROP POLICY IF EXISTS "Authors can update their own posts" ON blog_posts;
    DROP POLICY IF EXISTS "Authors can delete their own posts" ON blog_posts;
    
    -- Drop blog_categories policies
    DROP POLICY IF EXISTS "Anyone can view categories" ON blog_categories;
    DROP POLICY IF EXISTS "Only admins can manage categories" ON blog_categories;
    
    -- Drop blog_tags policies
    DROP POLICY IF EXISTS "Anyone can view tags" ON blog_tags;
    DROP POLICY IF EXISTS "Only admins can manage tags" ON blog_tags;
    
    -- Drop blog_comments policies
    DROP POLICY IF EXISTS "Anyone can view approved comments" ON blog_comments;
    DROP POLICY IF EXISTS "Authenticated users can create comments" ON blog_comments;
    DROP POLICY IF EXISTS "Users can update their own comments" ON blog_comments;
    DROP POLICY IF EXISTS "Users can delete their own comments" ON blog_comments;
    
    -- Drop blog_likes policies
    DROP POLICY IF EXISTS "Anyone can view likes" ON blog_likes;
    DROP POLICY IF EXISTS "Authenticated users can like posts" ON blog_likes;
    DROP POLICY IF EXISTS "Users can unlike their own likes" ON blog_likes;
    
    -- Drop blog_bookmarks policies
    DROP POLICY IF EXISTS "Users can view their own bookmarks" ON blog_bookmarks;
    DROP POLICY IF EXISTS "Authenticated users can bookmark posts" ON blog_bookmarks;
    DROP POLICY IF EXISTS "Users can remove their own bookmarks" ON blog_bookmarks;
END$$;

-- RLS Policies for blog_posts
CREATE POLICY "Public can view published posts"
    ON blog_posts FOR SELECT
    USING (status = 'published');

CREATE POLICY "Authors can view their own posts"
    ON blog_posts FOR SELECT
    USING (auth.uid() = author_id);

CREATE POLICY "Authors can create posts"
    ON blog_posts FOR INSERT
    WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own posts"
    ON blog_posts FOR UPDATE
    USING (auth.uid() = author_id)
    WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can delete their own posts"
    ON blog_posts FOR DELETE
    USING (auth.uid() = author_id);

-- RLS Policies for blog_categories
CREATE POLICY "Anyone can view categories"
    ON blog_categories FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Only admins can manage categories"
    ON blog_categories FOR ALL
    USING (auth.jwt() ->> 'role' = 'admin')
    WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- RLS Policies for blog_tags
CREATE POLICY "Anyone can view tags"
    ON blog_tags FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Only admins can manage tags"
    ON blog_tags FOR ALL
    USING (auth.jwt() ->> 'role' = 'admin')
    WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- RLS Policies for blog_comments
CREATE POLICY "Anyone can view approved comments"
    ON blog_comments FOR SELECT
    USING (is_approved = true OR auth.uid() = author_id);

CREATE POLICY "Authenticated users can create comments"
    ON blog_comments FOR INSERT
    WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update their own comments"
    ON blog_comments FOR UPDATE
    USING (auth.uid() = author_id)
    WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can delete their own comments"
    ON blog_comments FOR DELETE
    USING (auth.uid() = author_id);

-- RLS Policies for blog_likes
CREATE POLICY "Anyone can view likes"
    ON blog_likes FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can like posts"
    ON blog_likes FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike their own likes"
    ON blog_likes FOR DELETE
    USING (auth.uid() = user_id);

-- RLS Policies for blog_bookmarks
CREATE POLICY "Users can view their own bookmarks"
    ON blog_bookmarks FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can bookmark posts"
    ON blog_bookmarks FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own bookmarks"
    ON blog_bookmarks FOR DELETE
    USING (auth.uid() = user_id);

-- Create indexes for better performance
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_blog_posts_author') THEN
        CREATE INDEX idx_blog_posts_author ON blog_posts(author_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_blog_posts_status') THEN
        CREATE INDEX idx_blog_posts_status ON blog_posts(status);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_blog_posts_created_at') THEN
        CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_blog_comments_post') THEN
        CREATE INDEX idx_blog_comments_post ON blog_comments(post_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_blog_comments_author') THEN
        CREATE INDEX idx_blog_comments_author ON blog_comments(author_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_blog_likes_post') THEN
        CREATE INDEX idx_blog_likes_post ON blog_likes(post_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_blog_likes_user') THEN
        CREATE INDEX idx_blog_likes_user ON blog_likes(user_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_blog_bookmarks_post') THEN
        CREATE INDEX idx_blog_bookmarks_post ON blog_bookmarks(post_id);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_blog_bookmarks_user') THEN
        CREATE INDEX idx_blog_bookmarks_user ON blog_bookmarks(user_id);
    END IF;
END$$;

-- Create function to increment view count
CREATE OR REPLACE FUNCTION increment_post_view_count(post_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE blog_posts
    SET view_count = view_count + 1
    WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER; 