/**
 * @flow
 */

import {constants} from "./constants";

let initialState = {
  submitted: false,
  treatment: [],
  isProcessing: false,
  processed: false,
  error: false,
  treatmentViewDialogue: false,
  medicineUpdateSuccess:false
};

export default function treatmentState(state: any = initialState, action){
  switch (action.type) {
    case constants.SAVE_TREATMENT_SUCCESS:
      return {
        ...state,
        treatment: action.payload
      };
    case constants.FETCH_TREATMENT_REQUEST:
        return{
          ...state,
          isProcessing: true,
          error: false
        };
    case constants.FETCH_TREATMENT_SUCCESS:
    return{
      ...state,
      treatment: action.treatment,
      isProcessing: false,
      processed: true,
      error: false
    };
    case constants.FETCH_TREATMENT_FAILURE:
      return{
        ...state,
        isProcessing: false,
        processed: false,
        error: true
      };
    case constants.UPDATE_TREATMENT_MEDICINE_SUCCESS:
      return{
        ...state,
        treatment : action.payload,
        medicineUpdateSuccess: true
      };

    case constants.UPDATE_MEDICINE_FROM_TREATMENT_REQUEST:
      return{
        ...state
      };
    case constants.UPDATE_MEDICINE_FROM_TREATMENT_SUCCESS:
      return{
        ...state,
        treatment : action.payload
      };

    case constants.UPDATE_TREATMENT_MEDICINE_FAILURE:
      return{
        ...state,
        treatmentUpdateError : true,
        errorResponse : action.payload
      };
    case constants.DELETE_TREATMENT_REQUEST:
      return{
        ...state
      };
    case constants.DELETE_TREATMENT_SUCCESS:
      return{
        ...state,
        treatment : action.payload,
        treatmentViewDialogue: false
      };

    case constants.DELETE_MEDICINE_FROM_TREATMENT_REQUEST:
      return{
        ...state
      };
    case constants.DELETE_MEDICINE_FROM_TREATMENT_SUCCESS:
      return{
        ...state,
        treatment : action.payload
      };
    default:
      return state;
  }
}
