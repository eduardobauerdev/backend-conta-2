import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { UserProvider } from "@/contexts/user-context"
import { AuthGuard } from "@/components/auth-guard"
import { RealtimeProvider } from "@/contexts/realtime-context"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sistema",
  description: "Sistema de gestão de ordens de serviço",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <UserProvider>
          <AuthGuard>
            <RealtimeProvider>{children}</RealtimeProvider>
          </AuthGuard>
        </UserProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
