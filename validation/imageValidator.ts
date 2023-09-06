import { bytesToMB } from "@/lib/utils";

export function imagevalidator(
  name: string | undefined,
  size: number | undefined
): string | null {
  let flag: string | null = null;

  if (name) {
    const getImgExt = name.split(".");
    const imgExtType: Array<string> = ["svg", "png", "jpeg", "jpg", "ico"];
    if (!imgExtType.includes(getImgExt[1])) {
      flag = "Image must be .png,.jpeg,.jpg,.svg";
    }
  }
  if (size) {
    const fileInMB = bytesToMB(size!);
    if (fileInMB > 2) {
      flag = "Image should be less than 2 MB.";
    }
  }

  return flag;
}
