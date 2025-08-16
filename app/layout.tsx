import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthProvider } from '@/components/providers/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'EcoConnect - AI-Powered Waste Management',
  description: 'Transform waste management with AI-powered detection, gamified rewards, and sustainable solutions for India. Connect with local recyclers, discover AI-powered upcycling ideas, and build a waste-conscious community. Start recycling today!',
  keywords: 'waste management, AI, sustainability, recycling, India, gamification',
  authors: [{ name: 'EcoConnect Team' }],
  viewport: 'width=device-width, initial-scale=1',
  generator: 'v0.dev',
}

const queryClient = new QueryClient()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            {children}
            <Toaster position="top-right" />
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
<body className={inter.className}>
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
        }}
      />
    </AuthProvider>
  </QueryClientProvider>
</body>

