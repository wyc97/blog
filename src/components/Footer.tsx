import Link from "next/link";
import { Rss } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        © {new Date().getFullYear()} DevBlog. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link
                            href="/feed.xml"
                            className="flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                        >
                            <Rss className="h-4 w-4" />
                            <span>RSS</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
