const singleGrayBorder = '1px solid #c0c0c0'
const lightGreen = 'RGB(137,209,133)'
const containerHeight = '300px'
const containerWidth = '200px'
const keyColor = 'RGB(184, 218, 255)'
const valuecolor = 'RGB(252, 248, 199)'

export const noselect = {
  'userSelect': 'none'
}

export const containerBase = {
  ...noselect,
  'right': '0',
  'height': containerHeight,
  'position': 'fixed',
  'top': '50%',
  'transform': 'translateY(-50%)',
  'fontSize': '10px',
  'borderRadius': '6px',
  'padding': '2px',
  'border': singleGrayBorder,
  'boxSizing': 'borderBox',
  'display': 'flex',
  'flexDirection': 'column',
  'width': containerWidth,
  'fontFamily': 'Arial'
}

export const containerBackgroundBase = {
  'position': 'fixed',
  'left': '0px',
  'top': '0px',
  'height': '100%',
  'width': '100%',
  'backgroundColor': 'transparent'
}

export const displayModuleContainerBackground = {
  ...containerBackgroundBase,
  'zIndex': '101'
}

export const displayModuleContainer = {
  ...containerBase,
  'width': '300px',
  'color': 'white',
  'background': 'black',
  'zIndex': '102'
}

export const monitorContainerBackground = {
  ...containerBackgroundBase,
  'zIndex': '100'
}

export const monitorContainer = {
  ...containerBase,
  'background': 'black',
  'color': 'white',
  'zIndex': '99'
}

export const monitorContentContainer = {
  'clear': 'both',
  'overflow': 'auto'
}

export const dataRow = {
  'background': 'transparent',
  'fontSize': '10px',
  'padding': '0px',
  'color': 'white',
  'cursor': 'pointer'
}

export const dataRowOn = {
  ...dataRow,
  'backgroundColor': lightGreen,
  'color': 'black'
}

export const dataColumn = {
  'border': '1px solid #707070',
  'padding': '2px'
}

export const buttonContainer = {
  'padding': '4px',
  'float': 'left'
}

export const transitionButton = {
  'float': 'left',
  'fontSize': '18px',
  'color': lightGreen,
  'cursor': 'default',
  'paddingLeft': '10px',
  'paddingRight': '10px',
  'paddingTop': '0px',
  'paddingBottom': '3px'
}

export const transitionStopButton = {
  ...transitionButton,
  'color': 'darkorange'
}

export const transitionReplayButton = {
  ...transitionButton,
  'color': 'RGB(117,190,255)',
  'paddingTop': '3px',
  'paddingLeft': '4px'
}

export const transitionExitButton = {
  ...transitionButton,
  'float': 'right',
  'color': 'white'
}

export const transitionMinimizeButton = {
  ...transitionButton,
  'fontWeight': 'bold',
  'color': 'white',
  'paddingTop': '3px',
  'paddingRight': '12px'
}

export const maximizeButton = {
  'cursor': 'default',
  'right': '0',
  'bottom': '0',
  'background': 'black',
  'height': '19px',
  'width': '19px',
  'zIndex': '9999',
  'position': 'fixed',
  'color': 'white',
  'fontSize': '24px',
  'fontWeight': 'bold',
  'borderRadius': '6px',
  'border': singleGrayBorder,
  'boxSizing': 'borderBox'
}

export const maximizeChar = {
  'marginTop': '-6px',
  'marginLeft': '2px'
}

export const stateDetailTitle = {
  'color': 'orange',
  'float': 'left',
  'fontSize': '16px',
  'fontWeight': 'bold',
  'marginTop': '4px',
  'marginLeft': '2px'
}

export const displayStateObjectContainer = {
  'marginTop': '6px',
  'overflow': 'auto',
  'padding': '2px',
  'fontSize': '11px',
  'border': singleGrayBorder
}

export const stateDetailKey = {
  'paddingBottom': '3px'
}

export const displayModuleText = {
  'fontWeight': 'normal',
  'fontSize': '11px',
  'paddingTop': '4px',
  'wordWrap': 'breakWord',
  'color': keyColor
}

export const displayModuleTextValue = {
  'color': valuecolor
}

export const keyValue = {
  'color': keyColor,
  'paddingRight': '2px'
}

export const basicValue = {
  'color': 'RGB(255, 255, 255)'
}

export const complexKey = {
  'color': keyColor,
  'float': 'left',
  'marginTop': '1px',
  'paddingRight': '2px'
}

export const complexOpenClose = {
  'color': 'orange',
  'fontSize': '14px',
  'cursor': 'pointer',
  'marginTop': '0px'
}

export const complexValue = {
  'color': valuecolor,
  'float': 'left'
}

export const floatClear = {
  'clear': 'both'
}
