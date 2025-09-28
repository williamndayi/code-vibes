import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Code Vibes - Build Websites & Apps',
  description: 'A vibe coding site for building websites and apps with live preview',
  keywords: ['coding', 'web development', 'ide', 'editor', 'websites', 'apps'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  )
}