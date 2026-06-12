type Cx = string | false | undefined | null | Cx[]

export function cn(...classes: Cx[]): string {
  const result: string[] = []
  const flatten = (items: Cx[]) => {
    for (const item of items) {
      if (Array.isArray(item)) {
        flatten(item)
      } else if (item && typeof item === 'string') {
        result.push(item)
      }
    }
  }
  flatten(classes)
  return result.join(' ')
}
