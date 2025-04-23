import type { Metadata } from 'next'
import './globals.css'
import Header from "@/components/header"
import ProductSearch from "@/components/search-component"
import { CartProvider } from '@/context/cart-context'
import { ThemeProvider } from '@/components/theme-provider'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: 'E-Commerce UI',
  description: 'Modern e-commerce platform with advanced search',
  generator: 'v0.dev',
  icons: {
    icon: '/favicon.png', // /public/icon.png
  
    // You can add more variants with different sizes
    
     }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta name="color-scheme" content="light" />
        </head>
        <body className="light">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            forcedTheme="light"
            disableTransitionOnChange
          >
            <CartProvider>
              <Header />
              {children}
            </CartProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
