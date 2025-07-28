import IconComponent from '@/components/icon/icon.vue'

const createIcon = (name: string, size: number = 16, color?: string) => {
  return () => h(IconComponent, { name, size, color })
}
export default createIcon
