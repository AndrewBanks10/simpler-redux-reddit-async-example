import React from 'react'
import SimplerReduxSample from './simpler-redux'
import ReduxSample from './redux/containers/AsyncApp'

const Chooser = ({ selection, options, onChange }) =>
  <span>
    <h1>{selection}</h1>
    <select onChange={e => onChange(e.target.value)} value={selection}>
      {options.map(option =>
        <option value={option} key={option}>
          {option}
        </option>
      )}
    </select>
  </span>

export default props =>
  <div>
    <Chooser {...props} />
    {props.selection === 'Simpler-redux' ? <SimplerReduxSample /> : <ReduxSample />}
  </div>
