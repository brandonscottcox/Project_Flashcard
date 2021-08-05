/**
 * @param {Function} delegate - a function to wrap in try/catch error handling
 */
export default function tryCatchError(delegate) {
  try {
    delegate();
  } catch (e) {
    console.log(e);
  }
}
