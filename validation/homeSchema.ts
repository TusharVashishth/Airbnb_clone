import { bytesToMB } from "@/lib/utils";
import * as yup from "yup";

export const homeSchema = yup
  .object()
  .shape({
    title: yup.string().min(5).max(40).required(),
    country: yup.string().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    price: yup.number().required().typeError("Amount should be number"),
    description: yup.string().min(10).max(20000).required(),
    categories: yup
      .mixed<Array<string> | []>()
      .test(
        "categories",
        "Please select at least one categories",
        (data: any) => {
          const isValid = data?.length >= 1;
          return isValid;
        }
      ),
    image: yup
      .mixed()
      .test("imageType", "Only JPEG or PNG images are allowed", (file: any) => {
        const isValid =
          file?.type === "image/jpeg" ||
          file?.type === "image/png" ||
          file?.type === "image/jpg" ||
          file?.type === "image/webp";
        return isValid;
      })
      .test("imageSize", "Image must be less than 2 MB", (file: any) => {
        const isValid = bytesToMB(file?.size) <= 2;
        return isValid;
      }),
  })
  .required();

export type HomeSchemaType = yup.InferType<typeof homeSchema>;
