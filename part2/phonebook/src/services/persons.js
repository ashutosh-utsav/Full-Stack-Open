import axios from "axios";
const baseUrl = "http://localhost:5173/persons";

const getAll = () => {
  const request = axios.get(baseUrl);

  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);

  return request.then((response) => response.data);
};

const removeContact = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);

  return request.then((respose) => respose.data);
};

const updateContact = (id, updatedContact) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedContact);

  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  removeContact,
  updateContact,
};
