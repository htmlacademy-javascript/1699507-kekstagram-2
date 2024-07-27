const getStringLength = (string = '', maxLength = 1) => string.length <= maxLength;
getStringLength('проверяемая строка', 18);

const isPalindrome = (string = '') => {

  string = string.replace(/\s+/g, '').toUpperCase();

  let newString = '';

  for (let i = string.length - 1; i >= 0; i--) {
    newString = newString + string[i];

  }
  return string === newString;
};
isPalindrome('топот');
