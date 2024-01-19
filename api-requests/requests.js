const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const baseUrlResidential = `${baseUrl}/inmuebles`;
const newBaseUrlResidential = `${baseUrl}/inmuebles/web/department=Residencial&showOnWeb=true`;
const newBaseUrlPatrimonial = `${baseUrl}/inmuebles/web/department=Patrimonio&showOnWeb=true`;
const newBaseUrlRustico = `${baseUrl}/inmuebles/web/department=Otros&showOnWeb=true&zone=636a961ce64d2932b53366f4`;
const newBaseUrlSingular = `${baseUrl}/inmuebles/web/department=Otros&showOnWeb=true&zone=636a965fe64d2932b5336711`;
const newBaseUrlCosta = `${baseUrl}/inmuebles/web/department=Otros&showOnWeb=true&zone=636a969ee64d2932b533674b"`;

const requestBaseParams = {
  method: "GET",
  credentials: "include",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

export const getWebData = async () => {
  const response = await fetch(`${baseUrl}/web/home`, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  if (response.status !== 200) {
    throw new Error(`Error on send email ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export const getResidential = async (filters) => {
  /* console.log(filters) */
  const filterParams = new URLSearchParams(filters);
  const urlWithFilters = !!filterParams
    ? `${newBaseUrlResidential}&${filterParams.toString()}`
    : `${newBaseUrlResidential}`;
  /* console.log(urlWithFilters) */
  const newUrl = new URL(urlWithFilters);
  /* console.log(newUrl) */

  const response = await fetch(newUrl, requestBaseParams);
  const adsInfo = await response.json();
  /* console.log(adsInfo) */
  return adsInfo;
};

export const getPatrimonial = async (filters) => {
  /* console.log(filters) */
  const filterParams = new URLSearchParams(filters);
  const urlWithFilters = !!filterParams
    ? `${newBaseUrlPatrimonial}&${filterParams.toString()}`
    : `${newBaseUrlPatrimonial}`;
  /* console.log(urlWithFilters) */
  const newUrl = new URL(urlWithFilters);
  /* console.log(newUrl) */

  const response = await fetch(newUrl, requestBaseParams);
  const adsInfo = await response.json();
  /* console.log(adsInfo) */
  return adsInfo;
};

export const getCosta = async (filters) => {
  /* console.log(filters) */
  const filterParams = new URLSearchParams(filters);
  const urlWithFilters = !!filterParams
    ? `${newBaseUrlCosta}&${filterParams.toString()}`
    : `${newBaseUrlCosta}`;
  /* console.log(urlWithFilters) */
  const newUrl = new URL(urlWithFilters);
  /* console.log(newUrl) */

  const response = await fetch(newUrl, requestBaseParams);
  const adsInfo = await response.json();
  /* console.log(adsInfo) */
  return adsInfo;
};

export const getRustico = async (filters) => {
  /* console.log(filters) */
  const filterParams = new URLSearchParams(filters);
  const urlWithFilters = !!filterParams
    ? `${newBaseUrlRustico}&${filterParams.toString()}`
    : `${newBaseUrlRustico}`;
  /* console.log(urlWithFilters) */
  const newUrl = new URL(urlWithFilters);
  /* console.log(newUrl) */

  const response = await fetch(newUrl, requestBaseParams);
  const adsInfo = await response.json();
  /* console.log(adsInfo) */
  return adsInfo;
};

export const getSingular = async (filters) => {
  /* console.log(filters) */
  const filterParams = new URLSearchParams(filters);
  const urlWithFilters = !!filterParams
    ? `${newBaseUrlSingular}&${filterParams.toString()}`
    : `${newBaseUrlSingular}`;
  /* console.log(urlWithFilters) */
  const newUrl = new URL(urlWithFilters);
  /* console.log(newUrl) */

  const response = await fetch(newUrl, requestBaseParams);
  const adsInfo = await response.json();
  /* console.log(adsInfo) */
  return adsInfo;
};

export const getResidentialItem = async (id) => {
  // console.log(`${baseUrlResidential}${id}`)
  const response = await fetch(
    `${baseUrlResidential}/${id}`,
    requestBaseParams
  );
  /* console.log(response) */
  const adInfo = await response.json();
  /* console.log(adInfo) */
  return [adInfo];
};

export const getPatrimonialItem = async (id) => {
  const response = await fetch(
    `${baseUrlResidential}/${id}`,
    requestBaseParams
  );
  /* console.log(response) */
  const adInfo = await response.json();
  /* console.log(adInfo) */
  return [adInfo];
};

export const getConsultants = async () => {
  const response = await fetch(`${baseUrl}/consultants`, {
    method: "GET",
    cors: true,
  });
  const result = await response.json();
  return result;
};

export const getCatalogs = async () => {
  const response = await fetch(`${baseUrl}/catalogs/all`, {
    method: "GET",
    cors: true,
  });
  const result = await response.json();
  return result;
};

export const sendInfoEmailFromActiveItemForm = async (form) => {
  // console.log(form);
  const response = await fetch(`${baseUrl}/mails/webReservations`, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(form),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  if (response.status !== 200) {
    throw new Error(`Error on send email ${response.status}`);
  }
  const data = await response.json();
  return data;
  // const { data } = response;
};
