import type { Component } from 'vue'

export interface SectionData {
  classes: string
  component: Component
  sectionData?: {
    sectionTitle: string
    to: string
  }
}
