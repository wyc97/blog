import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export type Post = {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    coverImage?: string;
    content: string;
    tags: string[];
    category: string;
    readingTime: string;
};

export function getAllPosts(): Post[] {
    // Ensure directory exists
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
        .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
        .map((fileName) => {
            const slug = fileName.replace(/\.mdx?$/, "");
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, "utf8");
            const { data, content } = matter(fileContents);
            const readTime = readingTime(content);

            return {
                slug,
                title: data.title || "Untitled",
                date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
                excerpt: data.excerpt || "",
                coverImage: data.coverImage,
                content,
                tags: data.tags || [],
                category: data.category || "General",
                readingTime: readTime.text,
            };
        });

    // Sort posts by date
    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
    try {
        console.log(`[getPostBySlug] Fetching slug: ${slug}`);
        const decodedSlug = decodeURIComponent(slug);
        console.log(`[getPostBySlug] Decoded slug: ${decodedSlug}`);

        // Try exact match first
        let fullPath = path.join(postsDirectory, `${decodedSlug}.mdx`);
        if (!fs.existsSync(fullPath)) {
            // Try md
            fullPath = path.join(postsDirectory, `${decodedSlug}.md`);
            if (!fs.existsSync(fullPath)) {
                console.log(`[getPostBySlug] File not found: ${fullPath}`);
                return null;
            }
        }
        console.log(`[getPostBySlug] Found file: ${fullPath}`);

        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);
        const readTime = readingTime(content);

        return {
            slug,
            title: data.title,
            date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
            excerpt: data.excerpt || "",
            coverImage: data.coverImage,
            content,
            tags: data.tags || [],
            category: data.category || "General",
            readingTime: readTime.text,
        } as Post;
    } catch (e) {
        console.error(`[getPostBySlug] Error fetching slug ${slug}:`, e);
        return null;
    }
}

export function getAllTags(): string[] {
    const posts = getAllPosts();
    const tags = new Set<string>();
    posts.forEach((post) => {
        post.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
}

export function getAllCategories(): string[] {
    const posts = getAllPosts();
    const categories = new Set<string>();
    posts.forEach((post) => {
        if (post.category) categories.add(post.category);
    });
    return Array.from(categories).sort();
}

export function getPostsByTag(tag: string): Post[] {
    const posts = getAllPosts();
    return posts.filter((post) => post.tags.includes(tag));
}

export function getPostsByCategory(category: string): Post[] {
    const posts = getAllPosts();
    return posts.filter((post) => post.category === category);
}
