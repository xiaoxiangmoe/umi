import { join } from 'path';
import { existsSync } from 'fs';
import getRouteConfigFromConfigFile from './getRouteConfigFromConfigFile';
import getRouteConfigFromDir from './getRouteConfigFromDir';
import patchRoutes from './patchRoutes';
import getRouteConfigFromConfig from './getRouteConfigFromConfig';

export default (paths, config = {}) => {
  let routes = null;

  const routeConfigFile = join(paths.absSrcPath, '_routes.json');
  if (config.routes) {
    routes = getRouteConfigFromConfig(config.routes);
  } else if (existsSync(routeConfigFile)) {
    routes = getRouteConfigFromConfigFile(routeConfigFile);
  } else {
    routes = getRouteConfigFromDir(paths);
  }

  patchRoutes(routes, config);
  return routes;
};
