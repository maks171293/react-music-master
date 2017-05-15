import React from 'react';
import './index.css';

class Gallery extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      playingUrl: '',
      isPlaying: false,
      audio: ''
    }
  }

  playAudio(audioUrl){
    let audio = new Audio(audioUrl);
    if(!this.state.isPlaying){
      audio.play();
      this.setState({
        playingUrl: audioUrl,
        isPlaying: true,
        audio: audio
      })
    }else{
      if(this.state.playingUrl === audioUrl){
            this.state.audio.pause();
            this.setState({
              isPlaying: false
            })
      }else{
          this.state.audio.pause();
          audio.play();
          this.setState({
            playingUrl: audioUrl,
            isPlaying: true,
            audio: audio
          });
        }
    }
  }


  render(){
    const tracks = this.props.tracks;
    return(
      <div className='gallery'>
        {
          tracks.map((track, index) => {
            console.log(track);
            return(
            <div
              key={index}
              className='track'
              onClick={this.playAudio.bind(this, track.preview_url)}
              >
              <img
                className='track_image'
                src={track.album.images[0].url}
                alt='Album'
              />
              <div className='track_play'>
                <div className='track_play_wrap'>
                  {
                    (this.state.isPlaying && this.state.playingUrl === track.preview_url) ? <span>||</span> : <span>&#9654;</span>
                  }
                </div>
              </div>
              <h3>
                {track.name}
              </h3>
            </div>)
          })
        }
      </div>
    )
  }
}

export default Gallery;
