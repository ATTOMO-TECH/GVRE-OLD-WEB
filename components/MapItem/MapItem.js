import React, {Component} from 'react';
import { Map, GoogleApiWrapper, Circle } from 'google-maps-react';
import googleKey from '../../keys/Keys.js'; 

class MapItem extends Component {
  render() {
    return (
      <div style={{height:'400px'}}>
          <Map
            google={this.props.google}
            style={{height:'400px',width:'100%'}}
            zoom={15}
            center={{lat:this.props.lati, lng:this.props.long}}
            initialCenter={{lat:this.props.lati, lng:this.props.long}}
            containerStyle={{height:'400px'}}
          >
            <Circle
              radius={400}
              center={{lat:this.props.lati, lng:this.props.long}}
              strokeColor='transparent'
              strokeOpacity={0}
              strokeWeight={5}
              fillColor='#2B363D'
              fillOpacity={0.3}
            />
          </Map>
      </div>
  )
  }
};

export default GoogleApiWrapper ({
  apiKey:(googleKey.googleKey)
})(MapItem)
