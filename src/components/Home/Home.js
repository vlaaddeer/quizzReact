import "./Home.scss"
import {Component} from "react";

export default class Home extends Component {
    render() {
        return (
            <main className="main">
                <div className="main__info">
                    <h1 className="main__info__headline">
                        Learn new concepts for each question
                    </h1>
                    <p className="main__info__paragraph">
                        We help you prepare for exams and quizes
                    </p>
                    <div className="main__info__buttons">
                        <button className="yellow-button-filled"><a href="list">Start solving</a></button>
                    </div>
                </div>
                <img src={process.env.PUBLIC_URL + "/people.svg"} alt=""/>
            </main>
        )
    }
}