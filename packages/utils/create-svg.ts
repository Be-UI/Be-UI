/*
 * @create-svg.ts
 * @deprecated
 * @author czh
 * @update (czh 2021/12/11)
 */
import svgDict from './svg-dict'
export class SvgDom {
  private svgElm: SVGSVGElement
  private isAllLoad = true
  constructor(isAll = true) {
    this.svgElm = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    this.svgElm.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    this.svgElm.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink')
    this.svgElm.style.position = 'absolute'
    this.svgElm.style.width = '0'
    this.svgElm.style.height = '0'
    if (isAll) {
      this.isAllLoad = isAll
      this.loadAllIconXML()
    }
  }
  loadIconXML(name: string): void {
    if (this.isAllLoad) return
    this.svgElm.innerHTML = this.svgElm.innerHTML + svgDict[name]
    this.appendToBody()
  }
  loadAllIconXML(): void {
    Object.keys(svgDict).forEach((key: string) => {
      this.svgElm.innerHTML = this.svgElm.innerHTML + svgDict[key]
    })
    this.appendToBody()
  }
  appendToBody(): void {
    document.body.insertBefore(this.svgElm, document.body.firstElementChild)
  }
}
