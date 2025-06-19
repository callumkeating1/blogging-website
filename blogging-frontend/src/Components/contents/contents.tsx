import React, { useState, useEffect } from "react";

export default function Contents() {
    const server: string = "http://localhost:5000";
    const [posts, setPosts] = useState<any[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function getPosts() {
            try {
                console.log("Fetching:", server + "/post/getRecent");
                const res = await fetch(server + "/post/getRecent");
                if (!res.ok) {
                    throw new Error("Server returned response: " + res.status);
                }
                const data = await res.json();
                console.log("Fetched Data:", data);
                setPosts(data.posts);
            } catch (err: any) {
                console.error(err);
                setError(err.message);
            }
        }
        getPosts();
    }, []);

    if (error) {
        return (
            <div className="flex flex-col bg-red-100 m-2 p-3 rounded-lg">
                <h2 className="text-lg font-bold text-red-600">ERROR GETTING POSTS</h2>
                <p>{error}</p>
            </div>
        );
    }

    if (!posts) {
        return (
            <div className="flex flex-col h-full w-full items-center justify-center">
                <img src="/loading.gif" alt="loading..." className="w-16 h-16" />
            </div>
        );
    }

    return (
        <div className="space-y-4 p-4">
            {posts.map((post, index) => (
                <div
                    key={index}
                    className="flex flex-col bg-slate-300 m-2 p-4 rounded-lg shadow"
                >
                    <h2 className="text-lg font-bold">{post.title}</h2>
                    <p>{post.contents}</p>
                </div>
            ))}
        </div>
    );
}
