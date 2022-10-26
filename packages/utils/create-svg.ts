/*
 * @create-svg.ts
 * @deprecated
 * @author czh
 * @update (czh 2021/12/11)
 */
import svgDict from './svg-dict'

export function initIconSvg() {
  const svgElm = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svgElm.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  svgElm.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink')
  svgElm.style.position = 'absolute'
  svgElm.style.width = '0'
  svgElm.style.height = '0'

  loadAllIconXML(svgElm)
}

function loadAllIconXML(svgElm): void {
  Object.keys(svgDict).forEach((key: string) => {
    svgElm.innerHTML = svgElm.innerHTML + svgDict[key]
  })
  appendToBody(svgElm)
}

function appendToBody(svgElm): void {
  document.body.insertBefore(svgElm, document.body.firstElementChild)
}
