import Config from "common/Config";

export const getList = async ({ queryKey }) => {
  const token = queryKey[1];
  return fetch(`${Config.apiBaseUrl}/videos`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((res) => res.json());
};

export const getVideoUrl = async ({ queryKey }) => {
  const { fileName, token } = queryKey[1];
  console.log({ fileName });
  return fetch(`${Config.apiBaseUrl}/uploader?filename=${fileName}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((res) => res.json());
};

export const uploadVideo = async (data) => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value);
  }
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}, ${pair[1]}`);
  }
  return fetch(`https://s3.ap-south-1.amazonaws.com/disco-shots`, {
    method: "POST",
    body: formData,
  });
};

export const uploadVideoData = async (data) => {
  const token = data.token;
  return fetch(`${Config.apiBaseUrl}/viedos/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + token,
    },
    data: data.videoData,
  });
};

export const getBrands = async ({ queryKey }) => {
  const { search, token } = queryKey[1];
  return fetch(`${Config.apiBaseUrl}/brands?name=${search}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((res) => res.json());
};

export const getProducts = async ({ queryKey }) => {
  const { search, token } = queryKey[1];
  return fetch(`${Config.apiBaseUrl}/products?name=${search}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((res) => res.json());
};

export const getinfluencer = async ({ queryKey }) => {
  const { search, token } = queryKey[1];
  return fetch(`${Config.apiBaseUrl}/influencers?name=${search}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((res) => res.json());
};

export const getCategories = async ({ queryKey }) => {
  const { search, token } = queryKey[1];
  return fetch(`${Config.apiBaseUrl}/categories?name=${search}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((res) => res.json());
};

export const getHashTags = async ({ queryKey }) => {
  const { search, token } = queryKey[1];
  return fetch(`${Config.apiBaseUrl}/hashtags?name=${search}`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  }).then((res) => res.json());
};

export const uploadAllVideoData = async (data) => {
  console.log({ data });
  const { body, token } = data;
  return fetch(`${Config.apiBaseUrl}/videos/`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
};
