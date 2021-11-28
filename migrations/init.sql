
CREATE TABLE IF NOT EXISTS book(
    id UUID default gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255),
    author VARCHAR(255)
);
