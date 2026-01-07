"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
    headings: {
        id: string;
        text: string;
        level: number;
    }[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0% 0% -80% 0%" }
        );

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            headings.forEach((heading) => {
                const element = document.getElementById(heading.id);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    }, [headings]);

    if (!headings?.length) return null;

    return (
        <div className="mt-8 space-y-2">
            <p className="font-medium text-zinc-900 dark:text-zinc-100 mb-4">On this page</p>
            <ul className="space-y-2 text-sm">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        style={{ paddingLeft: (heading.level - 2) * 16 }}
                    >
                        <a
                            href={`#${heading.id}`}
                            className={cn(
                                "block transition-colors hover:text-zinc-900 dark:hover:text-zinc-100",
                                activeId === heading.id
                                    ? "text-[var(--primary)] font-medium"
                                    : "text-zinc-500 dark:text-zinc-400"
                            )}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(heading.id)?.scrollIntoView({
                                    behavior: "smooth",
                                });
                                setActiveId(heading.id);
                            }}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
