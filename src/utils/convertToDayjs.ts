import dayjs from 'dayjs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertToDayJs = (obj: any): any => {
  // If the input is an array, recursively apply the function to each element
  if (Array.isArray(obj)) {
    return obj.map(convertToDayJs);
  }

  // If the input is an object, look for "createdAt" and "updatedAt" fields
  if (typeof obj === 'object' && obj !== null) {
    const newObj = { ...obj }; // Create a shallow copy of the object
    if ('createdAt' in newObj && typeof newObj.createdAt === 'string') {
      newObj.createdAt = dayjs(newObj.createdAt);
    }
    if ('updatedAt' in newObj && typeof newObj.updatedAt === 'string') {
      newObj.updatedAt = dayjs(newObj.updatedAt);
    }

    return newObj;
  }

  // If the input is neither an object nor an array, return it unchanged
  return obj;
};
