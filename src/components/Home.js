import React, { useState, useEffect } from 'react'
import '../css/home.css'
import SlidePicker from './SlidePicker.js'
import { ArtistTag } from './Tags.js'
import locationImg from '../images/location-photo.jpeg'

const TagViewer = props => {
  const [topOffset, setTopOffset] = useState(props.tagPosition.y)
  const position = props.viewerIsShowing ? 0 : -500

  useEffect(() => {
    if (position === 0) {
      setTopOffset(43)
    }
  })

  return (
    <div>
      <div className="tag-viewer" style={{bottom: `${position}px`}} >
      </div>
      {props.tagIsShowing ? 
        <div
          id="viewerTab"
          style={{
            width: "169px",
            position: "absolute",
            left: props.tagPosition.x,
            top: topOffset
          }} >
          <ArtistTag img={locationImg} artistName="The Weeknd" genre="soul" />
        </div> : 
      null}
    </div>
  )
}

const Home = props => {
  const [viewerIsShowing, setViewerIsShowing] = useState(false)
  const [targetPosition, setTargetPosition] = useState({x: 395, y: 139})
  const [tagIsShowing, setTagIsShowing] = useState(false)
  const [mainOpacity, setMainOpacity] = useState(1)
  const handleClick = event => {
    setMainOpacity(0)
    setViewerIsShowing(!viewerIsShowing)
    const id = event.currentTarget.id
    const offset = document.getElementById(id).getBoundingClientRect()
    setTargetPosition({x: offset.left, y: offset.top})
    setTagIsShowing(true)
  }

  return (
    <section className="home">
      
      <div className="home-main" style={{opacity: mainOpacity}}>
        <section className="artist-section">
          <h2>Artist</h2>
          <h1>Popular</h1>
          <SlidePicker slidePadding={25} visibleSlides={4} >
              <ArtistTag id={"test"} onClick={handleClick} img={locationImg} artistName="Kanye West" genre="hip-hop" />
              <ArtistTag img={locationImg} artistName="The Weeknd" genre="soul" />
              <ArtistTag img={locationImg} artistName="Frank Ocean" genre="soul" />
              <ArtistTag img={locationImg} artistName="Kurt Cobain" genre="alternative" />
              <ArtistTag img={locationImg} artistName="Deadmou5" genre="EDM" />
              <ArtistTag img={locationImg} artistName="Prince" genre="pop" />
              <ArtistTag img={locationImg} artistName="Chris Cornell" genre="alternative" />
              <ArtistTag img={locationImg} artistName="XXXTENTACION" genre="hip-hop" />
          </SlidePicker>
        </section>
        <section className="new-releases-section">
          <h2>Albums</h2>
          <h1>New Releases</h1>
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
      </div>
      <TagViewer tagIsShowing={tagIsShowing} viewerIsShowing={viewerIsShowing} tagPosition={targetPosition} />
    </section>
  )
}

export default Home