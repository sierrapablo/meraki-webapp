INSERT INTO
  posts (slug, title, author, tags, content)
VALUES
  (
    'first-post',
    'Primer post de prueba',
    'localdev',
    ARRAY ['test', 'primer-post'],
    'Este es el contenido del primer post de prueba.'
  ) ON CONFLICT (slug) DO
UPDATE
SET
  title = EXCLUDED.title,
  author = EXCLUDED.author,
  tags = EXCLUDED.tags,
  content = EXCLUDED.content,
  updated_at = NOW();