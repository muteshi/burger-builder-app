export const newObject = (oldObject, newProps) => {
  return {
    ...oldObject,
    ...newProps,
  };
};

export const checkFormValidity = (element, inputId) => {
  let isValid = true;
  if (element.validation.required) {
    isValid = element.value.trim() !== "" && isValid;
    element.errorMsg = `Please enter a valid ${inputId}`;
  }
  if (element.validation.minLength) {
    isValid = element.value.length >= element.validation.minLength && isValid;
  }
  if (element.validation.maxLength) {
    isValid = element.value.length <= element.validation.maxLength && isValid;
  }
  if (element.validation.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(element.value) && isValid;
  }

  if (element.validation.isNumeric) {
    const pattern = /^\d+$/;
    isValid = pattern.test(element.value) && isValid;
  }

  return isValid;
};

export const capitalize = (string) => {
  return string[0].toUpperCase() + string.slice(1);
};
