function capitialize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function resultDim(str) {
  return str;
}
module.exports = {
  capitialize,
  resultDim,
};
