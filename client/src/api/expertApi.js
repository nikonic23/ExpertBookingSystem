import axios from "axios";

const API =
  "http://localhost:5000/api";

export const getExperts =
  async (
    page = 1,
    search = "",
    category = ""
  ) => {

    const response =
      await axios.get(
        `${API}/experts`,
        {
          params: {
            page,
            limit: 2,
            search,
            category
          }
        }
      );

    return response.data;
  };

export const getExpertById =
  async (id) => {

    const response =
      await axios.get(
        `${API}/experts/${id}`
      );

    return response.data;
  };