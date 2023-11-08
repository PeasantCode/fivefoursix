//import axios, md5
import axios from "axios";

import md5 from "blueimp-md5"; //you will need to install this module;
const publickey = "0bf1db8c58e77b7244b4403377278c9a";
const privatekey = "aba767aaa3cfa11947d08e85bb050b1f0e3d58a1";
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = "https://gateway.marvel.com:443/v1/public/characters";
const url = baseUrl + "?ts=" + ts + "&apikey=" + publickey + "&hash=" + hash;


export const searchCharacterByName = async (name) => {
  //Function to search the api and return up to 15 characters matching the name param
  const characters = await axios(url + "&nameStartsWith=" + name);
  return characters.data?.data?.results?.slice(0, 15);
};

export const searchCharacterById = async (id) => {
  //Function to fetch a character from the api matching the id
  const url1 = baseUrl + "/" + id + "?ts=" + ts +"&apikey=" + publickey + "&hash=" + hash;
  const oriCharacters = await axios(url1);
  const characters = oriCharacters.data?.data?.results[0];
  return characters;
}
// console.log(await searchCharacterByName("spider"));
// console.log(await searchCharacterById(1010727));