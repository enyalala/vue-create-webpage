import type { Drama } from '@/models/Drama'
import type { Component } from 'vue'

export interface SectionData {
  classes: string
  component: Component
  propsData: object
  sectionData?: {
    sectionTitle: string
    to: string
  }
}

export interface NavData {
  classes: string
  to: string
  navtitle: string
  imgData?: { imgClasses: string; imgSrc: string; imgAlt: string }
}

export interface GroupInfoData {
  groupInfoTitle: string
  dataName: keyof Drama
}

export interface CollectData {
  condition: number[]
  dramaName: any
}

export interface commentsAndCounts {
  sentence: string
  count: number
}
