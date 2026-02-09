// import React, { useState } from "react";
import ExamCard from "./ExamCard";
import "./AviationAuthority.css";
import { BookIcon, filterIcon } from "../Exam/images";
// import { Typography, useTheme } from "@mui/material";

const examsData = [
  {
    title: "Commercial Pilot License – Theory",
    desc: "Complete CPL theory examination based on DGCA standards",
    authority: "DGCA",
    chapters: 8,
  },
  {
    title: "Air Transport Pilot License",
    desc: "ATPL written examination covering all subjects",
    authority: "DGCA",
    chapters: 3,
  },
  {
    title: "Private Pilot License – Written",
    desc: "PPL knowledge test as per FAA regulations",
    authority: "FAA",
    chapters: 3,
  },
  {
    title: "Instrument Rating Exam",
    desc: "Instrument rating knowledge examination",
    authority: "FAA",
    chapters: 2,
  },
  {
    title: "ICAO English Language Proficiency",
    desc: "Aviation English proficiency assessment",
    authority: "ICAO",
    chapters: 3,
  },
  {
    title: "ICAO English Language Proficiency",
    desc: "Aviation English proficiency assessment",
    authority: "ICAO",
    chapters: 3,
  },
];

const authorityOptions = [
  { label: "DGCA (Directorate General of Civil Aviation)", value: "DGCA" },
  { label: "FAA", value: "FAA" },
  { label: "ICAO", value: "ICAO" },
  { label: "EASA", value: "EASA" },
];

const AviationAuthority = () => {
  const [selectedAuthorities, setSelectedAuthorities] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleAuthority = (value) => {
    setSelectedAuthorities((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const filteredData =
    selectedAuthorities.length === 0
      ? examsData
      : examsData.filter((exam) =>
          selectedAuthorities.includes(exam.authority),
        );

  return (
    <div className="authority-container">
      <Typography
        variant="h1"
        fontWeight={600}
        sx={{
          fontFamily: "Exo, sans-serif",
          textAlign: "left",
          fontSize: {
            xs: "1.75rem",
            sm: "2.25rem",
            md: "2.75rem",
            lg: "3.25rem",
          },
        }}
      >
        Choose Your Aviation Authority
      </Typography>

      <Typography
        sx={{
          mt: 1,
          mb: 4,
          textAlign: "left",
          fontFamily: "Exo, sans-serif",
          color: "#6b7280",
          fontSize: {
            xs: "0.95rem",
            sm: "1rem",
            md: "1.1rem",
          },
          lineHeight: 1.6,
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus in
        libero risus semper habitant arcu eget.
      </Typography>

      <div className="filter-bar">
        <div className="filter-text">
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{
              fontFamily: "Exo, sans-serif",
              fontSize: {
                xs: "1.1rem",
                sm: "1.25rem",
              },
            }}
          >
            Select an Exam
          </Typography>

          <Typography
            sx={{
              fontFamily: "Exo, sans-serif",
              color: "#6b7280",
              fontSize: "0.9rem",
            }}
          >
            Choose an aviation authority exam to practice
          </Typography>
        </div>

        <div className="custom-dropdown">
          <button
            className="dropdown-trigger"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span className="dropdown-left">
              <img src={filterIcon} alt="filter" className="filter-icon-img" />
              <Typography
                component="span"
                sx={{
                  fontWeight: 500,
                }}
              >
                All Authorities
              </Typography>
            </span>

            <span className="dropdown-arrow">⏷</span>
          </button>

          {dropdownOpen && (
            <div className="dropdown-panel">
              {authorityOptions.map((option) => {
                const active = selectedAuthorities.includes(option.value);

                return (
                  <div
                    key={option.value}
                    className="dropdown-option"
                    onClick={() => toggleAuthority(option.value)}
                  >
                    <span className={`tick-circle ${active ? "active" : ""}`}>
                      {active && "✓"}
                    </span>
                    <Typography
                      component="span"
                      sx={{
                       fontWeight: 500,
                      }}
                    >
                      {option.label}
                    </Typography>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="exam-list">
        {filteredData.map((exam, index) => (
          <ExamCard key={index} exam={exam} />
        ))}
      </div>
    </div>
  );
};
export default AviationAuthority;
