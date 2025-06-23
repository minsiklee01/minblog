import './global.css'
import LayoutWrapper from '../components/LayoutWrapper'
import { SessionProvider } from '@/context/SessionContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <SessionProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </SessionProvider>
        </body>
    </html>
  )
}

  export const metadata = {
    title: 'Minsik',
    description: 'Welcome to Minsik\'s page.',
  };
