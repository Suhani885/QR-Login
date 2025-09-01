import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
    input: "http://10.21.99.223:8001/api/schema/",
    output: 'src/services/api',
    plugins: [
        '@tanstack/react-query',
        '@hey-api/client-axios'
    ],
});