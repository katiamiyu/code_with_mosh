const app = require('./app');

describe('absolute',()=>{
  it('should return number if its positive', ()=>{
   const result = app.absolute(0);
   expect(result).toBe(0);
  });
  it('should return positive number if less than zero', ()=>{
   const result = app.absolute(-1);
   expect(result).toBe(1);
  });
});

describe('division', ()=>{
  it('should throw error when denominator value is zero', ()=>{
    expect(()=>app.divide(1,o)).toThrow();
  });
});