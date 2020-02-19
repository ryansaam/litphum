import React, { useState, useEffect, useRef } from 'react'
import { useAsync } from 'react-async'
import styled from 'styled-components'
import _ from 'underscore'
import NullResult from './NullResult.js'

const MusicContainer = styled.div`
  background: ${props => (props.bgColor || "#4d4b4b")};
  height: 100%;
  width: 100%;
  padding: 0px 20px 20px 20px;
  box-sizing: border-box;
  position: relative;
`
const MusicContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: inherit;
  box-sizing: border-box;
  overflow-y: scroll;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

// React prevState example hook https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const MediaLoader = props => {
  const [musicItems, setMusicItems] = useState(props.defaultItems)
  const [nextURL, setNextURL] = useState("")
  const prevURL = usePrevious(nextURL);
  const scrollRef = useRef(null)
  const scrollPadding = props.scrollPadding || 300

  // requests more data if user scrolls to bottom
  const { data: mediaData, run: runLoadMediaData } = useAsync({ 
    deferFn: props.spotifyAPI.getMoreItems
  })
  
  /* points URL query string to next list */
  useEffect(() => {
    setNextURL(props.defaultLoadURL)
  }, [props.defaultLoadURL])

  // updates musicItems arr and api URL querry string
  useEffect(() => {
    if (mediaData) {
      if (mediaData.next || !(props.mediaType)) {
        setMusicItems(prevMediaItems => [...prevMediaItems, ...mediaData.items])
        setNextURL(mediaData.next)
      } else {
        setNextURL(mediaData[props.mediaType].next)
        setMusicItems(prevMediaItems => [...prevMediaItems, ...mediaData[props.mediaType].items])
      }
    }
  }, [mediaData, props.mediaType])

  // dynamically loads music content when user scrolls to bottom
  const updateMusicData = _.throttle(() => {
    if (scrollRef.current.scrollTop >= (scrollRef.current.scrollHeight - scrollRef.current.offsetHeight) - scrollPadding) {
      if (!(prevURL === nextURL)) { // prevents loading same content twice and throwing duplicate key err
        runLoadMediaData(nextURL)
      }
    }
  }, 300) // ms

  return (
    <>
      { musicItems ?
        <MusicContainer bgColor={props.bgColor}>
          <MusicContentWrapper ref={scrollRef} onScroll={updateMusicData}>
            {props.header}
            { props.filter || null }
            { musicItems 
            ? props.children(musicItems)
            : null }
          </MusicContentWrapper>
        </MusicContainer>
      : <div style={{height: "100%", display: "grid", gridTemplateRows: "auto 1fr"}}>
          { props.filter || null }
          <NullResult>{props.text}</NullResult>
        </div> }
    </>
  )
}

export default MediaLoader