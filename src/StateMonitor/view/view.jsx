import * as React from 'react'
import * as styles from './styles'

const isBasicType = input =>
  input === null ||
  input === undefined ||
  typeof input === 'string' ||
  typeof input === 'number' ||
  typeof input === 'boolean' ||
  typeof input === 'symbol'

const convertJSON = inputObj => {
  if (isBasicType(inputObj)) {
    return JSON.stringify(inputObj)
  }
  let str
  try {
    str = JSON.stringify(inputObj, null, 2)
  } catch (ex) {
    return <div style={{ color: 'red', paddingLeft: '4px' }}>[Circular]</div>
  }
  let arr = str.split('\n').map((entry, index) => {
    const len = entry.length - entry.trimLeft().length
    return (
      <div style={{ paddingLeft: `${len * 2}px` }} key={index}>{entry.trimLeft()}</div>
    )
  })

  return arr
}

const BasicEntry = props =>
  <div style={styles.stateDetailKey}>
    <span style={styles.keyValue}>{`${props.objKey}: `}</span><span style={styles.basicValue}>{convertJSON(props.obj)}</span>
  </div>

const StateDetailObject = props =>
  isBasicType(props.obj)
    ? <BasicEntry {...props} />
    : <div style={styles.stateDetailKey}>
      <div style={styles.complexKey}>{`${props.objKey}: `}</div> {
        props.objOpenStates[props.index]
          ? <div onClick={() => props.toggleObjOpenState(props.index)} style={styles.complexOpenClose}>{'\u25B2'}</div>
          : <div onClick={() => props.toggleObjOpenState(props.index)} style={styles.complexOpenClose}>{'\u25BC'}</div>
      }
      <div style={styles.complexValue}>{props.objOpenStates[props.index] ? convertJSON(props.obj) : null}</div>
      <div style={styles.floatClear} />
    </div>

const StateDetail = props => {
  const keyList = Object.keys(props.objToMerge).sort().map((key, index) => {
    return (
      <StateDetailObject
        objKey={key}
        key={index}
        index={index}
        obj={props.objToMerge[key]}
        objOpenStates={props.objOpenStates}
        toggleObjOpenState={props.toggleObjOpenState}
      />
    )
  })
  return (
    <div>
      {keyList}
    </div>
  )
}

class Clipboard extends React.Component {
  componentDidMount () {
    let copyText = document.getElementById('myInput')
    copyText.select()
    document.execCommand('Copy')
    copyText.style.display = 'none'
  }
  render () {
    return (
      <input type='text' defaultValue={this.props.defaultValue} id='myInput' />
    )
  }
}

const DisplayStateDetail = props => {
  if (!props.displayModule) {
    return null
  }
  return (
    <div onClick={props.closeDisplayModule} style={styles.displayModuleContainerBackground}>
      <div onClick={(e) => { e.stopPropagation() }} style={styles.displayModuleContainer}>
        <Clipboard defaultValue={props.clipBoard} />
        <div>
          <div style={styles.stateDetailTitle}>Display State Detail</div>
          <div title='Exit Display State.' onClick={props.closeDisplayModule} style={styles.transitionExitButton}>
            {'\u2716'}
          </div>
        </div>
        <div>
          <div style={styles.displayModuleText}>Module: <span style={styles.displayModuleTextValue}>{props.selectedState.moduleName}</span></div>
          <div style={styles.displayModuleText}>Line Number: <span style={styles.displayModuleTextValue}>{props.selectedState.line}</span></div>
          <div style={styles.displayModuleText}>ReducerKey: <span style={styles.displayModuleTextValue}>{props.selectedState.reducerKey}</span></div>
          <div style={styles.displayModuleText}>Changed Keys:</div>
        </div>
        <div style={styles.displayStateObjectContainer}>
          <StateDetail
            objToMerge={props.selectedState.objToMerge}
            objOpenStates={props.objOpenStates}
            toggleObjOpenState={props.toggleObjOpenState}
          />
        </div>
      </div>
    </div>
  )
}

export default class StateMonitor extends React.Component {
  componentDidUpdate () {
    if (this.monitorContentContainer) {
      if (!this.props.isDebugging) {
        this.monitorContentContainer.scrollTop = this.monitorContentContainer.scrollHeight
      } else {
        const elements = this.monitorContentContainer.getElementsBystyle(styles.dataRowOn)
        if (elements.length === 1) {
          // Make sure the on row is on the screen. Scroll if needed.
          if (elements[0].offsetTop < this.monitorContentContainer.scrollTop) {
            this.monitorContentContainer.scrollTop = elements[0].offsetTop
          } else if ((elements[0].offsetTop + elements[0].offsetHeight) > (this.monitorContentContainer.clientHeight + this.monitorContentContainer.scrollTop)) {
            this.monitorContentContainer.scrollTop = (elements[0].offsetTop + elements[0].offsetHeight) - this.monitorContentContainer.clientHeight
          }
        }
      }
    }
  }
  render () {
    if (process.env.NODE_ENV === 'production' || !this.props.displayMonitor) {
      return null
    }
    const { clickedState, exit, minimize, maximize, states, isMinimized } = this.props

    if (isMinimized) {
      return (
        <div title='Maximize Monitor.' onClick={maximize} style={styles.maximizeButton}>
          <div style={styles.maximizeChar}>{'\u25A1'}</div>
        </div>
      )
    }
    const trlist = states.map((o, index) => {
      return (
        <tr title='Click for details' onClick={() => { clickedState(index) }} style={styles.dataRow} key={index}>
          <td style={styles.dataColumn}>{o.strObj}</td>
        </tr>
      )
    })
    return (
      <div>
        <DisplayStateDetail {...this.props} />
        <div style={styles.monitorContainer}>
          <div>
            <div>
              <div style={styles.stateDetailTitle}>State Changes</div>
              <div title='Exit Monitor.' onClick={exit} style={styles.transitionExitButton}>
                {'\u2716'}
              </div>
              <div title='Minimize Monitor.' onClick={minimize} style={styles.transitionExitButton}>
                {'\u2212'}
              </div>
            </div>
          </div>
          <div ref={(div) => { this.monitorContentContainer = div }} style={styles.monitorContentContainer}>
            <table>
              <tbody>
                {trlist}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}
