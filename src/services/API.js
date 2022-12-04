const API = async () => {
  try {
    const request = await fetch('https://swapi.dev/api/planets');
    const { results } = await request.json();
    results.forEach((element) => delete element.residents);
    return results;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default API;
