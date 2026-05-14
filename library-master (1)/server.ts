import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  cover: string;
  status: "Available" | "Borrowed";
  borrowedBy?: string;
  createdAt: string;
}

let books: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0743273565",
    category: "Classic",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
    status: "Available",
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    isbn: "978-0451524935",
    category: "Sci-Fi",
    cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=400",
    status: "Available",
    createdAt: new Date().toISOString()
  },
  {
    id: "3",
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "978-0132350884",
    category: "Programming",
    cover: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=400",
    status: "Available",
    createdAt: new Date().toISOString()
  },
  {
    id: "4",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    isbn: "978-0547928227",
    category: "Fantasy",
    cover: "https://images.unsplash.com/photo-1621351123083-b8830743039d?auto=format&fit=crop&q=80&w=400",
    status: "Available",
    createdAt: new Date().toISOString()
  }
];

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Routes
  app.get("/api/books", (req, res) => {
    res.json(books);
  });

  app.post("/api/books", (req, res) => {
    const newBook: Book = {
      ...req.body,
      id: Math.random().toString(36).substr(2, 9),
      status: "Available",
      createdAt: new Date().toISOString()
    };
    books.push(newBook);
    res.status(201).json(newBook);
  });

  app.put("/api/books/:id", (req, res) => {
    const { id } = req.params;
    const index = books.findIndex(b => b.id === id);
    if (index !== -1) {
      books[index] = { ...books[index], ...req.body };
      res.json(books[index]);
    } else {
      res.status(404).send("Book not found");
    }
  });

  app.delete("/api/books/:id", (req, res) => {
    const { id } = req.params;
    books = books.filter(b => b.id !== id);
    res.status(204).send();
  });

  // Vite integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
