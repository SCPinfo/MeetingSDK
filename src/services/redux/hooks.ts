import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;

/**
 * Hook to access the redux state.
 *
 * @returns {TypedUseSelectorHook<RootState>} The redux state.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


