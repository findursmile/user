import { useState } from "react";
import Banner from "../components/Banner";
import Gallery from "../components/Gallery";
import GetMySmiles from "../components/GetMySmiles";

export default function EventDetail() {
    const [viewMode, setViewMode] = useState('all');
    const [encodings, setEncodings] = useState([]);
    return (
        <>
            <section className="container mx-auto">
                <Banner onViewChange={(t:string) => setViewMode(t)}/>
            </section>
            <section className="container mx-auto">
                { viewMode === "mine" ? <GetMySmiles onGetEncodings={setEncodings} /> : ''}
                <Gallery encodings={encodings} />
            </section>
        </>
    );
}
