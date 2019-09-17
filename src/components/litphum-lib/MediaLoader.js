import React, { useState, useEffect, useRef } from 'react'
import { useAsync } from 'react-async'
import styled from 'styled-components'
import _ from 'underscore'

const MusicContainer = styled.div`
  background: linear-gradient(120deg, rgb(223, 223, 223), rgb(8, 34, 105));
  height: 100%;
  width: 100%;
  position: relative;
`
const MusicContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  position: absolute;
`

// React prevState example hook
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const loadMoreItems = ( url , { api } ) => {
  const data = api.getMoreItems(url[0])
  return data
}

const MediaLoader = props => {
  const [musicItems, setMusicItems] = useState(props.defaultItems)
  const [nextURL, setNextURL] = useState("")
  const prevURL = usePrevious(nextURL);
  const scrollRef = useRef(null)
  const scrollPadding = props.scrollPadding || 300

  // requests more data if user scrolls to bottom
  const { data: mediaData, run: runLoadMediaData } = useAsync({ 
    deferFn: loadMoreItems,
    api: props.spotifyAPI
  })
  
  /* points URL query string to next list */
  useEffect(() => {
    setNextURL(props.defaultLoadURL)
  }, [props.defaultLoadURL])

  // updates musicItems arr and api URL querry string
  useEffect(() => {
    if (mediaData) {
      console.log(mediaData)
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
    <MusicContainer>
      <MusicContentWrapper ref={scrollRef} onScroll={updateMusicData}>
        { props.filter || null }
        { musicItems 
        ? props.children(musicItems)
        : null }
      </MusicContentWrapper>
    </MusicContainer>
  )
}

export default MediaLoader