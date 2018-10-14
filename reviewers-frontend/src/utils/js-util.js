const range = (...args) => {
  const [ from, to ] = args;
  const result = [];
  for(let i = from; i < to; i++) {
    result.push(i);
  }
  return result;
}

export {
  range
};