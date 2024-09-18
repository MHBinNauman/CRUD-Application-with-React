import Navbar from "./navbar"
import { Link } from "react-router-dom"

const stats = [
  { id: 1, name: 'You are logged in!', value: 'Success' },
]

export default function LoginSuccess() {
  return (
    <div>
      <Navbar />
    <div className="bg-black py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className=" gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
              <dt className="text-base py-10 leading-7 text-white">{stat.name}</dt>
              <dd className="order-first mt-8 text-6xl font-semibold tracking-tight text-white sm:text-8xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mx-auto max-w-2xl py-2 sm:py-4 lg:py-6">
          <div className="hidden sm:mb-4 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-2 text-sm leading-6 text-white ring-1 ring-white hover:ring-indigo-600">
              Go to homepage.  {'  '}
              <Link to="/home" className="font-semibold text-indigo-600">
                <span aria-hidden="true" className="absolute inset-0" />
                Home <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
      </div>
    </div>
    </div>
    </div>
  )
}
