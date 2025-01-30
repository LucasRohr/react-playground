export interface BookItemProps {
    coverImage: string
    title: string
    minPrice: number
    slug: string
    onPress: (slug: string) => void
}
