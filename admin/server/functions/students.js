export function generateMatrikelNummer() {
  const min = 10000000; 
  const max = 99999999; 
  const generatedNumbers = [];

  let randomNumber;

  do {
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (generatedNumbers.includes(randomNumber));

  // Store the generated number to ensure uniqueness
  generatedNumbers.push(randomNumber);

  return randomNumber;
}
