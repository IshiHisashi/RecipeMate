import axios from "axios";

export const fetchGraphQL = async (query: string, variables: object = {}) => {
  try {
    const response = await axios({
      url: "",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        query,
        variables,
      },
    });
    return response.data;
  } catch (err) {
    console.log("graphQL failed", err);
    throw err;
  }
};
