//Функция для проверки длины строки

const checkLength = (str, maxLength) => str.length <= maxLength;

// Строка короче 20 символов
console.log(checkLength('nothing else matters', 20)); // true
// Длина строки ровно 18 символов
console.log(checkLength('korn', 4)); // true
// Строка длиннее 10 символов
console.log(checkLength('сектор газа', 10)); // false


//Функция для проверки, является ли строка палиндромом

const isPalendrom = (str = '') => {
  //Избавляюсь в строке от пробелов и привожу все символы в верхний регистр
  const normalize = str.replaceAll(' ', '').toUpperCase();

  //Переворачиваю строку
  const reversed = normalize.split('').reverse().join('');

  //Сравниваю входящую строку с перевернутой
  return normalize === reversed;
};

// Строка является палиндромом
console.log(isPalendrom('топот')); // true
// Несмотря на разный регистр, тоже палиндром
console.log(isPalendrom('ДовОд')); // true
// Это не палиндром
console.log(isPalendrom('Кекс')); // false
// Это палиндром
console.log(isPalendrom('Лёша на полке клопа нашёл ')); // true
