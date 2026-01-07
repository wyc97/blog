import Link from "next/link";
import { getAllPosts } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { ProfileSidebar } from "@/components/ProfileSidebar";

export default async function Home() {
    const posts = getAllPosts();
    const MAX_DISPLAY = 5;

    return (
        <div className="grid grid-cols-1 gap-12 pt-6 md:grid-cols-[280px_1fr] md:gap-12 lg:gap-20">
            {/* Left Sidebar */}
            <div className="hidden md:block">
                <div className="sticky top-24">
                    <ProfileSidebar />
                </div>
            </div>

            {/* Mobile Profile (Visible only on small screens) */}
            <div className="md:hidden flex flex-col items-center">
                <ProfileSidebar />
                <div className="my-8 h-px w-full bg-zinc-200 dark:bg-zinc-800" />
            </div>

            {/* Main Content */}
            <div className="divide-y divide-zinc-200 dark:divide-zinc-700">
                <div className="space-y-2 pb-8 md:space-y-5">
                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                        Latest
                    </h1>
                    <p className="text-lg leading-7 text-zinc-500 dark:text-zinc-400">
                        Exploring the frontiers of technology, design, and life.
                    </p>
                </div>
                <ul className="divide-y divide-zinc-200 dark:divide-zinc-700">
                    {!posts.length && <li className="py-12">No posts found.</li>}
                    {posts.slice(0, MAX_DISPLAY).map((post) => {
                        const { slug, date, title, excerpt, tags } = post;
                        return (
                            <li key={slug} className="py-4">
                                <article className="group relative rounded-2xl p-6 transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-1 dark:hover:bg-zinc-800/50 dark:hover:shadow-violet-900/10">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-sm">
                                            <time dateTime={date} className="font-medium text-[var(--primary)]/80 dark:text-[var(--primary)]/60">
                                                {formatDate(date)}
                                            </time>
                                            <div className="flex gap-2">
                                                {tags.map((tag) => (
                                                    <span key={tag} className="text-xs uppercase text-zinc-400 dark:text-zinc-500">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <h2 className="text-2xl font-bold leading-tight tracking-tight">
                                                <Link
                                                    href={`/blog/${slug}`}
                                                    className="text-zinc-700 dark:text-zinc-200 group-hover:text-[var(--primary)] transition-colors"
                                                >
                                                    {title}
                                                </Link>
                                            </h2>
                                            <div className="prose max-w-none text-zinc-500 dark:text-zinc-400 line-clamp-3 text-base">
                                                {excerpt}
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            <Link
                                                href={`/blog/${slug}`}
                                                className="text-sm font-medium text-[var(--primary)] hover:opacity-80"
                                                aria-label={`Read "${title}"`}
                                            >
                                                Read more &rarr;
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            </li>
                        );
                    })}
                </ul>
                {posts.length > MAX_DISPLAY && (
                    <div className="flex justify-end pt-8 text-base font-medium leading-6">
                        <Link
                            href="/blog"
                            className="text-[var(--primary)] hover:opacity-80"
                            aria-label="All posts"
                        >
                            All Posts &rarr;
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
