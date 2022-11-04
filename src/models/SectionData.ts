import type { Component } from 'vue'

export interface SectionData {
  classes: string
  component: Component
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
  group_info_title: string
  data_name: string
  data_delete_last: string[] | string
  data_last: string
}

export interface CollectData {
  condition: number[]
  drama_name: any
}
