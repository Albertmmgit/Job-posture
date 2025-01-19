# Jobposture

This project was generated with Angular version 18.2.8.

The libraries that have been used are:
    - Bootstrap for the styles
    - Mediapipe Pose for body detection
    - Mediapipe drawing utils for draw landmarks and connectors
    - Mediapipe camera to manage the video input

# How use

The camera button contains the video component that captures the camera image in real time to analyze the body posture in front of the computer.

The analysis consists of two parts.

Correction of the back posture taking as a reference the alignment of the two shoulders on the horizontal axis.

Correction of the neck posture taking as a reference the alignment of the eyes on the horizontal axis

Although the application works on mobile devices, the alignment calculations are designed and optimized for use in a chair in front of a PC.

# Install

Don't forget to use the npm install command to install the necessary libraries