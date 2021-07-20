import { EditorState } from "draft-js";

const defaultState = {
    editorState: EditorState.createEmpty(),
  };
  
  const reducer = (state = defaultState, { payload, type }) => {
    if (type === 'UPDATE_EDITOR_STATE') {
      console.log('redux action: ', type, payload.getCurrentContent().getPlainText());
      return {
        ...state,
        editorState: payload,
      };
    }
    return state;
  };

  export default reducer;