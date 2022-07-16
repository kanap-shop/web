/**
 * Wrapper for `document.getElementById`
 *
 * @param {string} id The element id
 * @returns {HTMLElement | null} The element if it was found. Otherwise `null`
 */
export const $id = (id) => document.getElementById(id);
