import { baseURL } from '@/services/baseURL';
import { client } from '@/services/api/client.gen';
import { toast } from 'sonner';
client.setConfig({
    baseURL: baseURL,
    withCredentials: true,
});



// client.instance.interceptors.response.use(
//     (config) => {
//         return config;
//     },
//     (error) => {
//         const status = error.response?.status;
//         let message = ""
//         console.log(error)
//         toast.error(status)
//         if (error.response) {
//             switch (status) {
//                 case 403:
//                     toast.error("Error")
//                     message = error.response.data?.msg || 'Unauthorized';
//                     break;
//                 case 409:
//                     message = error.response.data?.msg || 'Access denied';
//                     break;
//                 case 451:
//                     message = error.response.data?.msg || 'Resource not found';
//                     break;
//                 default:
//                     message = 'Something went wrong';
//             }
//         } else if (error?.code !== 'ERR_CANCELED') {
//             message = 'No response from server';
//         } else {
//             return;
//         }
//         return Promise.reject(error);

//     }

// );
