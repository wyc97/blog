"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export default function Comments() {
    const { resolvedTheme } = useTheme();

    return (
        <div className="mt-10 pt-10 border-t border-zinc-200 dark:border-zinc-700">
            <Giscus
                id="comments"
                repo="wyc97/blog"
                repoId="R_kgDOQ1FBJw"
                category="Comments"
                categoryId="DIC_kwDOQ1FBJ84C0rFG"
                mapping="url"
                strict="0"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="top"
                theme={resolvedTheme === "dark" ? "transparent_dark" : "light"}
                lang="zh-CN"
                loading="lazy"
            />
        </div>
    );
}
