const safeParse = (str, defaultVal = {}) => 
{
  try {
      return JSON.parse(str)
  } catch (error) {
      return defaultVal
  }
};

export default safeParse;