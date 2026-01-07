import { Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export const metadata = {
    title: "About - Eachen's Blog",
    description: "About the author",
};

export default function About() {
    return (
        <div className="divide-y divide-zinc-200 dark:divide-zinc-700">
            <div className="space-y-2 pb-8 pt-6 md:space-y-5">
                <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                    About
                </h1>
            </div>
            <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
                <div className="flex flex-col items-center pt-8">
                    <img
                        src="/avatar.png"
                        alt="avatar"
                        className="h-48 w-48 rounded-full mb-4 object-cover"
                    />
                    <h3 className="pb-2 text-2xl font-bold leading-8 tracking-tight">
                        Eachen Author
                    </h3>
                    <div className="text-zinc-500 dark:text-zinc-400">Full Stack Developer</div>
                    <div className="flex space-x-3 pt-6">
                        <Link href="https://github.com/wyc97" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                            <Github className="h-6 w-6" />
                            <span className="sr-only">Github</span>
                        </Link>
                        <Link href="https://twitter.com" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                            <Twitter className="h-6 w-6" />
                            <span className="sr-only">Twitter</span>
                        </Link>
                        <Link href="https://linkedin.com" className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
                            <Linkedin className="h-6 w-6" />
                            <span className="sr-only">LinkedIn</span>
                        </Link>
                    </div>
                </div>
                <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
                    <p>
                        Welcome to my blog! I am a software engineer passionate about modern web technologies.
                    </p>
                    <p>
                        I started this blog to document my learning journey and share technical insights.
                        Here you will find articles about Next.js, React, Tailwind CSS, System Design, and much more.
                    </p>
                    <p>
                        Feel free to reach out to me via social media or check out my code on GitHub.
                    </p>
                </div>
            </div>
        </div>
    );
}
