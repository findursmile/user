import { CalendarIcon } from '@heroicons/react/24/outline'

function Banner() {
  return (
    <>
        <section
            className="w-full bg-[url('https://j.gifs.com/KeGkG9.gif')] bg-cover bg-center min-h-80 rounded-lg mt-6 relative"
            style={{backgroundImage: ""}}
        >
            <div className="absolute p-5 left-0 bottom-0 text-white">
                <div className="flex align-center font-sm pb-2">
                    <CalendarIcon className="w-4 inline-block mr-1"/> Date goes here
                </div>
                <h3 className="text-2xl font-bold">Event Name Goes Here</h3>
            </div>
        </section>
    </>
  )
}

export default Banner


