import { useSelector } from "react-redux";
import { RootState } from "../store";

export const usePreview = () =>
  useSelector<RootState, RootState["editor"]["preview"]>(
    (state) => state.editor.preview
  );
