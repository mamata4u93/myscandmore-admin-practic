import { message } from "antd";
import React, { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useMutation, useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';
import { Chip } from "./chip";
import { CustomInput } from "components/input";
import { SelectSearch } from "components/selectSearch";
import { addVideoDetails, clearVideoDetails } from "store/VideoData";
import {
  getBrands,
  getHashTags,
  getVideoUrl,
  uploadVideo,
  getCategories,
  getinfluencer,
  uploadAllVideoData,
} from "./api";

const notify = ({ notification, type }) => {
  if (type === "error") message.error(`${notification}`, 5);
  else message.success(`${notification}`, 5);
};

export const VideoDetailsModal = (props) => {
  const { setOpen, setCloseSelf } = props;
  const initialValue = {
    title: "",
    brand: "",
    product: "",
    thumbnail: {},
    influencer: "",
  };

  const dispatch = useDispatch();

  const [tags, setTags] = useState([]);

  const [categoriesValue, setCategoriesValue] = useState([]);

  const handleAddCategories = (keyValue, value) => {
    if (keyValue === "categories") {
      if (categoriesValue.includes(value)) return;
      else setCategoriesValue((prev) => [...prev, value]);
    } else {
      if (tags.includes(value)) return;
      else setTags((prev) => [...prev, value]);
    }
  };

  const handleRemoveCategory = (id) => {
    setCategoriesValue(categoriesValue?.filter((sr) => sr.value !== id));
  };
  const handleRemoveTags = (id) => {
    setTags(tags?.filter((sr) => sr.value !== id));
  };

  const handleChange = (keyValue, value) => {
    const newLoginForm = { ...videoData };
    newLoginForm[keyValue] = value;
    setVideoData(newLoginForm);
  };

  useEffect(() => {
    dispatch(clearVideoDetails());
  }, []);

  const [serverUrl, setServerUrl] = useState("");
  const [serverKey, setServerKey] = useState("");
  const [serverFields, setServerFields] = useState({});

  const videoState = useSelector((state) => state.createVideoData);

  const { mutate: uploadAll, isLoading: uploadingAllVideoData } = useMutation(
    uploadAllVideoData,
    {
      onSuccess: async (res) => {
        const json = await res.json();
        console.log({ res });
        console.log(json);
      },
    }
  );

  const { mutate: thumbnailUpload, isLoading: uploadingVideo } = useMutation(
    uploadVideo,
    {
      onSuccess: async (res) => {
        if (res.status === 204) uploadAllData();
      },
    }
  );

  const uploadData = () => {
    thumbnailUpload({
      ...serverFields,
      file: videoData?.thumbnail,
    });
  };

  const uploadAllData = () => {
    var categories = [];
    for (const [keys, values] of Object.entries(categoriesValue)) {
      if (!categories.includes(values.value)) categories.push(values.value);
    }
    uploadAll({
      body: {
        hashTags: tags,
        type: "influencer",
        categories: categories,
        title: videoData?.title,
        dots: videoState?.videoData,
        influencerId: videoData?.influencer?.value,
        thumbnail: `${serverUrl + "/" + serverKey}`,
        dataURL: `${
          videoState?.videoDetails?.videoUrl +
          "/" +
          videoState?.videoDetails?.videoKey
        }`,
      },
      token: token,
    });
  };

  const handleSubmit = () => {
    const { brand, title, product, thumbnail, influencer } = videoData;
    if (brand !== "" && title !== "" && thumbnail?.name && influencer !== "") {
      dispatch(
        addVideoDetails({
          ...videoData,
          tags: tags,
          thumbnailUrl: serverUrl,
          thumbnailKey: serverKey,
          categories: categoriesValue,
          thumbnailFields: serverFields,
        })
      );

      if (Object.keys(videoState?.videoData).length === 0) {
        setOpen(true);
        notify({
          notification: "Please upload video",
          type: "warning",
        });
      } else {
        notify({
          notification: "Data updated",
          type: "succcess",
        });
        uploadData();
      }
    } else {
      notify({
        notification: "Please enter all required data",
        type: "error",
      });
      return;
    }
  };

  const [videoData, setVideoData] = useState(initialValue);
  const token = useSelector((state) => state.auth.token);

  const [searchTags, setSearchTags] = useState("");
  const [searchBrand, setSearchBrand] = useState("");
  const [searchInfluencer, setSearchInfluencer] = useState("");
  const [searchCategories, setSearchCategories] = useState("");

  const { data: brands, isLoading: gettingBrands } = useQuery(
    ["getBrands", { search: searchBrand, token: token }],
    getBrands,
    {
      enabled: searchBrand !== "",
      select: (data) => {
        let temp = [];
        data?.data?.data?.map((item) => {
          item._id in temp
            ? null
            : temp.push({ value: item?._id, label: item?.name });
        });
        return temp;
      },
    }
  );

  const { data: influencers, isLoading: gettingInfluencers } = useQuery(
    ["getInfluencers", { search: searchInfluencer, token: token }],
    getinfluencer,
    {
      enabled: searchInfluencer !== "",
      select: (data) => {
        let temp = [];
        data?.data?.data?.map((item) => {
          item._id in temp
            ? null
            : temp.push({ value: item?._id, label: item?.name });
        });
        return temp;
      },
    }
  );

  const { data: categories, isLoading: gettingCategories } = useQuery(
    ["getCategories", { search: searchCategories, token: token }],
    getCategories,
    {
      enabled: searchCategories !== "",
      select: (data) => {
        let temp = [];
        data?.data?.data?.map((item) => {
          item._id in temp
            ? null
            : temp.push({ value: item?._id, label: item?.name });
        });
        return temp;
      },
    }
  );

  const { data: hashTags, isLoading: gettingHashTags } = useQuery(
    ["getTags", { search: searchTags, token: token }],
    getHashTags,
    {
      enabled: searchTags !== "",
      select: (data) => {
        let temp = [];
        data?.data?.data?.map((item) => {
          item._id in temp
            ? null
            : temp.push({ value: item?._id, label: item?.name });
        });
        return temp;
      },
    }
  );

  const { data: serverThumbnailUrl, isLoading: gettingThumbnailUrl } = useQuery(
    ["getThumbnailUrl", { fileName: videoData?.thumbnail?.name, token: token }],
    getVideoUrl,
    {
      enabled: !!videoData?.thumbnail?.name,
      onSuccess: async (res) => {
        if (res.status !== 200)
          notify({
            notification: "Something went wrong please try again",
            type: "error",
          });
        else {
          if (res.data.key !== serverKey) {
            setServerUrl(res.data.url);
            setServerFields(res.data.fields);
            setServerKey(res.data.fields.key);
          }
        }
      },
    }
  );

  return (
    <div style={styles.container}>
      <div style={styles.close}>
        <AiFillCloseCircle
          style={styles.closeIcon}
          onClick={() => setCloseSelf(false)}
        />
      </div>
      <div style={styles.inputContainer}>
        <CustomInput
          disabled={false}
          keyValue={"title"}
          label="Video Title*"
          value={videoData.title}
          onChange={handleChange}
          placeholder="Enter Video Title"
        />
        <div style={styles.thumbnailSection}>
          <CustomInput
            type="file"
            disabled={false}
            label={"Thumbnail*"}
            keyValue={"thumbnail"}
            onChange={handleChange}
            value={videoData?.thumbnail}
          />
          <p style={styles.videoFormLink} onClick={() => setOpen(true)}>
            Add/Edit Video
          </p>
        </div>
        <SelectSearch
          keyValue="brand"
          options={brands}
          search={searchBrand}
          label="Select Brand*"
          setResult={handleChange}
          result={videoData?.brand}
          placeholder="Search Brand"
          setSearch={setSearchBrand}
        />
        <SelectSearch
          keyValue="influencer"
          options={influencers}
          setResult={handleChange}
          search={searchInfluencer}
          label="Select influencer*"
          result={videoData?.influencer}
          placeholder="Search Influencer"
          setSearch={setSearchInfluencer}
        />
        <SelectSearch
          keyValue="categories"
          options={categories}
          label="Select category"
          result={categoriesValue}
          search={searchCategories}
          placeholder="Search Categories"
          setResult={handleAddCategories}
          setSearch={setSearchCategories}
        />
        {categoriesValue?.length > 0 && (
          <Chip data={categoriesValue} handleRemove={handleRemoveCategory} />
        )}
        <SelectSearch
          result={tags}
          keyValue="tags"
          options={hashTags}
          search={searchTags}
          label="Select Hashtags"
          setSearch={setSearchTags}
          placeholder="Search HashTags"
          setResult={handleAddCategories}
        />
        {tags?.length > 0 && (
          <Chip data={tags} handleRemove={handleRemoveTags} />
        )}{" "}
        <h4 style={styles.done} onClick={handleSubmit}>
          Upload
        </h4>
      </div>
    </div>
  );
};

const styles = {
  container: {
    top: "0",
    left: "0",
    right: "0",
    zIndex: "10",
    height: "86vh",
    padding: "0 2rem",
    position: "absolute",
    backgroundColor: "#fff",
  },
  close: {
    width: "100%",
    height: "1rem",
    position: "relative",
  },
  closeIcon: {
    top: "0.5rem",
    right: "-1.5rem",
    fontSize: "2rem",
    cursor: "pointer",
    position: "absolute",
  },
  inputContainer: {
    height: "84vh",
    overflow: "scroll",
    position: "relative",
    paddingBottom: "10rem",
  },
  thumbnailSection: {
    display: "flex",
    marginBottom: "2rem",
    alignItems: "flex-end",
  },
  videoFormLink: {
    color: "blue",
    cursor: "pointer",
    marginLeft: "1rem",
    textDecoration: "underline",
  },
  done: {
    color: "#fff",
    cursor: "pointer",
    width: "fit-content",
    padding: "0.5rem 1rem",
    borderRadius: "0.5rem",
    backgroundColor: "skyBlue",
  },
};

VideoDetailsModal.propTypes = {
  setOpen: PropTypes.any,
  setCloseSelf: PropTypes.any,
};