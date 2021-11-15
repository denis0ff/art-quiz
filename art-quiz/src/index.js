"use strict";

import { Home } from "./js/views/pages/Home";
import { Settings } from "./js/views/pages/Settings";
import { Error404 } from "./js/views/pages/Error404";
import { Categories } from "./js/views/pages/Categories";
import { Question } from "./js/views/pages/Question";

import { Header } from "./js/views/components/Header";
import { Footer } from "./js/views/components/Footer";

import { Utils } from "./js/services/Utils.js";

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
  "/": Home,
  "/settings": Settings,
  "/question": Question,
  "/categories": Categories,
};

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {
  // Lazy load view element:
  const header = null || document.getElementById("header");
  const content = null || document.getElementById("main");
  const footer = null || document.getElementById("footer");

  // Render the Header and footer of the page
  header.innerHTML = await Header.render();
  await Header.after_render();
  footer.innerHTML = await Footer.render();
  await Footer.after_render();

  // Get the parsed URl from the addressbar
  let request = Utils.parseRequestURL();

  // Parse the URL and if it has an id part, change it with the string ":id"
  let parsedURL =
    (request.resource ? "/" + request.resource : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? "/" + request.verb : "");

  // Get the page from our hash of supported routes.
  // If the parsed URL is not in our list of supported routes, select the 404 page instead
  let page = routes[parsedURL] ? routes[parsedURL] : Error404;
  content.innerHTML = await page.render();
  await page.after_render();
};

// Listen on hash change:
window.addEventListener("hashchange", router);

// Listen on page load:
window.addEventListener("load", router);
