import React from 'react'
import PropTypes from 'prop-types'
import './Tv.scss'

const channels = ['freecodecamp', 'test_channel', 'ESL_SC2'];

export const Tv = ({ tv, requestTwitch, getTwitch, getJson }) => (
  <div style={{ margin: '0 auto' }}>
    <div>
      <h2>Caffeinate Me <p> your twitchTV Client</p></h2>
      <button className="btn btn-success" onClick={getTwitch}>Get Twich Info!</button>
      <button className="btn btn-success" onClick={requestTwitch}>Request Twich Info!</button>
      <button className="btn btn-success" onClick={getJson}>Get JSON</button>
    </div>
    <div className="card">
      <div className="card-header">
        {tv.dataFetched && !tv.isFetching ? <a href={tv.data.stream.channel.url} target="_blank">Online</a> : "Offline"}
      </div>
      <div className="card-block card-panel">
        <h4 className="card-title">ESL_SC2</h4>
        <h3>{tv.dataFetched && !tv.isFetching ? "Game - " + tv.data.stream.game : ""}</h3>
        <p>{tv.dataFetched && !tv.isFetching ? "Channel status - " + tv.data.stream.channel.status : ""}</p>
        <p className="card-text">{tv.dataFetched && !tv.isFetching ? "Viewers: " + tv.data.stream.viewers +  " Followers: " + tv.data.stream.channel.followers : ""}</p>
      </div>
    </div>
    {<pre>{JSON.stringify(tv, null, 2)}</pre>}
  </div>
)
Tv.propTypes = {
  tv: PropTypes.object.isRequired,
  requestTwitch: PropTypes.func.isRequired,
  getTwitch: PropTypes.func.isRequired,
  getJson: PropTypes.func.isRequired
}

export default Tv
