INSERT INTO items (id, title, description, completed) VALUES 
('1', 'Setup Cloudflare Worker & Next.js 16', 'Deployed Next.js 16 app on Cloudflare Edge runtime', 1),
('2', 'Configure D1 Database Binding', 'Configured D1 SQLite database via Drizzle ORM', 1),
('3', 'Feature-based Folder Architecture', 'Encapsulated feature modules inside src/features/', 0)
ON CONFLICT(id) DO NOTHING;
