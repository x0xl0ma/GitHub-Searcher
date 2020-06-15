import React, { useReducer } from "react";
import { GitContext } from "./gitContext";
import { gitReducer } from "./gitReducer";
import {
  SEARCH_USERS,
  GET_USER,
  GET_REPOS,
  CLEAR_USERS,
  SET_LOADING,
} from "../types";
import axios from "axios";

const CLIENT_ID = process.env.REACT_APP_CIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SECRET;

const withCreds = url => {
  return `${url}client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
}

export const GitState = ({ children }) => {
  const initialState = {
    user: {},
    users: [],
    loading: false,
    repos: [],
  };

  const [state, dispatch] = useReducer(gitReducer, initialState);

  const search = async (value) => {
    const response = await axios.get(
      withCreds(`https://api.github.com/search/users?q=${value}&`));

    setLoading();
    dispatch({
      type: SEARCH_USERS,
      payload: response.data.items,
    });
  };

  const getUser = async (name) => {
    setLoading();

    const response = await axios.get(
      withCreds(`https://api.github.com/users/${name}?`));

    dispatch({
      type: GET_USER,
      payload: response.data,
    });
  };

  const getRepos = async (name) => {
    setLoading();

    const response = await axios.get(
      withCreds(`https://api.github.com/users/${name}/repos?per_page=5&`));

    dispatch({
      type: GET_REPOS,
      payload: response.data,
    });
  };

  const clearUsers = () => {
    dispatch({
      type: CLEAR_USERS,
    });
  };

  const setLoading = () => {
    dispatch({
      type: SET_LOADING,
    });
  };

  const { user, users, repos, loading } = state;

  return (
    <GitContext.Provider
      value={{
        search,
        getUser,
        getRepos,
        clearUsers,
        setLoading,
        user,
        users,
        repos,
        loading,
      }}
    >
      {children}
    </GitContext.Provider>
  );
};
