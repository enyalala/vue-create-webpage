import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useDramaInfo = defineStore('dramaInfo', () => {
  const drama001 = {
    name: 'silent',
    year: 2022,
    actor: [
      '川口春奈',
      '目黑蓮',
      '篠原涼子',
      '鈴鹿央士',
      '夏帆',
      '風間俊介',
      '櫻田日和',
      '板垣李光人',
      '江副悟史',
    ],
    director: ['風間太樹', '高野舞', '品田俊介'],
    screenwriter: ['生方美久'],
    type: ['浪漫愛情', '雙字幕', '免費'],
    label: ['催淚', '失聰', '聽覺障礙'],
    highlight: [
      '2022秋季日劇',
      '★《打扮戀愛》川口春奈x「國寶級帥哥」目黑蓮挑戰手語，重逢無聲世界共譜甜虐愛戀',
      '★篠原涼子、《東大特訓班》鈴鹿央士、《亂來！》夏帆、《監察醫 朝顏》風間俊介，華麗陣容溫暖應援',
      '★《30處男》導演唯美新作、人氣樂團Official髭男dism打造主題曲',
    ],
    description:
      '高二的秋天，紬的目光被在台上朗讀作文的佐倉想的聲音所吸引。在朋友的助攻下，兩人終於在高三那年開始交往。然而，想卻在畢業後一聲不響地消失。8年過去，即使心裡充滿不解，紬也開始了自己的新人生。某天，紬在人群中發現想的身影，也得知他因病幾乎失去聽力的震撼事實...',
  }
  return { drama001 }
})
