import React from "react";
import LoginPage from "../pages/auth/login";
import SignUpPage from "../pages/auth/signup";
import ForgotPasswordPage from "../pages/auth/forgot-password/forgot-password";
import ResetPasswordPage from "../pages/auth/reset-password/token";
import HomePage from "../pages/home/Home";
import Habits from "../pages/Habits";
import Tasks from "../pages/Tasks";
import ErrorPage from "../pages/error/ErrorPage";

interface IRoutePath {
  path: string;
  element: React.ComponentType;
  isPrivate: boolean;
}

class RoutePath implements IRoutePath {
  constructor(
    public path: string,
    public element: React.ComponentType,
    public isPrivate: boolean,
  ) {
    this.path = path;
    this.element = element;
    this.isPrivate = isPrivate;
  }
}

export const paths = {
  home: new RoutePath("/", HomePage, false),
  login: new RoutePath("/auth/login", LoginPage, false),
  signup: new RoutePath("/auth/signup", SignUpPage, false),
  forgotPassword: new RoutePath("/auth/forgot-password", ForgotPasswordPage, false),
  resetPassword: new RoutePath("/auth/reset-password/:token", ResetPasswordPage, false),
  habits: new RoutePath("/habits", Habits, true),
  habit: new RoutePath("/habit/:habitId", Habits, true),
  tasks: new RoutePath("/tasks", Tasks, true),
  task: new RoutePath("/task/:taskId", Tasks, true),
  error: new RoutePath("*", ErrorPage, true),
};
