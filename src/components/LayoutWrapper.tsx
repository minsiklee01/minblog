'use client'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import SectionContainer from "./SectionContainer"
import Header from './Header'
import Footer from './Footer'
interface Props {
  children: ReactNode
}
export default function LayoutWrapper({ children }: Props) {
  const pathname = usePathname()
  if (
    pathname === '/blog/add' ||
    pathname.startsWith('/blog/edit')
  ) {
    return <>{children}</>
  }
  return(
    <SectionContainer>
      <Header />
      <main>{children}</main>
      <Footer />
    </SectionContainer>
  )
}