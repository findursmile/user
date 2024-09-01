import { useEffect, useRef, useState } from "react";
import LazyImage from "./LazyImage";

export interface IMAGE {
    id: string,
    image_uri: string,
}

function Gallery({encodings: encodings}: {encodings?: number[][]}) {
    const [pageNo, setPageNo] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    let images = useRef([]);
    const [chunkedImages, setChunkedImages] = useState<IMAGE[][]>([]);
    const cols = 6;
    const limit = 25;

    const getImages = () => {
        const url = 'http://localhost:8080/events/event:6kfm772kak2al1a7vmec/images';
        const params: {limit: number, page: number, encoding?: number[]} = {
            page: pageNo,
            limit
        };
        if (encodings && encodings.length) {
            params.encoding = encodings[0];
        }
        fetch(url, {
            method: "POST",
            body: JSON.stringify(params),
            headers: {
                "Content-Type": "application/json"
            }
        })
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
        images.current = [];
    }, [encodings]);

    useEffect(() => {
        getImages();
    }, [pageNo, encodings]);


    return (
        <section className="mt-5">
            <div className="grid grid-cols-6 gap-4">
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
            <div className="text-center my-3">
                { hasMore && <button className="px-6 py-2 bg-gray-800 rounded text-white hover:bg-gray-700 hover:text-gray-100"  onClick={() => setPageNo(pageNo+1)}> Load More</button>}
            </div>
        </section>
    );
}

export default Gallery
