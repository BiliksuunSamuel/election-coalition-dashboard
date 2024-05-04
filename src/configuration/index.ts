interface IConfiguration {
  baseUrl: string;
}

export default (): IConfiguration => ({
  baseUrl: import.meta.env.VITE_API_BASEURL,
});
