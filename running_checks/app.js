exports.absolute = (n)=>{
  return (n>=0)?n:-n;
};
exports.divide = (n,d)=>{
  if (d===0) throw new Error('division by zero');
  return n/d;
};