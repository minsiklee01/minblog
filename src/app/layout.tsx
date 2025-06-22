import './global.css'
import LayoutWrapper from '../components/LayoutWrapper'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
        </body>
    </html>
  )
}

  export const metadata = {
    title: 'Minsik',
    description: 'Welcome to Minsik\'s page.',
  };
