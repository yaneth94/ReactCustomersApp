//retorna una promise esta función cuando el middleware redux promise detecta un promise
//ejecuta la promise obtiene el resultado, donde genera una accion y la toma el reducer
//detiene la accion hasta que obtiene el resultado del servidor
export const apiGet = url => () => fetch(url).then(v => v.json());

export const apiPut = (url, id, obj) => () =>
  fetch(`${url}/${id}`, {
    method: "PUT",
    body: JSON.stringify(obj),
    headers: new Headers({ "Content-type": "application/json" })
  })
    .then(v => v.json())
    .then(r => {
      if (r.error) {
        return Promise.reject(r.validation);
      }
      return r;
    })
    .catch(e => {
      return Promise.reject(e);
    });
