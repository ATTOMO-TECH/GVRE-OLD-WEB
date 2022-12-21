//PROD
const baseUrlResidential = 'https://api.vamosaporello.com/inmuebles/';
const baseUrlConsultants = 'https://www.gvrecrm.com/';
const newBaseUrlResidential = 'https://api.vamosaporello.com/inmuebles/web/department=Residencial&showOnWeb=true';
const newBaseUrlPatrimonial = 'https://api.vamosaporello.com/inmuebles/web/department=Patrimonio&showOnWeb=true';

//LOCAL
//const baseUrlResidential = 'http://localhost:3500/inmuebles/';
//const baseUrlConsultants = 'http://localhost:3500/';
//const newBaseUrlResidential = 'http://localhost:3500/inmuebles/web/department=Residencial&showOnWeb=true';
//const newBaseUrlPatrimonial = 'http://localhost:3500/inmuebles/web/department=Patrimonio&showOnWeb=true';

// const baseUrlResidential    =   process.env.REACT_APP_BASE_URL_RESIDENTIAL;
// const baseUrlConsultants    =   process.env.REACT_APP_BASE_URL_CONSULTANT;
// const newBaseUrlResidential =   process.env.REACT_APP_NEW_BASE_URL_RESIDENTIAL;
// const newBaseUrlPatrimonial =   process.env.REACT_APP_NEW_BASE_URL_PATRIMONIAL;
// const newBaseUrlRustico     =   process.env.REACT_APP_NEW_BASE_URL_RUSTICO;
// const newBaseUrlSingular    =   process.env.REACT_APP_NEW_BASE_URL_SINGULAR;
// const newBaseUrlCosta       =   process.env.REACT_APP_NEW_BASE_URL_COSTA;

const requestBaseParams = {
    method: 'GET',
    credentials: 'include',
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
}

export const getResidential = async (filters) => {
    /* console.log(filters) */
    const filterParams = new URLSearchParams(filters)
    const urlWithFilters = !!filterParams ? `${newBaseUrlResidential}&${filterParams.toString()}` : `${newBaseUrlResidential}`;
    /* console.log(urlWithFilters) */
    const newUrl = new URL(urlWithFilters)
    /* console.log(newUrl) */

    const response = await fetch(newUrl, requestBaseParams)
    const adsInfo = await response.json()
    /* console.log(adsInfo) */
    return adsInfo
}

export const getPatrimonial = async (filters) => {
    /* console.log(filters) */
    const filterParams = new URLSearchParams(filters)
    const urlWithFilters = !!filterParams ? `${newBaseUrlPatrimonial}&${filterParams.toString()}` : `${newBaseUrlPatrimonial}`;
    /* console.log(urlWithFilters) */
    const newUrl = new URL(urlWithFilters)
    /* console.log(newUrl) */

    const response = await fetch(newUrl, requestBaseParams)
    const adsInfo = await response.json()
    /* console.log(adsInfo) */
    return adsInfo
}

export const getRustico = async (filters) => {
    /* console.log(filters) */
    const filterParams = new URLSearchParams(filters)
    const urlWithFilters = !!filterParams ? `${newBaseUrlRustico}&${filterParams.toString()}` : `${newBaseUrlRustico}`;
    /* console.log(urlWithFilters) */
    const newUrl = new URL(urlWithFilters)
    /* console.log(newUrl) */

    const response = await fetch(newUrl, requestBaseParams)
    const adsInfo = await response.json()
    /* console.log(adsInfo) */
    return adsInfo
}

export const getSingular = async (filters) => {
    /* console.log(filters) */
    const filterParams = new URLSearchParams(filters)
    const urlWithFilters = !!filterParams ? `${newBaseUrlSingular}&${filterParams.toString()}` : `${newBaseUrlSingular}`;
    /* console.log(urlWithFilters) */
    const newUrl = new URL(urlWithFilters)
    /* console.log(newUrl) */

    const response = await fetch(newUrl, requestBaseParams)
    const adsInfo = await response.json()
    /* console.log(adsInfo) */
    return adsInfo
}

export const getCosta = async (filters) => {
    /* console.log(filters) */
    const filterParams = new URLSearchParams(filters)
    const urlWithFilters = !!filterParams ? `${newBaseUrlCosta}&${filterParams.toString()}` : `${newBaseUrlCosta}`;
    /* console.log(urlWithFilters) */
    const newUrl = new URL(urlWithFilters)
    /* console.log(newUrl) */

    const response = await fetch(newUrl, requestBaseParams)
    const adsInfo = await response.json()
    /* console.log(adsInfo) */
    return adsInfo
}

export const getResidentialItem = async (id) => {
    const response = await fetch(`${baseUrlResidential}${id}`, requestBaseParams)
    /* console.log(response) */
    const adInfo = await response.json()
    /* console.log(adInfo) */
    return [adInfo]
}

export const getPatrimonialItem = async (id) => {
    const response = await fetch(`${baseUrlResidential}${id}`, requestBaseParams)
    /* console.log(response) */
    const adInfo = await response.json()
    /* console.log(adInfo) */
    return [adInfo]
}

export const getConsultants = () => {
    return fetch(`${baseUrlConsultants}consultants`, {
        method: 'GET',
        cors: true
    }).then((response) => response.json())
}