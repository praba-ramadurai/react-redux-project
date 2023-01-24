import React, { useEffect, useRef,useState } from 'react';
import styled from 'styled-components';
import Loading from 'components/Loading';

const Wrapper = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
let autoComplete = null;

const AutoComplete = ({ map, mapApi, addplace }) => {
  const [isLoading,setIsLoading]=useState(false);
  const inputRef = useRef();

  useEffect(() => {
    setIsLoading(true);
    const options = {};
    autoComplete = new mapApi.places.Autocomplete(inputRef.current, options);
    const onPlaceChanged = () => {
      const place = autoComplete.getPlace();
      if (!place.geometry) return;
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }
      addplace(place);
      inputRef.current.blur();
    };
    autoComplete.addListener("place_changed", onPlaceChanged);
    autoComplete.bindTo("bounds", map);
    setIsLoading(false);
    return () => {
      mapApi.event.clearInstanceListeners(inputRef);
    };
  }, [map, mapApi, addplace]);



  const clearSearchBox = () => {
    inputRef.current.value = "";
  };

  if(isLoading){
    return <Loading/>
  }
  return (
    <Wrapper>
      <section className="section search">
        <form className="search-form">
          <div className="form-control">
            <h3>Find Your Location!</h3>
            <input
              ref={inputRef}
              type="text"
              onFocus={clearSearchBox}
              placeholder="Enter a location"
            />
          </div>
        </form>
      </section>
    </Wrapper>
  );
};
export default AutoComplete;
