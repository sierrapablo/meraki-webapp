INSERT INTO
  posts (slug, title, author, summary, tags, filepath)
VALUES
  (
    'first-post',
    'Primer post de prueba',
    'localdev',
    'Este es un post de prueba para entorno local',
    ARRAY ['test', 'localdev', 'primer-post'],
    'http://localhost:8080/posts/lorem-ipsum/lorem-ipsum.md'
  ) ON CONFLICT (slug) DO
UPDATE
SET
  title = EXCLUDED.title,
  author = EXCLUDED.author,
  summary = EXCLUDED.summary,
  tags = EXCLUDED.tags,
  filepath = EXCLUDED.filepath,
  updated_at = NOW();