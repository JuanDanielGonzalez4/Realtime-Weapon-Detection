import { supabase } from "../../utils/supabase";

export const getSignedVideoUrl = async () => {
  const signedUrls = [];

  const { data: fileNames, error } = await supabase.storage
    .from("WeaponsDetected")
    .list();

  if (fileNames) {
    for (const fileName of fileNames) {
      const { data, error } = await supabase.storage
        .from("WeaponsDetected")
        .createSignedUrl(fileName.name, 60);

      if (data) {
        console.log(fileName);
        signedUrls.push({ url: data.signedUrl, name: fileName.name });
      } else {
        console.error("Error generating signed URL:", error.message);
      }
    }

    return signedUrls;
  }

  if (error) {
    console.error("Error al generar la URL firmada:", error.message);
    return null;
  }
};
