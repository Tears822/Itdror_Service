"use client";

import Script from "next/script";

const TAWK_PROPERTY_ID = "69a142ce0f66371c37535508";
const TAWK_WIDGET_ID = "1jieupu8h";
const TAWK_SRC = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;

export function TawkToWidget() {
  return (
    <Script
      id="tawk-to"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='${TAWK_SRC}';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
          })();
        `,
      }}
    />
  );
}
