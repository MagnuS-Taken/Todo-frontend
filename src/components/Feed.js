import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import { getAllNotes } from "../apiCalls";

import Note from "./Note";

export default function Feed({ flag, showShare, user }) {
  const [note, setNote] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const resp = await getAllNotes(Cookies.get("user"));

      setNote(
        resp.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };

    fetchPosts();
  }, [flag, user]);

  return (
    <div style={{ flex: "5" }}>
      {note.map((n) => {
        return <Note key={n._id} note={n} />;
      })}
    </div>
  );
}
