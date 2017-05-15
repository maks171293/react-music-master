import React from 'react';
import './index.css';

class Profile extends React.Component{
  render(){
    let artist = {name: '', followers: {total: ''}, images: [{url: ''}], genres: []};
    artist = this.props.artist !== null ? this.props.artist : artist;
    return(
      <div className='profile'>
        <img
          alt="Profile"
          src={artist.images[0].url}
        />
        <div className='profile_info'>
          <h3 className='profile_name'>{artist.name}</h3>
          <p className='profile_foll'>{artist.followers.total} followers</p>
          <div className='profile_genres'>{artist.genres.map((genre, index) => {
            genre = genre !== artist.genres[artist.genres.length -1] ? `${genre}, ` : `${genre}`
            return (
              <span key={index}>{genre}</span>
            )
          })}
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;
