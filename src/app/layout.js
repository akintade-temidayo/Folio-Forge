import "../styles/globals.css";

export const metadata = {
  title: "Fabmise Portfolio",
  description: "Selected work by Fabmise.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
