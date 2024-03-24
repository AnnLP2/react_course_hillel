import axios from "axios";

const API = `https://65ef5bb3ead08fa78a5055fb.mockapi.io/list`;

const list = {
  get: () => axios(API).then(({ data }) => data),
  delete: (id) => axios.delete(API + `/${id}`).then(({ data }) => data),
  patch: (id, item) =>
    axios.patch(API + `/${id}`, item).then(({ data }) => data),
  put: (id, item) => axios.put(API + `/${id}`, item).then(({ data }) => data),
  post: (item) => axios.post(API, item).then(({ data }) => data),
};

export { list };
