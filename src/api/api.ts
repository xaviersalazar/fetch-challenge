import { UserForm } from "../utils/types";

const API_URL = 'https://frontend-take-home.fetchrewards.com/form';
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};


const getOptions = async () => {
  return await fetch(API_URL, { headers })
    .then((res) => res.json())
}

const submitForm = async (userForm: UserForm) => {
  return await fetch(API_URL, { 
    method: "POST",
    body: JSON.stringify(userForm),
    headers
  })
    .then((res) => res)
}

export {
  getOptions,
  submitForm
}