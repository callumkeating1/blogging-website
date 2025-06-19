import React, { useState, useEffect } from "react";

export default function Contents() {
    try {
        const server:string = "http://localhost:5000";
        const [posts, setPosts] = useState<any>(null);
        const [jsonData, setJson] = useState<JSON | null>(null);
        useEffect(() => {
            async function getPosts() {
                console.log("fetching ", server + "/post/getRecent");
                const res = await fetch(server + "/post/getRecent");
                if (!res.ok) {
                    throw new Error("+erver returned response: "+ res.status);
                }
                console.log(await res.json(), "  <----");
                console.log(posts)
            }
            getPosts();
        },[])
        if (!posts) {
            return (
                <div className="flex flex-col h-full w-full items-center justify-center">
                    <img src="/loading.gif" alt="loading..." className="w-16 h-16 justify-self-center" />
                </div>
            );
        }
        console.log("recived\n\n\n\n\n", jsonData)
        if (jsonData !== null) {
            for(let i:number = 0; i < posts.length; i++) {
                let obj:any = jsonData;
    
                console.log(obj.id);
            }
        }
    } catch {
        return (
            <div className="flex flex-col bg-slate-300 m-2 p-1 rounded-lg">
                <h2 className="text-lg font-bold">ERROR GETTING POSTS</h2>
            </div>
        )        
    }


    return (
        <>
            <div className="flex flex-col bg-slate-300 m-2 p-1 rounded-lg">
                <h2 className="text-lg font-bold">this is a post header</h2>
                <p>this is the contents</p>
            </div>
        </>
    )
}