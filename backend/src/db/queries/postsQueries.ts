export const POSTS_QUERIES = {
    GET_ALL: `
    SELECT * FROM posts
    ORDER BY created_at DESC
  `,
    CREATE: `
    INSERT INTO posts (slug, title, author, tags, content)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `,
    DELETE_BY_SLUG: `
    DELETE FROM posts
    WHERE slug = $1
    RETURNING *
  `
};
