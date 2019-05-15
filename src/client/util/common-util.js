/* eslint import/prefer-default-export: 0 */
function ensureArray(maybeArray) {
  return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}

export { ensureArray };
