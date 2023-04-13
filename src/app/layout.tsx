import './globals.css'
import Header from 'ui/Header'

export const metadata = {
  title: 'wave-dex',
  description: 'An entity indexer for music makers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
