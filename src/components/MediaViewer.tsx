import { useState } from "react";
import { IMAGE } from "./Gallery";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export const MediaViewer = ({
  onClose,
  images,
  startMediaId,
}: {
  onClose: () => void;
  images: IMAGE[];
  startMediaId: string;
}) => {
  const [currImageIndex, setCurrImageIndex] = useState<number>(
images.findIndex((img) => img.id === startMediaId)
);
const handleNextImage = () => {
setCurrImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
};
const handlePreviousImage = () => {
setCurrImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
};
return (
<div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-50 flex justify-center items-center">
  <div className="relative  max-w-[90%] max-h-[90%] w-[1000px] h-[800px] flex items-center justify-center">
    <div
      className="absolute top-7 right-2 transform -translate-y-1/2 cursor-pointer w-10 h-10 mr-2 bg-black/50 rounded-full"
      onClick={onClose}
    >
      <XMarkIcon color="#fff" className="p-1" />
    </div>
    {currImageIndex > 0 && (
      <div
        className="absolute top-1/2 left-0 transform -translate-y-1/2 cursor-pointer w-10 h-10 ml-2 bg-black/50 rounded-full"
        onClick={handlePreviousImage}
      >
        <ChevronLeftIcon color="#fff" className="p-1" />
      </div>
    )}
    <img
          className="w-full h-full object-contain"
          src={
            import.meta.env.VITE_IMAGE_BASE_URI +
            images[currImageIndex].image_uri
          }
          alt="Media"
        />
        {currImageIndex < images.length - 1 && (
          <div
            className="absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer w-10 h-10 mr-2 bg-black/50 rounded-full"
            onClick={handleNextImage}
          >
            <ChevronRightIcon color="#fff" className="p-1" />
          </div>
        )}
      </div>
    </div>
  );
};
