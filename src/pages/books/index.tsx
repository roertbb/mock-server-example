import * as React from "react";
import { Route, Routes } from "react-router";
import BooksDetails from "./BooksDetails";
import BooksListing from "./BooksListing";
import BooksNew from "./BooksNew";

function Books() {
  return (
    <Routes>
      <Route path="/" element={<BooksListing />} />
      <Route path="/new" element={<BooksNew />} />
      <Route path="/:bookId" element={<BooksDetails />} />
    </Routes>
  );
}

export default Books;
