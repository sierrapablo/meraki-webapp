import { useState } from "react";

interface FormData {
    slug: string;
    title: string;
    author: string;
    tags: string[];
    content: string;
}

export default function PostForm() {
    const [formData, setFormData] = useState<FormData>({
        slug: "",
        title: "",
        author: "",
        tags: [],
        content: "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "tags") {
            const tagsArray = value.split(",").map((tag) => tag.trim());
            setFormData((prev) => ({
                ...prev,
                tags: tagsArray,
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const username = import.meta.env.VITE_API_BASIC_AUTH_USERNAME;
            const password = import.meta.env.VITE_API_BASIC_AUTH_PASSWORD;

            const headers: Record<string, string> = {
                "Content-Type": "application/json",
            };

            if (username && password) {
                const basicAuth = btoa(`${username}:${password}`);
                headers["Authorization"] = `Basic ${basicAuth}`;
            }

            const API_URL = import.meta.env.VITE_API_URL;
            const response = await fetch(`${API_URL}/posts`, {
                method: "POST",
                headers,
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            setSuccess(true);
            setFormData({
                slug: "",
                title: "",
                author: "",
                tags: [],
                content: "",
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Unknown error");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow space-y-4">
            <div>
                <label htmlFor="slug" className="block font-medium text-gray-700">Slug</label>
                <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="title" className="block font-medium text-gray-700">Títol</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="author" className="block font-medium text-gray-700">Autor</label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="tags" className="block font-medium text-gray-700">Etiquetes</label>
                <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    placeholder="Ex: música, art, valencià"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="content" className="block font-medium text-gray-700">Contingut</label>
                <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    rows={6}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
                />
            </div>

            <div>
                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                >
                    {isLoading ? "Pujant..." : "Pujar publicació"}
                </button>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">Publicació pujada amb èxit!</p>}
        </form>
    );
}
