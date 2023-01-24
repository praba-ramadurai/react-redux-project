import React, { useEffect, useRef,useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSelectedType,
  selectBounds,
  selectBias,
  setSelectedType,
  setBias,
  setBounds,
} from 'features/auto-complete/AutoCompleteSlice';
import Loading from 'components/Loading';
import SearchBar from 'material-ui-search-bar';

const Wrapper = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
let autoComplete = null;

const AutoComplete = ({ map, mapApi, addplace }) => {
  const [isLoading,setIsLoading]=useState(false);
  const selectedType = useSelector(selectSelectedType);
  const bias = useSelector(selectBias);
  const bounds = useSelector(selectBounds);
  const dispatch = useDispatch();
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

  const handleCheck = (eve) => {
    const {
      target: { type, name, checked, value },
    } = eve;
    if (type === "radio") {
      dispatch(setSelectedType(value));
      autoComplete.setTypes([value]);
      clearSearchBox();
    } else {
      if (name === "bias") {
        dispatch(setBias(checked));
        if (bias) {
          autoComplete.bindTo("bounds", map);
        } else {
          autoComplete.unbind("bounds");
          autoComplete.setBounds({
            east: 180,
            west: -180,
            north: 90,
            south: -90,
          });
          dispatch(setBounds(bias));
        }
        clearSearchBox();
      }
      if (name === "bounds") {
        dispatch(setBounds(checked));
        autoComplete.setOptions({
          strictBounds: bounds,
        });
        if (bounds) {
          dispatch(setBias(bounds));
          autoComplete.bindTo("bounds", map);
        }
        clearSearchBox();
      }
    }
  };

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
