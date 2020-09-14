function countCharacters(password) {
    let count = 0;
    const digit = /\d/g;
    const upperCase = /[A-Z]/g;
    const lowerCase = /[a-z]/g;
    const splChar = /\W/g;

    if (!digit.test(password)) {
        count++;
    }
    if (!upperCase.test(password)) {
        count++;
    }
    if (!lowerCase.test(password)) {
        count++;
    }
    if (!splChar.test(password)) {
        count++;
    }
    if (count + password.length < 6) {
        count = (count + 6) - (count + password.length);
    }
    return count;
}


console.log(countCharacters('AACDAA'))