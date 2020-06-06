import { FunctionComponent } from 'react'

declare module '*.jpg'
declare module '*.png'
declare module '*.gif'
declare module '*.mp4'

declare module 'react' {
  type FCX<P = {}> = FunctionComponent<P & { className?: string }>
}
