"use client";
import React, { useState, useEffect } from "react";
import Image from 'next/image'

interface Post {
  title: string;
  contents: string;
}


export default function Contents() {
    const server: string = "http://localhost:5000";
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    //fetches data from server
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
            } catch (err) {
                if (err instanceof Error) {
                    console.error(err);
                    setError(err.message);
                }
            }
        }
        getPosts();
    }, []);

    // runs if couldn't fetch data from server, will likely occur if server is down or client loses connection
    if (error) {
        return (
            <div className="flex flex-col bg-red-100 m-2 p-3 rounded-lg">
                <h2 className="text-lg font-bold text-red-600">ERROR GETTING POSTS</h2>
                <p>{error}</p>
            </div>
        );
    }

    // if it hasn't loaded yet
    if (!posts) {
        return (
            <div className="flex flex-col h-full w-full items-center justify-center">
                <Image src="/loading.gif" alt="loading..." className="w-16 h-16" />
                
            </div>
        );
    }

    // normal function
    return (
        <div className="space-y-4 p-4">
            {posts.map((post, index) => (
                <div
                    key={index}
                    className="flex flex-col shadow-sm shadow-[#6a4bca] dark:shadow-[#6043b5] bg-[#745ac3] dark:bg-[#473286] m-2 p-4 rounded-lg dark:text-white"
                >
                    <h2 className="text-lg font-bold">{post.title}</h2>
                    <p>{post.contents}</p>
                </div>
            ))}
        </div>
    );
}
