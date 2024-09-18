import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="text-white text-center mt-12 text-lg leading-8 font-semibold tracking-tight">
      <h1 className="text-5xl mt-10">Oops!</h1>
      <p className="text-4xl mt-10">Sorry, an unexpected error has occurred.</p>
      <p className="text-2xl mt-10">
        <i>{error.statusText || error.message}</i>
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/home"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </a>
            <a href="/contact" className="text-sm font-semibold text-white">
              Contact Support <span aria-hiddenA="true">&rarr;</span>
            </a>
          </div>
    </div>
  );
}