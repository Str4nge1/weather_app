const generateIconUrl = (name: string) =>
  `${import.meta.env.VITE_ICON_API_BASE_URL}img/wn/${name}@2x.png`;

export default generateIconUrl;
