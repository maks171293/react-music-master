import React, {Component} from 'react';
import {FormGroup, FormControl,InputGroup,Glyphicon} from 'react-bootstrap';
import Profile from './Profile';
import Gallery from './Gallery';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchText: '',
      artist: null,
      tracks: []
    };
    this.search = this.search.bind(this);
  }
  search(){
    const ROOT_URL = 'https://api.spotify.com/v1/search';
    let FETCH_URL = `${ROOT_URL}?q=${this.state.searchText}&type=artist&limit=1`;
    const ALBUM_URL = 'https://api.spotify.com/v1/artists/';

    fetch(FETCH_URL, {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
      const artist = json.artists.items[0];
      this.setState({artist});

      FETCH_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`;
      fetch(FETCH_URL, {
        method: 'GET'
      })
      .then(response => response.json())
      .then(json => {
        const tracks = json.tracks;
        this.setState({
          tracks
        })
      })
    })

  }
  render(){
    return(
      <div className='app'>
        <h3 className='title'>Music Master</h3>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              value={this.state.searchText}
              placeholder='Search an artist...'
              onChange={event => this.setState({searchText: event.target.value})}
              onKeyPress={(event) => {
                if(event.key === "Enter"){
                  this.search()
                }
              }}
            />
            <InputGroup.Addon
              onClick={this.search}
              >
              <Glyphicon glyph='search' />
            </InputGroup.Addon>
          </InputGroup>
        </FormGroup>
        {
          this.state.artist
          ? <div>
              <Profile
                artist={this.state.artist}
              />
              <Gallery
                tracks={this.state.tracks}
              />
            </div>
          : <div></div>
        }

      </div>)
  }
}

export default App;
