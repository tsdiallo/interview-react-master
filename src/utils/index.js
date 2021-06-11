function setRoutes(config) {
    let routes = [...config.routes];

    return [...routes];

}

export function generateRoutesFromConfigs(routeConfigs) {
    let allRoutes = [];
    routeConfigs.forEach((config) => {
        allRoutes = [
            ...allRoutes,
            ...setRoutes(config)
        ];
    });
    return allRoutes;
}
