export class Utils {
  xml2html(data: string) {
    if (!data) {
      return null
    }
    data = data
      .split('&lt;')
      .join('<')
      .split('&gt;')
      .join('>')
      .replace('<head', '<p><b')
      .replace('</head>', '</b></p>')
      .split('<lb/>')
      .join('<br/>')
    return data
  }
}

export default (_: any, inject: any) => {
  inject('utils', new Utils())
}
