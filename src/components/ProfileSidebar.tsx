import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export function ProfileSidebar() {
    return (
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="relative mb-6">
                <img
                    src="/avatar.png"
                    alt="Eachen"
                    className="h-32 w-32 rounded-full object-cover ring-2 ring-zinc-200 dark:ring-zinc-800 p-1"
                />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                Eachen Author
            </h2>
            <p className="mt-2 text-zinc-500 dark:text-zinc-400">
                Full Stack Developer
            </p>
            <p className="mt-4 max-w-xs text-sm text-zinc-500 dark:text-zinc-400">
                Hi! I'm a software engineer passionate about modern web technologies, sharing my journey in React, Next.js, and system design.
            </p>

            <div className="mt-6 flex space-x-4">
                <Link
                    href="https://github.com/wyc97"
                    target="_blank"
                    className="text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">Github</span>
                </Link>
                <Link
                    href="https://twitter.com"
                    target="_blank"
                    className="text-zinc-400 transition-colors hover:text-blue-500"
                >
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Twitter</span>
                </Link>
                <Link
                    href="mailto:contact@example.com"
                    className="text-zinc-400 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                </Link>
            </div>
        </div>
    );
}
