import axios from "axios";

export const loginCall = async (userInfo) => {
  try {
    const res = await axios.post("/auth/login", userInfo);
    return res["data"];
  } catch (e) {
    return false;
  }
};

export const registerCall = async (userInfo) => {
  try {
    const res = await axios.post("/auth/signup", userInfo);
    return res["data"];
  } catch (e) {
    return false;
  }
};

export const addNote = async (data) => {
  try {
    await axios.post("/note", data);
  } catch (e) {
    return e;
  }
};

export const deleteNote = async (id) => {
  try {
    await axios.delete("/note/" + id);
    return true;
  } catch (e) {
    return e;
  }
};

export const editNote = async (id, data) => {
  try {
    await axios.put("/note/" + id, data);
    return true;
  } catch (e) {
    return e;
  }
};

export const getAllNotes = async (id) => {
  try {
    const res = await axios.get("/note/profile/" + id);
    return res["data"];
  } catch (e) {
    return false;
  }
};
