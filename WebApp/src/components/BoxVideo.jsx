import PropTypes from "prop-types";
import { formatTime } from "../../utils/formatTime";
import { formatCoordinates } from "../../utils/formatCoordinates";

BoxVideo.propTypes = {
  video: PropTypes.string.isRequired,
};

export default function BoxVideo({ video }) {
  if (video.name !== ".emptyFolderPlaceholder") {
    const formattedTime = formatTime(video.name);
    const { latitude, longitude } = formatCoordinates(video.name);

    console.log(latitude);

    return (
      <div className="md:h-[400px] w-full bg-neutral-700 rounded-lg flex items-center flex-col">
        <div className="h-2/3">
          {video ? (
            <video controls width="600">
              <source src={video.url} type="video/mp4" />
              Tu navegador no soporta la reproducción de video.
            </video>
          ) : (
            <p>Cargando el video...</p>
          )}{" "}
        </div>
        <div className="h-1/3">
          <h1 className="text-2xl font-bold ">Arma detectada</h1>
          <p className="mt-4">
            Ubicación:{" "}
            <a
              className="text-lime-300"
              href={`https://www.google.com/maps?q=${latitude},${longitude}`}
              target="_blank"
            >
              Click aqui
            </a>
          </p>
          <p>Hora: {formattedTime}</p>
        </div>
      </div>
    );
  }
}
