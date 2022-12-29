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
