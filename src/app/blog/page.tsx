import Link from "next/link";
import { getAllPosts } from "@/lib/api";
import { FilteredPosts } from "@/components/FilteredPosts";

export const metadata = {
    title: "Blog - Eachen's Blog",
    description: "Read my thoughts on software development, design, and more.",
};

export default function BlogPage() {
    const posts = getAllPosts();

    return (
        <FilteredPosts posts={posts} />
    );
}
