import React, { useState, useEffect } from "react";
import axios from "../api/axios";

const SelectButton = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [org, setOrg] = useState([]);

  useEffect(() => {
    async function fetchOrgs() {
      try {
        const response = await axios.get("/organization");
        setOrg(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchOrgs();
  }, []);
  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <div>
      <label htmlFor="organization">Select an organization:</label>
      <select
        id="organization"
        value={selectedValue}
        onChange={handleSelectChange}
      >
        <option value="">--Select--</option>
        {org.map((organization) => (
          <option key={organization.id} value={organization.id}>
            {organization.name}
          </option>
        ))}
      </select>
      {/* {selectedValue && <p>You selected: {selectedValue}</p>} */}
    </div>
  );
};

export default SelectButton;
