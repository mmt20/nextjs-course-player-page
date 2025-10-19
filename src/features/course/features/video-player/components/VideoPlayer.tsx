"use client";

import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Maximize2, PictureInPicture2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import useVideoPlayer from "../hooks";
import { formatTime } from "../utils";

interface VideoPlayerProps {
  videoUrl: string;
  thumbnail?: string;
  externalVideoRef?: React.RefObject<HTMLVideoElement | null>;
  onWideMode?: () => void;
}

const VideoPlayer = ({ videoUrl, thumbnail, externalVideoRef, onWideMode }: VideoPlayerProps) => {
  const {
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
  } = useVideoPlayer(videoUrl, externalVideoRef);

  return (
    <div ref={containerRef} className="relative bg-black overflow-hidden group w-full h-full">
      <video
        ref={videoRef as React.RefObject<HTMLVideoElement | null>}
        src={videoUrl}
        className="w-full h-full object-contain"
        onClick={togglePlay}
        preload="auto"
      />

      {/* Thumbnail overlay with centered play button (shows only before first play) */}
      {!isPlaying && currentTime === 0 && thumbnail && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
          <Image
            src={thumbnail}
            alt="Video thumbnail"
            fill
            className="object-cover z-0"
            draggable={false}
            priority
            fetchPriority="high"
          />
          <button
            onClick={togglePlay}
            aria-label="Play video"
            className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-black/40 text-white cursor-pointer"
          >
            <Play className="h-7 w-7" />
          </button>
        </div>
      )}

      {/* Progress Bar*/}
      <div className="absolute bottom-12 sm:bottom-16 left-0 right-0 px-3 sm:px-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
        <Slider
          variant="video"
          value={[currentTime]}
          max={duration || 100}
          step={0.1}
          onValueChange={handleSeek}
          className="w-full"
        />
      </div>

      {/* Custom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent px-3 sm:px-4 py-2 sm:py-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Left Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={togglePlay}
              className="text-white hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10 cursor-pointer"
            >
              {isPlaying ? <Pause className="h-4 w-4 sm:h-5 sm:w-5" /> : <Play className="h-4 w-4 sm:h-5 sm:w-5" />}
            </Button>

            {/* Volume Control  */}
            <div className="flex items-center group/volume">
              <Button
                size="icon"
                variant="ghost"
                onClick={toggleMute}
                className="text-white hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10 cursor-pointer"
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </Button>
              <div className="w-0 sm:w-16 md:w-0 md:group-hover/volume:w-20 overflow-hidden transition-all duration-200">
                <Slider
                  variant="volume"
                  value={[isMuted ? 0 : volume]}
                  max={1}
                  step={0.01}
                  onValueChange={handleVolumeChange}
                  className="ml-2"
                />
              </div>
            </div>

            <span className="text-white text-xs sm:text-sm font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={onWideMode}
              className="hidden md:flex text-white hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10 cursor-pointer"
              title="Wide Mode"
            >
              <Maximize2 className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={enterPictureInPicture}
              className="text-white hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10 pip-button-mobile cursor-pointer"
              title="Picture-in-Picture (Auto-activates when scrolling on mobile)"
            >
              <PictureInPicture2 className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/20 h-8 w-8 sm:h-10 sm:w-10 cursor-pointer"
              title="Fullscreen"
            >
              {isFullscreen ? (
                <Minimize className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Maximize className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
