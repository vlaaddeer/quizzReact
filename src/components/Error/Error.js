import {useRouteError} from "react-router-dom";
import "./Error.scss"
import errorImg from './img/error.jpg'

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="error">
            <h1>Oops!</h1>
            <h2>Something went wrong!</h2>
            <img width={"200px"} height={"200px"} src={errorImg} alt=""/>
            <p>
            </p>
        </div>
    );
}