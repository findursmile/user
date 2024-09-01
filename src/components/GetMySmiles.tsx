import { ArrowUpTrayIcon } from "@heroicons/react/16/solid";
import { ChangeEvent, useState } from "react";

export default function GetMySmiles({onGetEncodings}: {onGetEncodings: Function}) {
    const [loading, setLoading] = useState(false);

    const getFaceEncodings = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) {
            return
        }
        setLoading(true);
        const frmData = new FormData();
        frmData.append("file", e.target.files[0]);

        fetch("http://localhost:8989/image/face_encodings", {
            method: "POST",
            body: frmData,
        }).then(async res => {
            if (res.status !== 200) {
                return;
            }
            setLoading(false);
            const encodings = await res.json();
            onGetEncodings(encodings);
        });
    };

    return (
        <div className="w-4/6 text-center my-5 mx-auto ">
            <h2 className="text-lg font-medium">Hey there, down here 👋 We help you to collect all your pictures </h2>
            <div className="w-48 h-48 mx-auto relative bg-blue-500 rounded-full flex justify-center items-center p-2 my-10">
                    <span className="text-white font-bold">Allow Camera Access</span>
                    <span className="absolute rounded-full w-48 h-48 bg-blue-100 top-0 left-0 scale-125 z-[-1] animate-ping"></span>
            </div>
            <div className="w-64 relative mx-auto pt-5 pb-3 text-gray-400">
                <span className="text-sm px-2 bg-white rounded-full">or</span>
                <span className="absolute top-2/4 left-0 w-full h-px bg-gray-400 z-[-1]"></span>
            </div>
            <p className="text-gray-400 mb-3">
                Upload your own picture manually, Make sure you are looking straight :)
            </p>
            <div>
                <button
                    className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={e => {
                        e.preventDefault();
                        document.getElementById("imageToSeach")?.click();
                    }}
                >
                    <ArrowUpTrayIcon className="-ml-0.5 h-5 w-5" /> Upload
                </button>
                <input
                    type="file"
                    className="sr-only"
                    name="imageToSeach"
                    id="imageToSeach"
                    disabled={loading}
                    onChange={getFaceEncodings}
                />
            </div>

        </div>
    );
}
