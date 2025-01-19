import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { LandmarkList, POSE_CONNECTIONS, Results } from '@mediapipe/pose';
import { ModelService } from '../../services/model.service';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils'
import { NgClass } from '@angular/common';

import { Iposture } from '../../interfaces/iposture';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [NgClass],
  templateUrl: './video.component.html',
  styleUrl: './video.component.scss'
})
export class VideoComponent {

  modelService = inject(ModelService)

  @ViewChild('video', { static: true }) videoRef!: ElementRef<HTMLVideoElement>;

  canvasElement!: HTMLCanvasElement
  canvasCtx!: CanvasRenderingContext2D | null
  frameCount: number = 0
  posture: string = ""
  warning: boolean = false

  shoulderPosture: Iposture = {
    message: "",
    correct: null
  }

  neckPosture: Iposture = {
    message: "",
    correct: null
  }

  ngOnInit(): void {
    this.canvasElement = document.getElementById('canvas') as HTMLCanvasElement;
    this.canvasCtx = this.canvasElement.getContext('2d');
    this.modelService.initModel()
    this.modelService.onResults(this.onPoseResults.bind(this));
    this.modelService.startCamera(this.videoRef.nativeElement)
  }

  onPoseResults(results: Results): void {

    this.frameCount++

    // Clean and drow the canva

    this.canvasCtx!.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    this.canvasCtx!.drawImage(results.image, 0, 0, this.canvasElement.width, this.canvasElement.height);

    // Draw connectors and landmarks

    drawConnectors(this.canvasCtx!, results.poseLandmarks, POSE_CONNECTIONS, { color: 'white', lineWidth: 1 });
    drawLandmarks(this.canvasCtx!, results.poseLandmarks, { color: '#black', radius: 1 });

    // Check the posture

    if (results.poseLandmarks) {
      if (this.frameCount % 10 === 0) {
        this.checkShoulders(results.poseLandmarks)
        this.checkNeck(results.poseLandmarks);
        if (this.shoulderPosture.correct || this.neckPosture.correct) {
          this.warning = true
        } else {
          this.warning = false
        }
      }
    }
  }


  // Check Shoulders posture
  checkShoulders(landmarks: LandmarkList): Iposture {
    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];

    // Calculate shoulder alignment
    const shoulderAlignment = Math.abs(leftShoulder.y - rightShoulder.y);

    if (shoulderAlignment > 0.03) {
      return (this.shoulderPosture = {
        message: 'Posición hombros incorrecta',
        correct: true
      })
    }
    return (this.shoulderPosture = {
      message: 'Posición hombros correcta',
      correct: false
    })
  }

  // Check neck posture
  checkNeck(landmarks: LandmarkList): Iposture {
    const leftShoulder = landmarks[5];
    const rightShoulder = landmarks[2];

    // Calculate neck alignment
    const shoulderAlignment = Math.abs(leftShoulder.y - rightShoulder.y);

    if (shoulderAlignment > 0.01) {
      return (this.neckPosture = {
        message: 'Posición de cuello incorrecta',
        correct: true
      })
    }
    return (this.neckPosture = {
      message: 'Posición de cuello correcta',
      correct: false
    })
  }
}
