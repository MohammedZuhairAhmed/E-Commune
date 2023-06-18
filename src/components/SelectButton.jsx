import React, { useState, useEffect } from "react";
import axios from "../api/axios";

const SelectButton = ({ onOrgIDChange }) => {
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
    const selectedOrgId = e.target.value;
    setSelectedValue(selectedOrgId);
    onOrgIDChange(selectedOrgId);
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
          <option key={organization._id} value={organization._id}>
            {organization.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectButton;
