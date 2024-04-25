import { Base } from '@/types/base';
import dayjs from 'dayjs';

export const convertToDayJs = (obj: Base): any => {
  if (Array.isArray(obj)) {
    return obj.map(convertToDayJs);
  }

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

  return obj;
};
