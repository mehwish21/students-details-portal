
const nameRegex = /^[ a-z ]+$/i

const isValidName = function (value) {
    if (
      typeof value === "string" &&
      value.trim().length > 0 &&
      /^[A-Z]+[a-zA-Z0-9 ]*$/.test(value)
    )
    return true;
    return false;
    }

    const isValid = function (value) {
        if (typeof value === "string" && value.trim().length > 0) return true;
        return false;
      };


const isValidBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
};

module.exports = { isValidName, isValidBody,nameRegex, isValid}