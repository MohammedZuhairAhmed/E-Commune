import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

const Seat_Selection = () => {
  useEffect(() => {
    async function updateData() {
      try {
        axios.patch();
      } catch (error) {
        console.error(error);
      }
    }

    updateData();
  });
  const { cid, vid } = useParams();
  return <h1>hello</h1>;
};

export default Seat_Selection;
