export function getRandomColor() {
  return (
    '#' + (((1 << 24) * (Math.random() + 1)) | 0x696969).toString(16).substr(1)
  )
}
