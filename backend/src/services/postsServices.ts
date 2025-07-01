import { pool } from "../db/pool";
import { POSTS_QUERIES } from "../db/queries/postsQueries";

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
    const result = await pool.query(POSTS_QUERIES.GET_ALL);
    return result.rows;
};

/**
 * Create a new post in the database.
 * @param {Post} post - The post to create.
 * @returns {Promise<Post>} A promise that resolves to the created post.
 */
export const createPost = async (post: Post): Promise<Post> => {
    const { slug, title, author, tags, content } = post;
    const result = await pool.query(
        POSTS_QUERIES.CREATE,
        [slug, title, author, tags || [], content]
    );
    return result.rows[0];
};

/**
 * Delete a post by its slug.
 * @param {string} slug - The slug of the post to delete.
 * @return {Promise<Boolean>} A promise that resolves to true if the post was deleted, false otherwise.
 */
export const deletePost = async (slug: string): Promise<Boolean> => {
    const result = await pool.query(
        POSTS_QUERIES.DELETE_BY_SLUG,
        [slug]
    );
    return (result.rowCount ?? 0) > 0;
};
