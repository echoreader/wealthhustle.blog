import React from "react";
import Head from "./Head";
import Header from "./Header";
import Footer from "./Footer";
import "../styles/unocss.css"
import "../styles/global.css"

export default function Layout({ children, title, description, pageType }) {
  return (
    <>
      <Head title={title} description={description} pageType={pageType} />
      <Header />
      <main className="font-sans flex-grow pt-2 px-4 max-w-4xl mx-auto m-0">{children}</main>
      <Footer />
    </>
  );
}