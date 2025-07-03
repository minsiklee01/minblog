import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return (
    <section className="mx-4 lg:mx-auto mb-8 max-w-3xl xl:max-w-5xl"><main className="mb-auto">{children}</main></section>
  )
}