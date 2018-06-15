import React from 'react'
import Picker from './Picker'
import Posts from './Posts'

export default props =>
  <div>
    <Picker
      value={props.selectedSubreddit}
      onChange={props.handleChange}
      options={['reactjs', 'frontend']}
    />
    <p>
      {props.lastUpdated &&
      <span>
        Last updated at {new Date(props.lastUpdated).toLocaleTimeString()}.
        {' '}
      </span>}
      {!props.isFetching &&
      <a href='#' onClick={props.handleRefreshClick}>
        Refresh
      </a>}
    </p>
    {props.isFetching && props.posts.length === 0 && <h2>Loading...</h2>}
    {!props.isFetching && props.posts.length === 0 && <h2>Empty.</h2>}
    {props.posts.length > 0 &&
    <div style={{ opacity: props.isFetching ? 0.5 : 1 }}>
      <Posts posts={props.posts} />
    </div>}
  </div>
