import { getConfig } from './config';

export const getCorsConfig = () => {
  const { frontendUrl } = getConfig();

  return {
    origin: [frontendUrl || 'http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
};

export const getSwaggerConfig = () => {
  const { apiBaseUrl } = getConfig();

  return {
    openapi: '3.1' as const,
    servers: [
      {
        url: apiBaseUrl || 'http://localhost:5000',
        description: 'API Server',
      },
    ],
  };
};
