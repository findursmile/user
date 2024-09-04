import { ArrowUpTrayIcon } from "@heroicons/react/16/solid";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function GetMySmiles({onGetEncodings}: {onGetEncodings: Function}) {
    const [loading, setLoading] = useState(false);
    const videoElement = useRef<HTMLVideoElement>(null);
    const [showCamUI, setShowCamUI] = useState(false);
    const [canAccessToTheCam, setCanAccessToTheCam] = useState(true);
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedDevice, setSelectedDevice] = useState('');

    const getDevices = async () => {
        if (!navigator.mediaDevices?.enumerateDevices) {
            return;
        }

        try {
            const enumerateDevices = await navigator.mediaDevices.enumerateDevices();
            setDevices(enumerateDevices);
        } catch (e) {
            console.log(e);
            setShowCamUI(false);
        }
    }

    const previewCam = async () => {
        if (!navigator.mediaDevices) {
            return;
        }
        try {
            const constaints: MediaStreamConstraints = {
                audio: false,
                video: {},
            };
            if (selectedDevice) {
                constaints.video = {
                    deviceId: {
                        exact: selectedDevice
                    }
                }
            }
            const stream = await navigator.mediaDevices.getUserMedia(constaints);

            if (videoElement.current) {
                videoElement.current.srcObject = stream;
            }
            videoElement.current?.play()
            setCanAccessToTheCam(true);
        } catch (e) {
            console.log("previewCam", e);
            setCanAccessToTheCam(false);
        };
    }

    const onUploadFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) {
            return
        }

        getFaceEncodings(e.target.files[0]);
    };

    const getFaceEncodings = (file: File) => {
        setLoading(true);
        const frmData = new FormData();
        frmData.append("file", file);

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
        }).catch(() => {
            setLoading(false);
        });
    };

    const captureImage = async () => {
        const videoEl = document.getElementById("webcamVideo") as HTMLVideoElement;
        const canvas = document.getElementById("camCanvasElement") as HTMLCanvasElement;
        canvas.height = videoEl.videoHeight;
        canvas.width = videoEl.videoWidth;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(videoEl, 0, 0, canvas.width, canvas.height);

        const blob = await new Promise<Blob|null>(resolve => canvas.toBlob(b => resolve(b), "image/jpeg"))

        if (!blob) {
            return;
        }

        getFaceEncodings(new File([blob], "capture.jpeg"));
    };

    useEffect(() => {
        getDevices();
    }, []);

    return (
        <div className="w-4/6 text-center my-5 mx-auto ">
            <h2 className="text-lg font-medium">Hey there, down here 👋 We help you to collect all your pictures </h2>
            {showCamUI
                ? <div className="w-4/6 mx-auto mt-3">
                    {canAccessToTheCam
                        ? <><video ref={videoElement} id="webcamVideo" className=""></video>
                            <canvas className="hidden" id="camCanvasElement" />
                        </>
                        : <p className="text-center border-l-8 border-orange-500 px-5 py-3 text-xs bg-gray-100 text-gray-500">
                            You may need to enable the camera access or you dont have a media device. <br />
                            Please <a target="_blank" className="text-cyan-500" href="https://support.google.com/chrome/answer/2693767?hl=en&co=GENIE.Platform%3DDesktopclic">click here</a> to know more
                        </p>
                    }
                    <div className="controls flex items-center justify-between">
                        <div className="devices my-2 ">
                            <select
                                onChange={e => {
                                    setSelectedDevice(e.target.value)
                                    previewCam();
                                }}
                                value={selectedDevice}
                                className="px-3 py-2 text-sm">
                                {devices.map(device => {
                                    if (device.kind !== 'videoinput') {
                                        return '';
                                }
                                return <option
                                    key={device.deviceId}
                                    value={device.deviceId}
                                >{device.label}</option>
                                })}
                            </select>
                        </div>
                        <div>
                            <button
                                className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={() => captureImage()}
                                disabled={loading}
                            >{loading && <div
        className="w-4 h-4 rounded-full border-2 border-r-transparent animate-spin"
        role="status">
      </div>}Find My Smiles </button>
                        </div>
                    </div>
                </div>
                : <div
                    onClick={e => {
                        e.preventDefault();
                        setShowCamUI(true)
                        previewCam();
                    }}
                    className="w-48 h-48 mx-auto relative bg-blue-500 rounded-full flex justify-center items-center p-2 my-10">
                    <span className="text-white font-bold">Allow Camera Access</span>
                    <span className="absolute rounded-full w-48 h-48 bg-blue-100 top-0 left-0 scale-125 z-[-1] animate-ping"></span>
                </div>
            }
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
                    accept="image/jpeg, image/jpg"
                    onChange={onUploadFileChange}
                />
            </div>

        </div>
    );
}
