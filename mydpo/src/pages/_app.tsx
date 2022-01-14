import {Toaster} from "react-hot-toast";
import type {AppProps} from "next/app";
import {Provider} from "urql";
import {client} from "../client/graphql/client";
import '../client/stylesheets/main.css'

function CustomApp({Component, pageProps}: AppProps) {
    return (
        <Provider value={client}>
            <Component {...pageProps} />
            <Toaster/>
        </Provider>
    );
}

export default CustomApp;
