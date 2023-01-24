import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mapApiLoaded: false,
    mapInstance: null,
    mapApi: null,
    selectedPlace: {
        addrType: "DEFAULT",
    address: "Maybank (KLCC Branch), C-21-C, Petronas Twin Tower, Concourse Expansion, Jln Ampang, City Centre, 50088 Kuala Lumpur",
    lat: 3.144011,
    lng: 101.695612,
    },
    bias: false,
    bounds: false,
    selectedType: "All",
};

export const mapSlice = createSlice({
    name: 'place',
    initialState,
    reducers: {
        setApiLoaded: (state, action) => {
            state.mapApiLoaded = action.payload;
        },
        setMapInstance: (state, action) => {
            state.mapInstance = action.payload.mapInstance;
            state.mapApi = action.payload.mapApi;
        },
        setSelectedLocation: (state, action) => {
            state.selectedPlace = action.payload;
        },
        setBias: (state, action) => {
            state.bias = action.payload;
        },
        setBounds: (state, action) => {
            state.bounds = action.payload;
        },
        setSelectedType: (state, action) => {
            state.selectedType = action.payload;
        },
    },
});

export const { setApiLoaded, setMapInstance, setSelectedLocation, setBias, setBounds, setSelectedType } = mapSlice.actions;

export const selectMapApiLoaded = (state) => state.place.mapApiLoaded;
export const selectMapInstance = (state) => state.place.mapInstance;
export const selectMapApi = (state) => state.place.mapApi;
export const selectPlace = (state) => state.place.selectedPlace;
export const selectBias = (state) => state.place.bias;
export const selectBounds = (state) => state.place.bounds;
export const selectSelectedType = (state) => state.place.selectedType;

export default mapSlice.reducer;
