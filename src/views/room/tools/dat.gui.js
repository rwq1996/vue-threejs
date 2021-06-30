import { GUI } from 'dat.gui'


export function Gui () {
    
  const controls =  {
    showAxes:false,
    showRoof:true
  }

  const gui = new GUI()

  gui.add(controls, 'showAxes')
  gui.add(controls, 'showRoof')
  
  return controls
}