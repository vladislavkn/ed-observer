export enum EditorActions {
  SET_PREVIEW = "SET_PREVIEW",
}

export const setPreview = (preview: boolean) => ({
  type: EditorActions.SET_PREVIEW,
  payload: preview,
});
