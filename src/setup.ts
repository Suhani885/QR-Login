import { baseURL } from '@/services/baseURL';
import { client } from '@/services/api/client.gen';

client.setConfig({
    baseURL: baseURL,
    withCredentials: true,
});

