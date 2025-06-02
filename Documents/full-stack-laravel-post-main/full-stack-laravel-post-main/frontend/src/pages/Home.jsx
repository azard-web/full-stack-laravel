import { useEffect, useState } from "react";
import { AppContext } from "./Context/AppContext";
import { Link } from "react-router-dom";

export default function Home() {
    const [post, setPost] = useState([]);   

    async function getPost() {
        const res = await fetch("/api/post");
        const data = await res.json()

        if (res.ok) {
            setPost(data)
        }
    }

    useEffect(() => {
        getPost();
    }, [])
    return (
        <>
            <h1 className="title">Latest Post</h1>
            {post.length > 0 ? post.map(post => (
                <div key={post.id} className="mb-4 p-4 border rounded-md border-dashed border-slate-400">
                    <div className="mb-2 flex items-start justify-between">
                        <div>
                            <h2 className="font-bold text-2xl">{post.title}</h2>
                            <small className="text-xs text-slate-600">Created by {post.user.name} on  {new Date(post.created_at).toLocaleTimeString()}</small>
                        </div>
                        <Link to={`/post/${post.id}`} className="bg-blue-500 text-white text-sm rounded-lg px-3 py-1">Read more</Link>
                    </div>
                    <p>{post.body}</p>
                </div>
            )) : <p className="text-center mt-4">There are no post.</p>}
        </>
    );
}