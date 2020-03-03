export const CompressFile = (image: any) => new Promise((resolve, reject) => {
  const fileName = image.name
  const reader = new FileReader()
  reader.readAsDataURL(image)
  reader.onload = ({target}: any) => {
    const img: any = new Image()
    img.src = target.result
    img.onload = () => {
      const elem = document.createElement('canvas')
      elem.width = img.width
      elem.height = img.height
      const ctx: any = elem.getContext('2d')
      ctx.drawImage(img, 0, 0, img.width, img.height)
      ctx.canvas.toBlob((blob: any) => {
        const file = new File([blob], fileName, {
          type: 'image/jpeg',
          lastModified: Date.now()
        })
        resolve(file)
      }, 'image/jpeg', .6)
    }
    reader.onerror = error => reject(error)
  }
})
