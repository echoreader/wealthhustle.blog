import React from "react";
import Header from "./Header";
import Footer from "./Footer";
//import "../styles/global.css"; // satu CSS untuk semua
import "../styles/unocss.css"      // hasil generate UnoCSS

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="font-sans flex-grow pt-20 px-4 max-w-4xl mx-auto m-0">{children}</main>
      <Footer />
    </>
  );
}
