import type { Comment } from '@/models/Comment'

export interface Drama {
  [x: string]: any
  id: number
  name: string
  classification: string[]
  year: string
  actor: string[]
  director: string[]
  screenwriter: string[]
  type: string[]
  label: string[]
  highlight: string[]
  description: string
  homestatus: string
  homedescription: string
  sidephotocount: number
  comments: Comment[]
  collect: boolean
  score: number
  visitor: number
  imageName?: string
}
