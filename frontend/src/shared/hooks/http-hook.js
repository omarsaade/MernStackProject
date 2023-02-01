import { useState, useCallback, useRef, useEffect } from "react";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState();

  /*
A reference here in the end is just a piece of data which will not change or in this case which will
not be re initialized when this function runs again and this function does run again whenever the component
which uses this hook re renders.
So now this will basically store data across three renderer cycles, you could say.
 */
  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController(); // {signal: {aborted: false, reason: undefined, onabort: null} , abort() }
      activeHttpRequests.current.push(httpAbortCtrl); // [{signal: {aborted: false, reason: undefined, onabort: null} , abort() } ]

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          /*
       This basically links this abort controller to this request and now we can use this, abort controller
          */
          signal: httpAbortCtrl.signal, //{aborted: false, reason: undefined, onabort: null}
        });

        const responseData = await response.json();
        // baad a tebe3et el request w kelo ysir tamem
        // console.log(activeHttpRequests.current);
        /*
       So here I want to filter all my request controllers and remove the request controller which I used for
       this request, which I do with this logic.
       This keeps every controller except for the controller which was used in this request.
       We want to clear the abort controllers that belong to the request which just completed.
        */
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    // components unmounts
    return () => {
      //   console.log("1");
      // eslint-disable-next-line react-hooks/exhaustive-deps
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);
  //   console.log(activeHttpRequests.current);

  return { isLoading, error, sendRequest, clearError };
};

/*
useRef(0) . It's like doing this: const count = {current: 0} .

useRef([])    const activeHttpRequests = {current: [] }

const httpAbortCtrl =  new AbortController();
console.log(httpAbortCtrl);


{signal: {aborted: false, reason: undefined, onabort: null} , abort() }

httpAbortCtrl.signal
AbortSignal {aborted: false, reason: undefined, onabort: null} , abort()






import fetch from "node-fetch";
import { AbortController } from "node-abort-controller";

const controller = new AbortController();
const signal = controller.signal;

await fetch("https:/www.google.com", { signal });

// Abort fetch after 500ms. Effectively a timeout
setTimeout(() => controller.abort(), 500);

*/
