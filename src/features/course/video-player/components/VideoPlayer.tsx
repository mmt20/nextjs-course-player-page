"use client";

import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Maximize2, PictureInPicture2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { VideoPlayerProps } from "../types";
import useVideoPlayer from "../hooks";
import { formatTime } from "../utils";

const VideoPlayer = ({ videoUrl, onWideMode }: VideoPlayerProps) => {
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
    toggleFullscreen,
    enterPictureInPicture,
  } = useVideoPlayer(videoUrl);

  return (
    <div ref={containerRef} className="relative bg-black  overflow-hidden ">
      <video ref={videoRef} src={videoUrl} className="w-full aspect-video" onClick={togglePlay} />

      {/* Custom Controls */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity
        opacity-0 group-hover:opacity-100
        sm:opacity-100 sm:group-hover:opacity-100
        "
      >
        {/* Progress Bar */}
        <Slider value={[currentTime]} max={duration || 100} step={0.1} onValueChange={handleSeek} className="mb-4 " />

        <div className="flex items-center justify-between gap-4">
          {/* Left Controls */}
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="ghost"
              onClick={togglePlay}
              className="text-white hover:bg-white/20 cursor-pointer"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>

            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={toggleMute}
                className="text-white hover:bg-white/20 cursor-pointer"
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
              <Slider
                value={[isMuted ? 0 : volume]}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="w-20"
              />
            </div>

            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={onWideMode}
              className="text-white hover:bg-white/20 cursor-pointer"
              title="Wide Mode"
            >
              <Maximize2 className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={enterPictureInPicture}
              className="text-white hover:bg-white/20 cursor-pointer"
              title="Picture-in-Picture"
            >
              <PictureInPicture2 className="h-5 w-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleFullscreen}
              className="text-white hover:bg-white/20 cursor-pointer"
              title="Fullscreen"
            >
              {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
