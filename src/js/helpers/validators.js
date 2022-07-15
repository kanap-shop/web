export const noNumeric = (target) =>
    /\d/.test(target) ? "Les nombres ne sont pas autorisés" : undefined;
