import { error } from './notifications';

export const isEmptyObject = obj => Object.keys(obj).length === 0;

const isValidDate = dateObj => !Number.isNaN(Date.parse(dateObj));

export const validateUser = (user) => {
  const errors = {};

  if (user.login === '') {
    errors.login = 'You must enter a login';
  }

  if (user.password === '') {
    errors.password = 'You must enter a password';
  }

  return errors;
}

export const validateBed = (bed) => {
  const errors = {};

  if (bed.name === '') {
    errors.name = 'You must enter a name';
  }

  return errors;
}

export const validateSector = (sector) => {
  const errors = {};

  if (sector.row === null) {
    errors.name = 'You must enter a row';
  }

  if (sector.column === null) {
    errors.name = 'You must enter a column';
  }

  return errors;
}

export const formatDate = (d) => {
  const YYYY = d.getFullYear();
  const MM = `0${d.getMonth() + 1}`.slice(-2);
  const DD = `0${d.getDate()}`.slice(-2);

  return `${YYYY}-${MM}-${DD}`;
};

export const handleAjaxError = (err) => {
  error('Something went wrong');
  console.warn(err);
};
