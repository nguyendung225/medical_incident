interface ParamType {
  name: string
  value: any
}

export const handleChangeURLParams = (
  paramList: ParamType[],
  navigate: any,
  params: URLSearchParams,
  pathname: string
) => {
  paramList.map((param: ParamType) => {
    params.set(param.name, String(param.value))
  })
  navigate(`${pathname}?${params.toString()}`)
}

export const urlParamsConfig = (url: string, searchObject: object) => {
  let hasSearchObject = false;

  for (const [key, value] of Object.entries(searchObject)) {
    if (value) {
      if (!hasSearchObject) {
        url += "?";
        hasSearchObject = true;
      } else {
        url += "&";
      }
      url += `${key}=${value}`;
    }
  }

  return url;
}

export const paramsConfig = (searchObject: object) => {
  let config = { params: searchObject }
  return config
}
