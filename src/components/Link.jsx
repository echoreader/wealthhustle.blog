import { siteUrl } from "../utils/site.js";

export default function Link({ href, children }) {
  const isAbsolute = href.startsWith("http://") || href.startsWith("https://");
  const finalHref = isAbsolute ? href : new URL(href, siteUrl).href;

  return (
    <a href={finalHref} className="external">
      {children}
    </a>
  );
}
