import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div id="error-page" className="relative h-screen flex items-center justify-center">
  <div className="text-center">
    <h1 className="text-4xl font-bold mb-4">Oops!</h1>
    <p className="text-lg mb-2">Sorry, an unexpected error has occurred.</p>
    <p className="text-sm text-gray-600">
      <i>{error.statusText || error.message}</i>
    </p>
  </div>
</div>

  );
};

export default ErrorPage;
