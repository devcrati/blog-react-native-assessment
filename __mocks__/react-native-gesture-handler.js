export const PanGestureHandler = jest.fn(({ children }) => children);
export const GestureHandlerRootView = jest.fn(({ children }) => children);
export const State = {};
export const Directions = {};
export const GestureDetector = jest.fn(({ children }) => children);
export const GestureHandler = jest.fn();

export default {
  PanGestureHandler,
  GestureHandlerRootView,
  State,
  Directions,
  GestureDetector,
  GestureHandler,
};
