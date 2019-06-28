//retorna una promise esta función cuando el middleware redux promise detecta un promise
//ejecuta la promise obtiene el resultado, donde genera una accion y la toma el reducer
//detiene la accion hasta que obtiene el resultado del servidor
export const apiGet =( url) => () => fetch(url).then(v => v.json());