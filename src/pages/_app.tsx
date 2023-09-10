import type { AppProps } from "next/app";
import { Header } from "@/ui/components/Header";
import "@/ui/styles/global.scss";
import { IsNavigatingProvider } from "@/ui/providers/IsNavigatingProvider";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />

      <Component {...pageProps} />
    </>
  );
}

export default function AppWithProviders(props: AppProps) {
  return (
    <IsNavigatingProvider>
      <App {...props} />
    </IsNavigatingProvider>
  );
}
