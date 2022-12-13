export const IsDev = process.env.NODE_ENV === 'development';
export const ProductionHost = 'http://121.40.173.230';
export const DevHost = 'http://127.0.0.1';
export const HostUrl = IsDev ? DevHost : ProductionHost;