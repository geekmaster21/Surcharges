// Taken from https://github.com/constdars/dotize/blob/master/src/dotize.js

export const Dotize = {
  isNumber: function (f: any) {
    return !isNaN(parseInt(f));
  },

  isEmptyObj: function (obj: any) {
    for (const prop in obj) {
      if (Object.hasOwnProperty.call(obj, prop)) return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
  },

  isNotObject: function (obj: any) {
    return !obj || typeof obj !== 'object';
  },

  isEmptyArray: function (arr: any[]) {
    return Array.isArray(arr) && arr.length === 0;
  },

  isNotArray: function (arr: any) {
    return Array.isArray(arr) === false;
  },

  getFieldName: function (
    field: string,
    prefix: string,
    isRoot?: boolean,
    isArrayItem?: boolean,
    isArray?: boolean
  ) {
    if (isArray)
      return (
        (prefix ? prefix : '') +
        (Dotize.isNumber(field)
          ? '[' + field + ']'
          : (isRoot && !prefix ? '' : '.') + field)
      );
    else if (isArrayItem) return (prefix ? prefix : '') + '[' + field + ']';
    else return (prefix ? prefix + '.' : '') + field;
  },

  convert: function (obj: any, prefix?: string) {
    let newObj = {} as any;

    // primitives
    if (Dotize.isNotObject(obj) && Dotize.isNotArray(obj)) {
      if (prefix) {
        newObj[prefix] = obj;
        return newObj;
      } else {
        return obj;
      }
    }

    return (function recurseConvert(
      o: any,
      p: string | undefined,
      isRoot?: boolean
    ) {
      const isArrayItem = Array.isArray(o);
      const _prefix = p || '';
      for (const f in o) {
        const currentProp = o[f];
        if (currentProp && typeof currentProp === 'object') {
          if (Array.isArray(currentProp)) {
            if (Dotize.isEmptyArray(currentProp)) {
              newObj[Dotize.getFieldName(f, _prefix, isRoot, false, true)] =
                currentProp;
            } else {
              newObj = recurseConvert(
                currentProp,
                Dotize.getFieldName(f, _prefix, isRoot, false, true),
                isArrayItem
              ); // array
            }
          } else {
            if (isArrayItem && Dotize.isEmptyObj(currentProp) === false) {
              newObj = recurseConvert(
                currentProp,
                Dotize.getFieldName(f, _prefix, isRoot, true)
              ); // array item object
            } else if (Dotize.isEmptyObj(currentProp) === false) {
              newObj = recurseConvert(
                currentProp,
                Dotize.getFieldName(f, _prefix, isRoot)
              ); // object
            } else if (Dotize.isEmptyObj(currentProp)) {
              newObj[Dotize.getFieldName(f, _prefix, isRoot, isArrayItem)] =
                currentProp;
            }
          }
        } else {
          if (isArrayItem || Dotize.isNumber(f)) {
            newObj[Dotize.getFieldName(f, _prefix, isRoot, true)] = currentProp; // array item primitive
          } else {
            newObj[Dotize.getFieldName(f, _prefix, isRoot)] = currentProp; // primitive
          }
        }
      }

      return newObj;
    })(obj, prefix, true);
  },
};
