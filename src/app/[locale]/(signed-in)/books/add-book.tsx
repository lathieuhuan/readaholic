"use client";

import { DOMAIN } from "@/constants/config";
import { Button } from "@/lib/components/button";

export default function AddBook() {
  const onAddBook = async () => {
    const response = await fetch(`${DOMAIN}/api/books`, {
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
