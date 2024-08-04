import React, { FC } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";

const instance: NavigateFunction = useNavigate();

export const navigate = (param: string): void => {
  instance(param);
};
