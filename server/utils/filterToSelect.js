const filterToSelect = (obj, ...allowedFields) => {
  // {"anme": {type: strig}, "email": {}}
  let s = "";
  Object.keys(obj).forEach((el) => {
    if (!allowedFields.includes(el)) s += `-${el} `;
  });

  return s;
};

module.exports = filterToSelect;
