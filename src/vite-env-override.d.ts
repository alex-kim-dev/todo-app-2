declare module '*.svg' {
  const content: React.FC<React.SVGProps<SVGSVGElement> & { title?: string }>
  export default content
}

declare module '/*.svg' {
  const src: string
  export default src
}
