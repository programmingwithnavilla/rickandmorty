import {
  useDispatch,
  useSelector as rawUseSelector,
  TypedUseSelectorHook,
} from "react-redux";

import type { RootState, AppDispatch } from "../store";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
