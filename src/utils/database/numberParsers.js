export function stringToInt(str) {
  return parseInt(str);
}

export function intToString(int, strSize) {
  const stringInt = int.toString();
  const currentLength = stringInt.length;
  if (currentLength === strSize) {
    return stringInt;
  } else {
    let strArray = Array.from(stringInt);
    const diff = strSize - currentLength;
    console.log(diff);
    for (let i = diff; i > 0; i--) {
      strArray = ["0", ...strArray];
    }
    return strArray.join("");
  }
}
