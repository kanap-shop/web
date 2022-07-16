export const noNumeric = (target) =>
    /\d/.test(target) ? "Les nombres ne sont pas autorisés" : undefined;

export const isEmail = (target) =>
    !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(target)
        ? "Email incorrect. Format attendu: example@domain.com"
        : undefined;
