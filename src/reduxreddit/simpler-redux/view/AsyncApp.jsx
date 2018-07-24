import React from 'react'
import Picker from './Picker'
import Posts from './Posts'
import StateMonitor from '../../../StateMonitor'

export default props => {
  const { selectedSubreddit, posts, isFetching, lastUpdated, handleChangeSubreddit, handleRefreshList } = props
  return (
    <div>
      <StateMonitor />
      <h1>Simpler Redux</h1>
      <Picker
        value={selectedSubreddit}
        onChange={handleChangeSubreddit}
        options={['reactjs', 'frontend']}
      />
      <p>
        {lastUpdated &&
          <span>
            Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
            {' '}
          </span>}
        {!isFetching &&
          <a href='#' onClick={handleRefreshList}>
            Refresh
          </a>}
      </p>
      {isFetching && posts.length === 0 && <h2>Loading...</h2>}
      {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
      {posts.length > 0 &&
        <div style={{ opacity: isFetching ? 0.5 : 1 }}>
          <Posts posts={posts} />
        </div>}
    </div>
  )
}
