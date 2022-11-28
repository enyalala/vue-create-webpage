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
  comments: [{ sentenct: string; count: number }]
  collect: boolean
  score: number
  imageName?: string
}
