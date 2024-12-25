import { CalendarIcon } from '@heroicons/react/24/outline'

interface EVENT {
    title: string,
    cover_photo: string,
    event_date: string,
}

function Banner({onViewChange, event}: {onViewChange: Function, event?: EVENT}) {
  return (
    <>
        <section
            className={`w-full ${event?.cover_photo ? '' : "bg-[url('https://j.gifs.com/KeGkG9.gif')]"} bg-cover bg-center min-h-80 rounded-lg mt-6 relative`}
            style={{backgroundImage: event?.cover_photo}}
        >
            <div className="absolute p-5 left-0 bottom-0 text-white">
                <div className="flex align-center font-sm pb-2">
                    <CalendarIcon className="w-4 inline-block mr-1"/>
                    {event ? new Date(event.event_date).toLocaleDateString(): ''}
                </div>
                <h3 className="text-2xl font-bold">{event?.title}</h3>
                <div className="flex gap-1">
                    <button
                        className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => onViewChange("all")}
                    > View All</button>
                    <button
                        className="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-2.5 py-1.5 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => onViewChange("mine")}
                    > View Mine</button>
                </div>
            </div>
        </section>
    </>
  )
}

export default Banner


