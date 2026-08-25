import { renderToString } from "react-dom/server";
import App from "./App";

export { getLocalBusinessJsonLd, getSeoData, getSiteRoutes, siteOrigin } from "./site";

export function renderStaticPage(pathname: string) {
  return renderToString(<App initialPath={pathname} staticRender />);
}
