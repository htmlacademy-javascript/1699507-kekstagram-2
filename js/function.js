//Функция для проверки длины строки

const checkLength = (str, maxLength) => str.length <= maxLength;

checkLength('слово', 4);


//Функция для проверки, является ли строка палиндромом

const isPalendrom = (str = '') => {
  const normalize = str.replaceAll(' ', '').toUpperCase();
  const reversed = normalize.split('').reverse().join('');
  return normalize === reversed;
};

isPalendrom();
