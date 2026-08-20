import "../styles/globals.css";

export const metadata = {
  title: {
    default: 'FolioForge | Personal Portfolio',
    template: '%s',
  },
  description: 'Showcase your creative work and technical projects.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
