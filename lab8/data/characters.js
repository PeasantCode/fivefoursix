//import axios, md5
import md5 from 'blueimp-md5' //you will need to install this module;
const publickey = '0bf1db8c58e77b7244b4403377278c9a';
const privatekey = 'aba767aaa3cfa11947d08e85bb050b1f0e3d58a1';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;


export const searchCharacterByName = async (name) => {
  //Function to search the api and return up to 15 characters matching the name param

};

export const searchCharacterById = async (id) => {
  //Function to fetch a character from the api matching the id
};
