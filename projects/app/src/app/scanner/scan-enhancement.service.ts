/**
 * ScanEnhancementService — future-compatible adaptive thresholding for edge detection.
 *
 * This service replaces only the `findPaperContour` step in the scanning pipeline.
 * All other jscanify functions (`getCornerPoints`, `extractPaper`) are still called
 * directly on the jscanify instance, so updating the jscanify CDN script has no
 * effect on our enhancement.
 *
 * Algorithm (vs jscanify's default Canny + Otsu's global threshold):
 *  1. Grayscale conversion
 *  2. Gaussian blur for noise suppression
 *  3. Adaptive (Gaussian-weighted) threshold — computes a local threshold per pixel,
 *     handling uneven lighting and non-dark backgrounds that defeat Otsu's global method
 *  4. Morphological CLOSE to seal small gaps along document edges
 *  5. findContours → largest-area contour returned
 *  6. Automatic fallback to jscanify's built-in findPaperContour if no contour is found
 */

import { Injectable } from '@angular/core';

declare const cv: any;

@Injectable({
  providedIn: 'root'
})
export class ScanEnhancementService {

  /**
   * Finds the largest paper-like contour in the image.
   *
   * First attempts adaptive thresholding (better on varied / non-dark backgrounds).
   * Falls back to jscanify's built-in Canny + Otsu method if no contour is found.
   *
   * The returned contour is a `cv.Mat` compatible with jscanify's `getCornerPoints()`.
   *
   * @param imgSrc     OpenCV RGBA Mat from the video frame
   * @param jscanify   The jscanify instance (used only as fallback)
   * @returns Largest contour Mat, or null
   */
  findPaperContour(imgSrc: any, jscanify: any): any {
    const contour = this.findContourAdaptive(imgSrc);
    if (contour) {
      return contour;
    }
    // Fallback: jscanify's Canny + Otsu approach
    return jscanify.findPaperContour(imgSrc);
  }

  /**
   * Adaptive-threshold contour detection.
   * Returns the largest contour or null on failure.
   */
  private findContourAdaptive(imgSrc: any): any {
    const imgGray  = new cv.Mat();
    const imgBlur  = new cv.Mat();
    const imgThresh = new cv.Mat();
    const imgMorph = new cv.Mat();
    // 5×5 structuring element for morphological closing
    const kernel   = cv.Mat.ones(5, 5, cv.CV_8U);
    const contours = new cv.MatVector();
    const hierarchy = new cv.Mat();

    try {
      // Step 1: grayscale
      cv.cvtColor(imgSrc, imgGray, cv.COLOR_RGBA2GRAY, 0);

      // Step 2: 11×11 blur — wider than jscanify's default 3×3, providing stronger
      //   noise suppression which is important before adaptive thresholding to prevent
      //   local texture patterns from being mistaken for document edges
      cv.GaussianBlur(imgGray, imgBlur, new cv.Size(11, 11), 0, 0, cv.BORDER_DEFAULT);

      // Step 3: adaptive threshold
      //   blockSize = 31  — neighbourhood large enough to handle uneven lighting across
      //                       the frame without becoming too sensitive to local texture
      //   C = 10          — subtract a constant so flat regions stay below the threshold,
      //                       preserving only genuine edges
      cv.adaptiveThreshold(
        imgBlur, imgThresh, 255,
        cv.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv.THRESH_BINARY,
        31, 10
      );

      // Step 4: morphological CLOSE — bridges tiny gaps in document edges so the
      //         boundary forms a single closed contour that findContours can detect
      cv.morphologyEx(imgThresh, imgMorph, cv.MORPH_CLOSE, kernel);

      // Step 5: find all contours and return the largest one
      cv.findContours(imgMorph, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);

      return this.getMaxContour(contours);
    } catch (err) {
      console.warn('[ScanEnhancementService] Adaptive threshold detection failed, will use jscanify fallback:', err);
      return null;
    } finally {
      imgGray.delete();
      imgBlur.delete();
      imgThresh.delete();
      imgMorph.delete();
      kernel.delete();
      contours.delete();
      hierarchy.delete();
    }
  }

  /** Returns the contour with the largest area from a MatVector. */
  private getMaxContour(contours: any): any {
    let maxArea = 0;
    let maxContour: any = null;
    for (let i = 0; i < contours.size(); i++) {
      const contour = contours.get(i);
      const area = cv.contourArea(contour);
      if (area > maxArea) {
        maxArea = area;
        maxContour = contour;
      }
    }
    return maxContour;
  }
}
