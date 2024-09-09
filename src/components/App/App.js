import './App.scss';
import Header from "../Header/Header";
import Home from "../Home/Home";
import QuizBody from "../QuizBody/QuizBody";
import {Component} from "react";
import QuizList from "../QuizList/QuizList";
import ErrorPage from "../Error/Error";
import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";


export default class App extends Component {

    setQuiz = (quiz) => {
        localStorage.setItem('quiz', JSON.stringify(quiz));
    }
    getQuiz = () => {
        const item = localStorage.getItem('quiz');
        return JSON.parse(item);
    }

    render() {
        const router = createBrowserRouter([
            {
                path: "/",
                element: <Home/>,
                errorElement: <ErrorPage/>
            },
            {
                path: "list",
                element: <QuizList setQuiz={this.setQuiz}/>,
                errorElement: <ErrorPage/>
            },
            {
                path: "game",
                element: <QuizBody quiz={this.getQuiz()}/>,
                errorElement: <ErrorPage/>
            },

        ]);
        return (

            <div className="app">
                <Header/>
                <RouterProvider router={router}/>
            </div>
        );
    }
}

