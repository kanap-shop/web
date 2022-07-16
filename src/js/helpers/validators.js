/**
 * Check if the provided string contains any number. If yes, returns an error
 *
 * @param {string} target Source string
 * @returns {string | undefined} If the provided data is valid, `undefined`. Othewise an error message
 */
export const noNumeric = (target) =>
    /\d/.test(target) ? "Les nombres ne sont pas autorisés" : undefined;

/**
 * Checks if the provided string is a valid email. If not, returns an error
 *
 * @param {string} target Source string
 * @returns {string | undefined} If the provided data is valid, `undefined`. Othewise an error message
 */
export const isEmail = (target) =>
    !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(target)
        ? "Email incorrect. Format attendu: example@domain.com"
        : undefined;
