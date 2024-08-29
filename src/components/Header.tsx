import { EnvelopeIcon, PhoneIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'

import LogoIcon from '../assets/logo-icon.svg'

function Header() {
  return (
    <>
        <section className="w-full border-b">
            <div className="container mx-auto flex items-center justify-between px-2 py-1">
                <div>
                    <img className="w-12" src={LogoIcon} />
                </div>
                <div className="flex gap-4">
                    <button>
                        <PhoneIcon className="w-6" />
                    </button>
                    <button>
                        <EnvelopeIcon className="w-6" />
                    </button>
                    <button>
                        <QuestionMarkCircleIcon className="w-6" />
                    </button>
                </div>
            </div>
        </section>
    </>
  )
}

export default Header

