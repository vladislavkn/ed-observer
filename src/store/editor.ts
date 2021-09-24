import { createSlice } from "@reduxjs/toolkit";

interface EditorState {
  showPreview: boolean;
}

const initialState: EditorState = {
  showPreview: false,
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    togglePreview(state) {
      state.showPreview = !state.showPreview;
    },
  },
});

export const { togglePreview } = editorSlice.actions;
export default editorSlice.reducer;

interface ContainEditor {
  editor: EditorState;
}
export const selectIsPreview = (state: ContainEditor) =>
  state.editor.showPreview;
