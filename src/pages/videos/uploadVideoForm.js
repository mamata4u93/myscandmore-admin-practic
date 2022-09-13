import React from "react";
import { CustomInput } from "components/input";
import PropTypes from 'prop-types';
import "./videoStyles.css";
import { SelectSearch } from "components/selectSearch";

export const UploadForm = (props) => {
  const {
    search,
    products,
    disabled,
    setImage,
    videoData,
    setSearch,
    uploadData,
    handleCheck,
    handleChange,
  } = props;
  return (
    <>
      <div style={{ display: "flex", width: "75%" }}>
        <CustomInput
          label="x*"
          keyValue={"x"}
          disabled={true}
          value={videoData.x}
          onChange={handleChange}
          placeholder="x-coordinate"
        />
        <p style={{ margin: "0 1rem" }}></p>
        <CustomInput
          label="y*"
          keyValue={"y"}
          disabled={true}
          value={videoData.y}
          onChange={handleChange}
          placeholder="y-coordinate"
        />
      </div>
      <div style={{ display: "flex", width: "75%" }}>
        <CustomInput
          disabled={true}
          label="Start Time*"
          keyValue={"startTime"}
          onChange={handleChange}
          value={videoData?.startTime}
          placeholder="Enter Start Time"
        />
        <p style={{ margin: "0 1rem" }}></p>
        <CustomInput
          type="number"
          label="End Time*"
          keyValue="endTime"
          disabled={!disabled}
          onChange={handleChange}
          value={videoData?.endTime}
          placeholder="Enter End Time"
        />
      </div>

      <CustomInput
        label="URL*"
        keyValue={"url"}
        disabled={!disabled}
        value={videoData.url}
        onChange={handleChange}
        placeholder="Enter URL"
      />

      <div className="image-section">
        <CustomInput
          type="file"
          disabled={true}
          label={"Main Image*"}
          keyValue={"mainImage"}
          onChange={handleChange}
          value={videoData?.mainImage}
        />

        <CustomInput
          type="file"
          disabled={true}
          label={"Grid Image*"}
          keyValue={"gridImage"}
          onChange={handleChange}
          value={videoData?.gridImage}
        />
      </div>
      <br />
      <br />
      <br />
      <SelectSearch
        disabled={!disabled}
        width={"100%"}
        search={search}
        options={products}
        setSearch={setSearch}
        keyValue="productValue"
        label="Select Product*"
        setResult={handleChange}
        result={videoData?.product}
        placeholder="Search Product"
      />
      <div className="action_button_row">
        <p className="action_button" onClick={handleCheck}>
          Add Data
        </p>
        <p className="action_button" onClick={uploadData}>
          Done
        </p>
      </div>
    </>
  );
};

UploadForm.propTypes = {
  search: PropTypes.any,
  products: PropTypes.any,
  disabled: PropTypes.any,
  setImage: PropTypes.any,
  videoData: PropTypes.any,
  setSearch: PropTypes.any,
  uploadData: PropTypes.any,
  handleCheck: PropTypes.any,
  handleChange: PropTypes.any,
};