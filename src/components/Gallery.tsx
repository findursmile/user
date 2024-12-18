import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { MediaViewer } from "./MediaViewer";
export interface IMAGE {
  id: string;
  image_uri: string;
}

function Gallery({ encodings: encodings }: { encodings?: number[][] }) {
  const urlParams = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [mediaViewer, setMediaViewer] = useState<
    { mediaId: string } | undefined
  >(undefined);
  let images = useRef([]);
  const [chunkedImages, setChunkedImages] = useState<IMAGE[][]>([]);
  const cols = 6;
  const limit = 25;

  const getImages = () => {
    const url = `${import.meta.env.VITE_API_BASE_URI}events/${
      urlParams.eventId
    }/images`;
    const params: { limit: number; page: number; encoding?: number[] } = {
      page: pageNo,
      limit,
    };
    if (encodings && encodings.length) {
      params.encoding = encodings[0];
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      const content = await res.json();
      if (content.images.length < limit) {
        setHasMore(false);
      }
      images.current = images.current.concat(content.images);
      const chunkedArray = new Array(cols);

      images.current.forEach((img, i) => {
        const index = i % cols;
        if (!chunkedArray[index]) {
          chunkedArray[index] = [];
        }
        chunkedArray[index].push(img);
      });

      setChunkedImages(chunkedArray);
    });
  };

  useEffect(() => {
    images.current = [];
    setPageNo(1);
  }, [encodings]);

  useEffect(() => {
    getImages();
  }, [pageNo, encodings]);

  return (
    <section className="mt-5">
      <div className="grid grid-cols-6 gap-4">
        {chunkedImages
          .concat(chunkedImages)
          .concat(chunkedImages)
          .map((images) => {
            return (
              <div className="flex flex-wrap gap-4">
                {images.map((img) => {
                  return (
                    <div
                      className=" max-w-full relative group cursor-pointer"
                      key={img.id}
                      onClick={() => setMediaViewer({ mediaId: img.id })}
                    >
                      <img
                        className="rounded object-cover max-w-full"
                        src={
                          import.meta.env.VITE_IMAGE_BASE_URI + img.image_uri
                        }
                        alt="Media"
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
      <div className="text-center my-3">
        {hasMore && (
          <button
            className="px-6 py-2 bg-gray-800 rounded text-white hover:bg-gray-700 hover:text-gray-100"
            onClick={() => setPageNo(pageNo + 1)}
          >
            {" "}
            Load More
          </button>
        )}
      </div>
      {mediaViewer && (
        <MediaViewer
          onClose={() => setMediaViewer(undefined)}
          startMediaId={mediaViewer.mediaId}
          images={images.current as IMAGE[]}
        />
      )}
    </section>
  );
}

export default Gallery;
