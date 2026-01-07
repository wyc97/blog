export const metadata = {
    title: "Projects - Eachen's Blog",
    description: "A selection of projects I've worked on",
};

export default function Projects() {
    return (
        <div className="divide-y divide-zinc-200 dark:divide-zinc-700">
            <div className="space-y-2 pb-8 pt-6 md:space-y-5">
                <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                    Projects
                </h1>
                <p className="text-lg leading-7 text-zinc-500 dark:text-zinc-400">
                    Showcase of my personal and professional work.
                </p>
            </div>
            <div className="container py-12">
                <div className="flex flex-wrap -m-4">
                    {/* Placeholder for project cards */}
                    <div className="p-4 md:w-1/2 w-full">
                        <div className="h-full border-2 border-zinc-200 border-opacity-60 rounded-lg overflow-hidden dark:border-zinc-800">
                            <div className="p-6">
                                <h2 className="tracking-widest text-xs title-font font-medium text-blue-500 mb-1">
                                    NEXT.JS
                                </h2>
                                <h1 className="title-font text-lg font-medium text-zinc-900 mb-3 dark:text-white">
                                    Personal Blog
                                </h1>
                                <p className="leading-relaxed mb-3 text-zinc-500 dark:text-zinc-400">
                                    This very blog you are looking at! Built with Next.js 16, Tailwind CSS v4, and MDX.
                                </p>
                                <div className="flex items-center flex-wrap">
                                    <a href="/" className="text-blue-500 inline-flex items-center md:mb-2 lg:mb-0 hover:text-blue-600 dark:hover:text-blue-400">
                                        Learn More
                                        <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14"></path>
                                            <path d="M12 5l7 7-7 7"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 md:w-1/2 w-full">
                        <div className="h-full border-2 border-zinc-200 border-opacity-60 rounded-lg overflow-hidden dark:border-zinc-800">
                            <div className="flex h-full items-center justify-center p-6 text-zinc-500 dark:text-zinc-400">
                                More projects coming soon...
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
