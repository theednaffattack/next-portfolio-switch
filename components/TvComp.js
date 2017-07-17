import React from 'react'
import PropTypes from 'prop-types'
import { BackgroundImage, Button, Card, Subhead, Text } from 'rebass'
import { getTwitch } from '../ducks/tv';

const channels = ['freecodecamp', 'test_channel', 'ESL_SC2'];

export class TvComp extends React.Component {
  render() {
    const { tv, getTwitch } = this.props;
    return (
      <div style={{ margin: '0 auto' }}>
        <div>
          <h2>Caffeinate Me</h2>
          <Button className="btn btn-success" onClick={getTwitch}>Get Twich Info!</Button>
        </div>
        <div className="card">
          <div className="card-header">
            <Text f={2}>{ 
              !tv ? 'Request a stream!' :
              tv.stream == undefined || tv.stream == null ? 'Mmmmmmm' :
              tv.stream.channel.display_name
            }
            </Text>
            {/* {tv.dataFetched && !tv.isFetching ? <a href={tv.data.stream.channel.url} target="_blank">Online</a> : "Offline"} */}
          
          </div>
          <div className="card-block card-panel">
            <h4 className="card-title">ESL_SC2</h4>
            {/* <h3>{tv.dataFetched && !tv.isFetching ? "Game - " + tv.data.stream.game : ""}</h3>
            <p>{tv.dataFetched && !tv.isFetching ? "Channel status - " + tv.data.stream.channel.status : ""}</p>
            <p className="card-text">{tv.dataFetched && !tv.isFetching ? "Viewers: " + tv.data.stream.viewers +  " Followers: " + tv.data.stream.channel.followers : ""}</p>
             */}
          </div>
        </div>
        <Card width={256}>
          <BackgroundImage
            ratio={1}
            src='https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2048&q=20'
          />
          <Subhead p={2}>
            <Text color='gray6'>ESL SC2</Text> 
          </Subhead>
          {
            !tv ? <Text color='orange3'>OFFLINE</Text> :
            <Text color='blue'>ONLINE</Text> 
          }
        </Card>



        {<pre>{JSON.stringify(tv, null, 2)}</pre>}
      </div>
    )
  }

  componentDidMount() {
      const { getTwitch } = this.props;
      getTwitch();
  }
}

TvComp.propTypes = {
  tv: PropTypes.shape({
    stream: PropTypes.object.isRequired,
    _links: PropTypes.object.isRequired
  }),
  getTwitch: PropTypes.func.isRequired
}

export default TvComp;
