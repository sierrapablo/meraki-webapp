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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
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
        <label htmlFor="titol" className="block font-medium text-gray-700">Títol</label>
        <input
          type="text"
          id="titol"
          name="titol"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="autor" className="block font-medium text-gray-700">Autor</label>
        <input
          type="text"
          id="autor"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="etiquetes" className="block font-medium text-gray-700">Etiquetes</label>
        <input
          type="text"
          id="etiquetes"
          name="etiquetes"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Ex: música, art, valencià"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="contingut" className="block font-medium text-gray-700">Contingut</label>
        <textarea
          id="contingut"
          name="contingut"
          value={formData.content}
          onChange={handleChange}
          rows={6}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
      >
        Pujar publicació
      </button>
    </form>
  );
}
