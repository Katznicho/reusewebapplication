import React from "react";
import farmerImage from "../../assets/images/farmer (1).png";
import vetImage from "../../assets/images/veterinarian (1).png";
import employeeImage from "../../assets/images/business.png";
import logoImage from "../../assets/images/reuse.png";

const farmer = <img src={farmerImage} alt="farmer" className="w-8 h-8" />;
const vet = <img src={vetImage} alt="veterinarian" className="w-8 h-8" />;
const employee = <img src={employeeImage} alt="employee" className="w-8 h-8" />;
const logo = <img src={logoImage} alt="alt" className="w-30 h-20" />;


export { farmer, vet, employee, logo };
