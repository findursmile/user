import { useEffect, useRef, useState } from "react";
import LazyImage from "./LazyImage";

export interface IMAGE {
    id: string,
    image_uri: string,
}

function Gallery() {
    const [pageNo, setPageNo] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    let images = useRef([]);
    const [chunkedImages, setChunkedImages] = useState<IMAGE[][]>([]);
    const cols = 4;
    const limit = 25;

    const getImages = () => {
        fetch('http://localhost:8080/events/event:z6p1fcpooy3fh7oghien/images?page=' + pageNo)
            .then(async (res) => {
                const content = await res.json();
                if (content.images.length < limit) {
                    setHasMore(false);
                }
                images.current = images.current.concat(content.images);
                let chunkSize = Math.ceil(images.current.length / cols);
                const chunkedArray = Array.from(
                    {length: cols},
                    (_, i) => images.current.slice(i * chunkSize, i * chunkSize + chunkSize)
                );

                setChunkedImages(chunkedArray);
            });
    }

    useEffect(() => {
        getImages();
    }, [pageNo]);


    return (
        <section className="container mx-auto mt-5">
            <div className="grid grid-cols-4 gap-4">
                {chunkedImages.map(images => {
                    return (
                        <div className="">
                            {images.map(img => {
                            return (<div className="pb-3 max-w-full" key={img.id}>
                                <LazyImage src={"http://localhost:8080/" + img.image_uri} />
                            </div>)})}
                        </div>
                    )
                })}
            </div>
            { hasMore && <button className="p-2 bg-gray-800 text-white"  onClick={() => setPageNo(pageNo+1)}> Load More</button>}
        </section>
    );
}

export default Gallery
