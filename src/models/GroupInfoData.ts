import type { Drama } from '@/models/Drama'

export interface GroupInfoData {
  groupInfoTitle: string
  dataName: keyof Drama
}
