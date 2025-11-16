import React from "react";

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        {props.headComponents}

        {/* Native AdSense script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=pub-6771362188294710"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
      </body>
    </html>
  );
}