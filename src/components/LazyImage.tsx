import { useEffect, useRef, useState } from "react";

export default function LazyImage(props: {src: string}) {
    const [loaded, setLoaded] = useState(false);
    const imgEl: React.MutableRefObject<HTMLImageElement|null> = useRef(null);
    const isListenerAdded = useRef(false);

    useEffect( () => {
        if (isListenerAdded.current || loaded) {
            return;
        }

        const onScrollCallback = () => {
            const rec = imgEl.current?.getBoundingClientRect();
            if (rec && rec.top > 0 && rec.top < window.innerHeight + 100) {
                setLoaded(true);
                if (imgEl.current) {
                    imgEl.current.style.animationPlayState = "running";
                }
            }
        };
        onScrollCallback();

        window.addEventListener('scrollend', onScrollCallback);

        return () => {
            window.removeEventListener('scrollend', onScrollCallback);
        }
    }, []);

    return (
        <img
            className={"rounded object-cover max-w-full " + (loaded ? '' : 'min-h-40')}
            ref={imgEl}
            src={loaded ? props.src : 'https://placehold.co/400'} />
    );
}
