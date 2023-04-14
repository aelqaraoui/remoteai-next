import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import { GoogleAnalytics } from "nextjs-google-analytics";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <GoogleAnalytics gtagUrl='/js/ga-stat.js' strategy="lazyOnload" trackPageViews />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
