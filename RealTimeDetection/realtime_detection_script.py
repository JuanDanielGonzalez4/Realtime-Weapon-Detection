import os
import time

import cv2
from ultralytics import YOLO


class Real_Time_Detection_Weapons:
    def __init__(self, model_path, video_duration=10):
        self.model = YOLO(model_path)  # Cargar el modelo YOLO
        self.cap = cv2.VideoCapture(0)  # Inicializar la captura de video
        self.fourcc = cv2.VideoWriter_fourcc(*"mp4v")  # Definir códec
        self.video_duration = video_duration  # Duración de la grabación en segundos
        self.video_data = {
            "out": None,
            "recording": False,
            "start_time": 0,
            "video_filename": None,
        }
        self.prev_frame_time = 0
        self.new_frame_time = 0
        self.save_path = (
            r"C:\Users\juang\Documents\final_project_pdi\Proyecto PDI\Video"
        )
        if not os.path.exists(self.save_path):
            os.makedirs(self.save_path)

    def calculate_fps(self):
        """Calcula los FPS basados en el tiempo entre frames."""
        if self.prev_frame_time != 0:
            return 1 / (self.new_frame_time - self.prev_frame_time)

    def initialize_writer(self, frame, fps):
        """Inicializa el objeto VideoWriter para grabar el video."""
        timestamp = time.strftime("%Y-%m-%d-%H-%M-%S")  # Formato solicitado
        filename = os.path.join(self.save_path, f"Video_Arma_{timestamp}.mp4")
        writer = cv2.VideoWriter(
            filename, self.fourcc, fps, (frame.shape[1], frame.shape[0])
        )
        if not writer.isOpened():
            print(f"Error al crear el archivo de video: {filename}")
        else:
            print(f"Archivo de video creado: {filename}")
        self.video_data["out"] = writer
        self.video_data["video_filename"] = filename
        self.video_data["recording"] = True
        self.video_data["start_time"] = time.time()

    def draw_detections(self, frame, results):
        """Dibuja las detecciones en el frame."""
        for result in results:
            for box in result.boxes:
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                conf = box.conf[0]
                cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                cv2.putText(
                    frame,
                    f"{box.cls[0]} {conf:.2f}",
                    (x1, y1 - 10),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.9,
                    (36, 255, 12),
                    2,
                )

    def process_frame(self):
        """Procesa cada frame de la captura de video."""
        ret, frame = self.cap.read()
        if not ret:
            return False, frame

        # Calcular FPS
        self.new_frame_time = time.time()
        fps = self.calculate_fps()
        self.prev_frame_time = self.new_frame_time

        # Realizar predicciones con YOLO
        results = self.model.predict(source=frame, show=False, device="cuda", conf=0.5)

        # Iniciar grabación si hay detección
        if any(len(result.boxes) for result in results):  # Si hay detecciones
            if not self.video_data["recording"]:
                self.initialize_writer(frame, fps)

        # Dibujar detecciones en el frame
        self.draw_detections(frame, results)

        # Escribir el frame en el archivo de video si está grabando
        if self.video_data["recording"]:
            self.video_data["out"].write(frame)

        return True, frame

    def stop_recording(self):
        """Detiene la grabación si ha transcurrido el tiempo definido."""
        if self.video_data["recording"] and (
            time.time() - self.video_data["start_time"] >= self.video_duration
        ):
            self.video_data["recording"] = False
            self.video_data["out"].release()
            print(f"Video guardado: {self.video_data['video_filename']}")

    def run(self):
        """Ejecuta el bucle principal de la detección en tiempo real."""
        while self.cap.isOpened():
            success, frame = self.process_frame()
            if not success:
                break

            # Mostrar el frame en la ventana
            cv2.imshow("Detección en tiempo real", frame)

            # Detener la grabación si es necesario
            self.stop_recording()

            # Salir si se presiona la tecla 'q'
            if cv2.waitKey(1) & 0xFF == ord("q"):
                break

        # Liberar recursos
        self.cap.release()
        cv2.destroyAllWindows()


# Se realiza el proceso de deteccion
Weapons_detection = Real_Time_Detection_Weapons(model_path="best.pt")
Weapons_detection.run()
