const getPrefix = (key, value) => {
  if (key.length === 1) {
    return '-';
  }
  if (value === false) {
    return '--no-';
  }

  return '--';
};

const minimistToArgs = (params) => Object.keys(params)
  .reduce((res, key) => {
    const value = params[key];
    const prefix = getPrefix(key, value);

    res.push(prefix + key);

    if (value !== true && prefix !== '--no-') {
      res.push(value);
    }

    return res;
  }, []);

module.exports = minimistToArgs;
