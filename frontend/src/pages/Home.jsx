import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <h1>Main content</h1>
      </main>
      <Footer />
    </div>
  );
};
