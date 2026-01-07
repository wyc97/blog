"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/lib/api";

interface FilteredPostsProps {
    posts: Post[];
}

export function FilteredPosts({ posts }: FilteredPostsProps) {
    const [searchValue, setSearchValue] = useState("");

    const filteredPosts = posts.filter((post) => {
        const searchContent = post.title + post.excerpt + post.tags.join(" ");
        return searchContent.toLowerCase().includes(searchValue.toLowerCase());
    });

    return (
        <div className="divide-y divide-zinc-200 dark:divide-zinc-700">
            <div className="space-y-2 pb-8 pt-6 md:space-y-5">
                <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                    All Posts
                </h1>
                <div className="relative max-w-lg">
                    <input
                        aria-label="Search articles"
                        type="text"
                        placeholder="Search articles"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        className="block w-full rounded-md border border-zinc-300 bg-white px-4 py-2 text-zinc-900 focus:border-blue-500 focus:ring-blue-500 dark:border-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400"
                    />
                    <svg
                        className="absolute right-3 top-3 h-5 w-5 text-zinc-400 dark:text-zinc-300"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
            </div>
            <ul className="divide-y divide-zinc-200 dark:divide-zinc-700">
                {!filteredPosts.length && <li className="py-12">No posts found.</li>}
                {filteredPosts.map((post) => {
                    const { slug, date, title, excerpt, tags } = post;
                    return (
                        <li key={slug} className="py-4">
                            <article className="group relative rounded-2xl p-6 transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-1 dark:hover:bg-zinc-800/50 dark:hover:shadow-violet-900/10">
                                <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                                    <dl>
                                        <dt className="sr-only">Published on</dt>
                                        <dd className="text-base font-medium leading-6 text-[var(--primary)]/80 dark:text-[var(--primary)]/60">
                                            <time dateTime={date}>{formatDate(date)}</time>
                                        </dd>
                                    </dl>
                                    <div className="space-y-5 xl:col-span-3">
                                        <div className="space-y-6">
                                            <div>
                                                <h2 className="text-2xl font-bold leading-8 tracking-tight">
                                                    <Link
                                                        href={`/blog/${slug}`}
                                                        className="text-zinc-700 dark:text-zinc-200 group-hover:text-[var(--primary)] transition-colors"
                                                    >
                                                        {title}
                                                    </Link>
                                                </h2>
                                                <div className="flex flex-wrap pt-2">
                                                    {tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="mr-3 text-sm font-medium uppercase text-[var(--primary)] opacity-80 hover:opacity-100"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="prose max-w-none text-zinc-500 dark:text-zinc-400 line-clamp-3">
                                                {excerpt}
                                            </div>
                                        </div>
                                        <div className="text-base font-medium leading-6">
                                            <Link
                                                href={`/blog/${slug}`}
                                                className="text-[var(--primary)] hover:opacity-80"
                                                aria-label={`Read "${title}"`}
                                            >
                                                Read more &rarr;
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
