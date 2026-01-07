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

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const { title, date, readingTime, tags, content } = post;

    return (
        <article>
            <div className="xl:divide-y xl:divide-zinc-200 xl:dark:divide-zinc-700">
                <header className="pt-6 xl:pb-6">
                    <div className="space-y-1 text-center">
                        <dl className="space-y-10">
                            <div>
                                <dt className="sr-only">Published on</dt>
                                <dd className="text-base font-medium leading-6 text-zinc-500 dark:text-zinc-400">
                                    <time dateTime={date}>{formatDate(date)}</time>
                                </dd>
                            </div>
                        </dl>
                        <div>
                            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                                {title}
                            </h1>
                        </div>
                    </div>
                </header>
                <div className="divide-y divide-zinc-200 pb-8 dark:divide-zinc-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
                    <dl className="pb-10 pt-6 xl:border-b xl:border-zinc-200 xl:pt-11 xl:dark:border-zinc-700">
                        <dt className="sr-only">Authors</dt>
                        <dd>
                            <ul className="flex justify-center flex-wrap gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                                <li className="flex items-center space-x-2">
                                    <div className="font-medium dark:text-white">
                                        <div>Eachen Author</div>
                                        <div className="text-sm text-zinc-500">@{process.env.TWITTER_USER || "twitter_user"}</div>
                                        <div className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">{readingTime}</div>
                                    </div>
                                </li>
                            </ul>
                        </dd>
                    </dl>
                    <div className="divide-y divide-zinc-200 dark:divide-zinc-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
                        <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">
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
                    </div>
                    <footer>
                        <div className="divide-zinc-200 text-sm font-medium leading-5 dark:divide-zinc-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                            {tags && (
                                <div className="py-4 xl:py-8">
                                    <h2 className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                        Tags
                                    </h2>
                                    <div className="flex flex-wrap">
                                        {tags.map((tag) => (
                                            <Link
                                                key={tag}
                                                href={`/tags/${tag}`} // Planned
                                                className="mr-3 text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                                            >
                                                {tag}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {(
                                <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                                    <Link
                                        href="/blog"
                                        className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                                    >
                                        &larr; Back to the blog
                                    </Link>
                                </div>
                            )}
                        </div>
                    </footer>
                </div>
            </div>
        </article>
    );
}
