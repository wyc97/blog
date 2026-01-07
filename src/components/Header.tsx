"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";

const navigation = [
    { name: "Blog", href: "/blog" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
];

export function Header() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="flex items-center justify-between py-10">
            <div>
                <Link href="/" aria-label="DevBlog">
                    <div className="flex items-center justify-between">
                        <div className="mr-3 text-2xl font-bold sm:block">
                            Eachen&apos;s Blog
                        </div>
                    </div>
                </Link>
            </div>
            <div className="flex items-center leading-5 space-x-4 sm:space-x-6">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                            "hidden font-medium text-zinc-900 dark:text-zinc-100 sm:block",
                            pathname === item.href
                                ? "text-blue-500 dark:text-blue-400"
                                : "hover:text-blue-500 dark:hover:text-blue-400"
                        )}
                    >
                        {item.name}
                    </Link>
                ))}
                <ThemeToggle />
                <div className="sm:hidden">
                    <button
                        type="button"
                        className="ml-1 mr-1 h-8 w-8 rounded py-1"
                        aria-label="Toggle Menu"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 flex transform flex-col bg-white opacity-95 dark:bg-zinc-950 dark:opacity-[0.98] sm:hidden">
                    <div className="flex justify-end p-8">
                        <button onClick={() => setMobileMenuOpen(false)}>
                            <X className="h-8 w-8 text-zinc-500" />
                        </button>
                    </div>
                    <nav className="fixed mt-8 h-full w-full">
                        {navigation.map((item) => (
                            <div key={item.name} className="px-12 py-4">
                                <Link
                                    href={item.href}
                                    className="text-2xl font-bold tracking-widest text-zinc-900 dark:text-zinc-100"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            </div>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
