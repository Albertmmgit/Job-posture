import { Injectable } from '@angular/core';
import { Pose, Results } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor() { }

  private pose!: Pose

  // Init the Pose Model
  initModel(): Pose {

    this.pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
    })

    this.pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    })

    return this.pose
  }

  onResults(callback: (results: Results) => void): void {
    if (this.pose) {
      this.pose.onResults(callback);
    }
  }

  // Start video
  startCamera(videoElement: HTMLVideoElement): void {

    if (this.pose) {
      const camera = new Camera(videoElement, {
        onFrame: async () => {
          await this.pose!.send({ image: videoElement });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }
}








