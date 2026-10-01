import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'DSA Stack Interactive Lab',
  description: 'Interactive data structures and algorithms stack visualizer with animated operations, line-by-line Python code explanations, real-world simulations, and interactive exercises.',
  openGraph: {
    title: 'DSA Stack Interactive Lab',
    description: 'Interactive data structures and algorithms stack visualizer with animated operations, line-by-line Python code explanations, real-world simulations, and interactive exercises.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DSA Stack Interactive Lab',
    description: 'Interactive data structures and algorithms stack visualizer with animated operations, line-by-line Python code explanations, real-world simulations, and interactive exercises.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
