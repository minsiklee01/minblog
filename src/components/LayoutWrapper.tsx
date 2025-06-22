import { ReactNode } from 'react'
import SectionContainer from "./SectionContainer"
import Header from './Header'

interface Props {
  children: ReactNode
}
export default function LayoutWrapper({ children }: Props) {
  return(
    <SectionContainer>
      <Header />
      <main>{children}</main>
    </SectionContainer>
  )
}