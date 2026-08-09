import { useState } from "react";
import { ReactReader } from "react-reader";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Download } from "lucide-react";

const BOOK_URL = "/books/recursive-fractal-ai-cosmology.epub";

const Book = () => {
  const [location, setLocation] = useState<string | number>(0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-primary/20 px-5 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
          <ArrowLeft className="w-4 h-4" /> BACK
        </Link>
        <h1 className="flex items-center gap-2 text-sm md:text-base font-bold tracking-[0.2em] uppercase text-center">
          <BookOpen className="w-4 h-4 text-primary" />
          Recursive Fractal AI Cosmology
        </h1>
        <a
          href={BOOK_URL}
          download
          className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
        >
          <Download className="w-4 h-4" /> EPUB
        </a>
      </header>

      <main className="h-[calc(100vh-65px)] bg-card">
        <ReactReader
          url={BOOK_URL}
          location={location}
          locationChanged={(loc: string) => setLocation(loc)}
          title="Recursive Fractal AI Cosmology"
        />
      </main>
    </div>
  );
};

export default Book;
