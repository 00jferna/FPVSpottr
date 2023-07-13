import { csrfFetch } from "./csrf"

// Constants
const GET_ALL_SPOTS = 'spots/GET_ALL_SPOTS'

const getAllSpots = (spots) => ({
    type: GET_ALL_SPOTS,
    spots,
})

export const getAllSpotsThunk = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots/',{
        method: 'GET'
    })

    const data = await res.json()
    let spots = {}
    data.Spots.forEach(spot => {
        spots[spot.id] = spot
    })

    dispatch(getAllSpots(spots))
    return data
}

const initialState = {

};

const spotsReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type){
        case GET_ALL_SPOTS:
            newState = action.spots
            return newState
        default:
            return state
    }
}

export default spotsReducer