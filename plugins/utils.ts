export class Utils {
  xml2html(data: string, hightlight: boolean) {
    if (!data) {
      return null
    }
    data = data
      .split('&lt;')
      .join('<')
      .split('&gt;')
      .join('>')
      .replace('<head', '<p class="teiHead"><b')
      .replace('</head>', '</b></p>')
      .split('<lb/>')
      .join('<br/>')
      .split('<date')
      .join(`<span class="${hightlight ? 'teiDate' : ''}"`)
      .split('</date>')
      .join('</span>')
      .split('<persName')
      .join(`<span class="${hightlight ? 'teiPersName' : ''}"`)
      .split('</persName>')
      .join('</span>')
      .split('<place')
      .join(`<span class="${hightlight ? 'teiPlaceName' : ''}"`)
      .split('</placeName>')
      .join('</span>')
      .split('<time')
      .join(`<span class="${hightlight ? 'teiTime' : ''}"`)
      .split('</time>')
      .join('</span>')

    return data
  }
}

export default (_: any, inject: any) => {
  inject('utils', new Utils())
}
