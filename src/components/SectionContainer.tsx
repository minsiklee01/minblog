import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return (
    <section className="mx-auto mb-8 max-w-3xl sm:px-6 xl:max-w-5xl xl:px-0"><main className="mb-auto">{children}</main></section>
  )
}