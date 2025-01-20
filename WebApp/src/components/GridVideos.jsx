import BoxVideo from "./BoxVideo";
import { useFetchVideos } from "../../hooks/useFetchVideos";

export default function GridVideos() {
  const videoUrls = useFetchVideos();

  return (
    <div className="grid gap-6 md:grid-cols-4 mt-8 mx-auto w-4/5 ">
      {videoUrls.length > 0 &&
        videoUrls.map((videoUrl) => (
          <BoxVideo key={videoUrl.name} video={videoUrl} />
        ))}
    </div>
  );
}
