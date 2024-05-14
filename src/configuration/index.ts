interface IConfiguration {
  baseUrl: string;
}

export default (): IConfiguration => ({
  baseUrl: import.meta.env.PROD
    ? import.meta.env.VITE_API_PROD_BASEURL
    : import.meta.env.VITE_API_BASEURL,
});
