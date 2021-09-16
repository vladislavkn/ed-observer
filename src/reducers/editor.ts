import { EditorActions } from "../actions/editor";
import { ActionWithPayload } from "../types";

type EditorState = {
  preview: boolean;
};

const initialState: EditorState = {
  preview: false,
};

export default function editorReducer(
  state = initialState,
  action: ActionWithPayload<EditorActions, boolean>
) {
  switch (action.type) {
    case EditorActions.SET_PREVIEW:
      return { ...state, preview: action.payload };
    default:
      return state;
  }
}
