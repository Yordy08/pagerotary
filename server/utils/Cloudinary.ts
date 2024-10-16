import { v2 as cloudinary } from 'cloudinary';
const config = useRuntimeConfig()

cloudinary.config({
  cloud_name: config.public.CLOUDINARY_CLOUD_NAME!,
  api_key: config.public.CLOUDINARY_API_KEY!,
  api_secret: config.public.CLOUDINARY_API_SECRET!,
});

export default cloudinary;