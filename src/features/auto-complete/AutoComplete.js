import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'
import { useSelector, useDispatch } from 'react-redux';
import { selectPlace, selectMapApiLoaded, selectMapInstance, selectMapApi, setSelectedLocation, setApiLoaded, setMapInstance } from './AutoCompleteSlice.js';
import AutoComplete from 'components/AutoComplete';
import './AutoComplete.css';

const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
)

const Autocomplete = () => {
  const place = useSelector(selectPlace);
  const mapApiLoaded = useSelector(selectMapApiLoaded);
  const mapApi = useSelector(selectMapApi);
  const mapInstance = useSelector(selectMapInstance);
  const dispatch = useDispatch();

  const addPlace = (place) => {
    dispatch(setSelectedLocation(place));
  };

  const apiHasLoaded = (map, maps) => {
    dispatch(setApiLoaded(true));
    dispatch(setMapInstance({ mapInstance: map, mapApi: maps }));
  };

  return (
    <>
      {mapApiLoaded && (
        <AutoComplete map={mapInstance} mapApi={mapApi} addplace={addPlace} />
      )}
      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAHQCGm6t8IgZ77_cJTbezg-wII-eboBtc', libraries: ['places', 'geometry'], }}
          defaultCenter={place}
          defaultZoom={17}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => {
            return apiHasLoaded(map, maps);
          }}
        >
          {(place && place.addrType !== "DEFAULT")
            ?
            <LocationPin
              text={place.formatted_address}
              lat={place.geometry.location.lat()}
              lng={place.geometry.location.lng()}
            /> : <LocationPin
              lat={place.lat}
              lng={place.lng}
              text={place.address}
           />}
        </GoogleMapReact>
      </div>
    </>
  );
}

export default Autocomplete;
