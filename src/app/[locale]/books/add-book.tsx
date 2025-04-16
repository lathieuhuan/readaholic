"use client";

import { Button } from "@/components/ui/button";
import { getDomain } from "@/lib/utils";

export default function AddBook() {
  const onAddBook = async () => {
    const response = await fetch(`${getDomain()}/api/books`, {
      method: "POST",
      body: JSON.stringify({ name: "Book 1", author: "Author 1" }),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <Button onClick={onAddBook}>Add Book</Button>
    </div>
  );
}

export const runtime = "edge";
