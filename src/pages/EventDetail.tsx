import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Gallery from "../components/Gallery";
import GetMySmiles from "../components/GetMySmiles";
import { useParams } from "react-router-dom";

export default function EventDetail() {
    const [viewMode, setViewMode] = useState('all');
    const [event, setEvent] = useState(null);
    const [encodings, setEncodings] = useState([]);
    const params = useParams();

    const getEvent = async () => {
        const url = `${import.meta.env.VITE_API_BASE_URI}api/events/${params.eventId}`;
        const res = await fetch(url);
        if (res.status != 200) {
            return;
        }
        const eventInfo = await res.json();
        setEvent(eventInfo.event);
    }
    useEffect(() => {
        getEvent();
    }, []);

    return (
        <>
            <section className="container mx-auto">
                <Banner event={event} onViewChange={(t:string) => {
                    setViewMode(t);
                    if (t === 'all') {
                        setEncodings([]);
                    }
                }} />
            </section>
            <section className="container mx-auto">
                { viewMode === "mine" ? <GetMySmiles onGetEncodings={setEncodings} /> : ''}
                <Gallery encodings={encodings} />
            </section>
        </>
    );
}
