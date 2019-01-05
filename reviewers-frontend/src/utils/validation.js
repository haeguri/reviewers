export const isValidEmail = (v) => /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(v);
export const isValidPassword = (v) => /^[A-Za-z0-9]{4,16}$/.test(v);
export const isvalidUsername = (v) => /^[A-Za-z0-9]{4,12}$/.test(v);