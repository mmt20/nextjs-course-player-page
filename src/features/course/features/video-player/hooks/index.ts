import React, { useState, useRef, useEffect } from "react";

const useVideoPlayer = (videoUrl: string, externalVideoRef?: React.RefObject<HTMLVideoElement | null>) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const internalVideoRef = useRef<HTMLVideoElement | null>(null);
  const videoRef: React.RefObject<HTMLVideoElement | null> = externalVideoRef || internalVideoRef;
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("ended", handleEnded);

    // Listen for fullscreen changes
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("ended", handleEnded);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, [videoRef]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (videoRef.current) {
      const newVolume = value[0];
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
      if (newMuted) {
        videoRef.current.volume = 0;
      } else {
        videoRef.current.volume = volume || 0.5;
      }
    }
  };

  const enterPictureInPicture = () => {
    if (videoRef.current && document.pictureInPictureEnabled) {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      } else {
        videoRef.current.requestPictureInPicture();
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      const container = containerRef.current;
      if (container) {
        // Add vendor-prefixed fullscreen methods with proper typing to avoid `any` usage
        type VendorFullscreenElement = HTMLElement & {
          mozRequestFullScreen?: () => void | Promise<void>;
          webkitRequestFullscreen?: () => void;
          msRequestFullscreen?: () => void;
        };

        const el = container as VendorFullscreenElement;

        if (el.requestFullscreen) {
          el.requestFullscreen();
        } else if (el.mozRequestFullScreen) {
          el.mozRequestFullScreen();
        } else if (el.webkitRequestFullscreen) {
          el.webkitRequestFullscreen();
        } else if (el.msRequestFullscreen) {
          el.msRequestFullscreen();
        }

        // For mobile devices, try to force landscape orientation
        // Try to lock orientation to landscape on mobile devices (if supported)
        const scr = screen as Screen & {
          orientation?: {
            lock?: (mode: "landscape" | "portrait") => Promise<void>;
          };
        };

        if (scr.orientation?.lock) {
          try {
            scr.orientation.lock("landscape").catch(() => {
              // Ignore errors if orientation lock is not supported
            });
          } catch {
            // Ignore errors
          }
        }
      }
    } else {
      document.exitFullscreen();
    }
  };

  return {
    videoRef,
    containerRef,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isFullscreen,
    togglePlay,
    handleSeek,
    handleVolumeChange,
    toggleMute,
    enterPictureInPicture,
    toggleFullscreen,
  };
};

export default useVideoPlayer;
