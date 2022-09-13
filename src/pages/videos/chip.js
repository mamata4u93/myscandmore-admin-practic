import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import PropTypes from 'prop-types';

export const Chip = (props) => {
  const { data, handleRemove } = props;
  return (
    <div
      style={{
        width: "75%",
        display: "flex",
        flexWrap: "wrap",
        borderRadius: "1rem",
        marginBottom: "1rem",
        padding: "0.5rem 0.3rem",
        border: "2px solid #ede8fa",
      }}
    >
      {data?.map((item, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            marginRight: "1rem",
            alignItems: "center",
            borderRadius: "1rem",
            marginBottom: "0.5rem",
            backgroundColor: "yellow",
          }}
        >
          <p
            style={{
              padding: "0.5rem",
              margin: "0 0.5rem",
              borderRadius: "1rem",
              backgroundColor: "yellow",
            }}
            key={index}
          >
            {item.label}
          </p>

          <AiFillCloseCircle
            style={{ fontSize: "1rem", cursor: "pointer" }}
            onClick={() => handleRemove(item.value)}
          />
        </div>
      ))}
    </div>
  );
};

Chip.propTypes = {
  data: PropTypes.any,
  handleRemove: PropTypes.any,
};