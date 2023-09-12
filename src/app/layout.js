import "./globals.css";
import { Providers } from "../components/providers";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import siteMetadata from "../../data/sitemetadata";

export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  generator: "Next.js",
  applicationName: siteMetadata.siteRepo,
  referrer: "origin-when-cross-origin",
  keywords: siteMetadata.keywords,
  authors: [
    { name: siteMetadata.author, url: siteMetadata.siteUrl + "/about" },
  ],
  creator: siteMetadata.author,
  publisher: siteMetadata.publishName,
  title: siteMetadata.title,
  description: siteMetadata.description,
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.siteName,
    locale: siteMetadata.language,  
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang={siteMetadata.language} suppressHydrationWarning>
      <head>
        
     {process && process.env.NODE_ENV === "production" && process.env.UMAMI_SRC!== null && process.env.UMAMI_ID!== null? <script async defer src={process.env.UMAMI_SRC} data-website-id={process.env.UMAMI_ID}></script>:null}
      </head>
      <body className="mx-auto bg-white dark:bg-black selection:bg-[#d7ffff] dark:selection:bg-[#006482a2]">
        <Providers>
          <Navbar />
          <div className="max-w-7xl mx-auto px-6">
            <main>{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
