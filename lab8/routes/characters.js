//import express and express router as shown in lecture code and worked in previous labs.  Import your data functions from /data/characters.js that you will call in your routes below
import { Router } from "express";
const router = Router();
import {
  searchCharacterById,
  searchCharacterByName,
} from "../data/characters.js";

router.route("/").get(async (req, res) => {
  //code here for GET will render the home handlebars file
  res.render("home");
});

router.route("/searchmarvelcharacters").post(async (req, res) => {
  const { searchCharacterByName: characterName } = req.body;
  try {
    if (!characterName.trim())
      throw "You must enter a character name to search.";
  } catch (e) {
    return res.status(400).render("error", { error: e });
  }

  const characters = await searchCharacterByName(characterName);
  const idsNames = characters.map((character) => ({
    id: character.id,
    name: character.name,
  }));
  return res.render("characterSearchResults", { idsNames, characterName });
});

router.route("/marvelcharacter/:id").get(async (req, res) => {
  const id = req.params.id;
  const character = await searchCharacterById(id);
  try {
    if (!character) throw "the character with this id does not exist";
  } catch (e) {
    res.status(404).render("error", { error: e });
  }
  const { name, description, thumbnail, comics } = character;
  const { path, extension } = thumbnail;
  res.render("characterById", {
    name,
    description,
    imgUrl: `${path}.${extension}`,
    comics: comics.items.map((comic) => comic.name),
  });
});
export default router;
