import React from 'react'
import '../css/home.css'
import SlidePicker from './SlidePicker.js'
import { ArtistTag } from './Tags.js'
import locationImg from '../images/location-photo.jpeg'

const Home = props => {
  return (
    <section className="home">
      <section className="artist-section">
        <h2>Artist</h2>
        <h1>Popular</h1>
        <SlidePicker slidePadding={25} visibleSlides={4} >
            <ArtistTag img={locationImg} artistName="Kanye West" genre="hip-hop" />
            <ArtistTag img={locationImg} artistName="The Weeknd" genre="soul" />
            <ArtistTag img={locationImg} artistName="Frank Ocean" genre="soul" />
            <ArtistTag img={locationImg} artistName="Kurt Cobain" genre="alternative" />
            <ArtistTag img={locationImg} artistName="Deadmou5" genre="EDM" />
            <ArtistTag img={locationImg} artistName="Prince" genre="pop" />
            <ArtistTag img={locationImg} artistName="Chris Cornell" genre="alternative" />
            <ArtistTag img={locationImg} artistName="XXXTENTACION" genre="hip-hop" />
        </SlidePicker>
      </section>
    </section>
  )
}

export default Home