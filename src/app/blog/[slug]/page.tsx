import { getPostBySlug, getAllPosts } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

// CSS for code highlighting
import "highlight.js/styles/github-dark.css";

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) {
        return;
    }
    return {
        title: `${post.title} - Eachen's Blog`,
        description: post.excerpt,
    };
}

import Slugger from "github-slugger";
import { TableOfContents } from "@/components/TableOfContents";
import Comments from "@/components/Comments";

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const { title, date, readingTime, tags, content } = post;

    // Extract headings from markdown content
    const slugger = new Slugger();
    const headings = content
        .split("\n")
        .filter((line) => line.match(/^#{2,3}\s/))
        .map((line) => {
            const level = line.match(/^#{2,3}/)?.[0].length || 2;
            const text = line.replace(/^#{2,3}\s/, "");
            const id = slugger.slug(text);
            return { id, text, level };
        });

    return (
        <article className="xl:grid xl:grid-cols-4 xl:items-start xl:gap-x-10 pt-10">
            {/* Left Sidebar (Meta Info) */}
            <div className="pb-8 xl:sticky xl:top-24 xl:col-span-1 xl:pb-0">
                <div className="space-y-8">
                    <div>
                        <Link
                            href="/blog"
                            className="text-sm font-medium text-[var(--primary)] hover:opacity-80 mb-8 block"
                        >
                            &larr; Back to blog
                        </Link>

                        <dl>
                            <dt className="sr-only">Published on</dt>
                            <dd className="text-sm font-medium leading-6 text-zinc-500 dark:text-zinc-400">
                                <time dateTime={date}>{formatDate(date)}</time>
                            </dd>
                        </dl>

                        <h1 className="mt-2 text-3xl font-bold leading-9 tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl sm:leading-10 md:leading-14">
                            {title}
                        </h1>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {tags && tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs font-medium uppercase text-[var(--primary)] opacity-80"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="hidden xl:block border-t border-zinc-200 dark:border-zinc-700 pt-8">
                        <TableOfContents headings={headings} />
                    </div>
                </div>
            </div>

            {/* Right Content */}
            <div className="xl:col-span-3">
                <div className="prose max-w-none dark:prose-invert">
                    <MDXRemote
                        source={content}
                        options={{
                            mdxOptions: {
                                remarkPlugins: [remarkGfm],
                                rehypePlugins: [
                                    rehypeHighlight,
                                    rehypeSlug,
                                    [rehypeAutolinkHeadings, { behavior: "wrap" }],
                                ],
                            },
                        }}
                    />
                </div>

                {/* Mobile Back Link (Visible only on small screens) */}
                <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-700">
                    <Link
                        href="/blog"
                        className="text-[var(--primary)] hover:opacity-80"
                    >
                        &larr; Back to the blog
                    </Link>
                </div>

                <Comments />
            </div>
        </article>
    );
}
