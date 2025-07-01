import { pool } from "../db/pool";
import { POSTS_QUERIES } from "../db/queries/postsQueries";
import { AppError } from "../utils/AppError";

export interface Post {
    slug: string;
    title: string;
    author: string;
    tags: string[];
    content: string;
    created_at?: Date;
    updated_at?: Date;
}

/**
 * Retrieve all posts from the database.
 * @returns {Promise<Post[]>} A promise that resolves to an array of posts.
 */
export const getAllPosts = async (): Promise<Post[]> => {
    try {
        const result = await pool.query(POSTS_QUERIES.GET_ALL);
        return result.rows;
    } catch (error) {
        throw new AppError("Failed to retrieve posts", 500);
    }
};

/**
 * Create a new post in the database.
 * @param {Post} post - The post to create.
 * @returns {Promise<Post>} A promise that resolves to the created post.
 */
export const createPost = async (post: Post): Promise<Post> => {
    const { slug, title, author, tags, content } = post;
    try {
        const result = await pool.query(
            POSTS_QUERIES.CREATE,
            [slug, title, author, tags || [], content]
        );
        return result.rows[0];
    } catch (error: any) {
        if (error.code === '23505') {
            throw new AppError("Post with this slug already exists", 409);
        }
        throw new AppError("Failed to create post", 500);
    }
};

/**
 * Delete a post by its slug.
 * @param {string} slug - The slug of the post to delete.
 * @return {Promise<Boolean>} A promise that resolves to true if the post was deleted, false otherwise.
 */
export const deletePost = async (slug: string): Promise<void> => {
    const result = await pool.query(
        POSTS_QUERIES.DELETE_BY_SLUG,
        [slug]
    );

    if (result.rowCount === 0) {
        throw new AppError("Post not found", 404);
    }
};
