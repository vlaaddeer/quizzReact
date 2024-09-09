import "./QuizBody.scss"
import {Component} from "react";
import getQuizData from "../../services/services";
import ErrorPage from "../Error/Error";
import Loading from "../Loading/Loading";

export default class QuizBody extends Component {
    constructor(props) {
        super(props);
        this.quizzes = new getQuizData();
    }


    state = {
        counter: 0,
        array: null,
        loading: false,
        started: false,
        completed: false
    }

    async componentDidMount() {
        await this.onLoading();
        await this.getQuizzes();
    }

    addQuizzes = (array) => {
        this.setState({array, loading: false});
    }

    async getQuizzes() {
        await this.quizzes.getQuizzes(this.props.quiz)
            .then(this.addQuizzes).catch((e) => console.log(e))
    }

    onLoading = () => {
        this.setState({loading: true});
    }

    getCorrectAnswers = (array) => {
        let counter = 0;
        array.forEach((item) => {
            if (this.mapAnswers(item)) {
                counter++;
            }
        })
        return counter;
    }

    mapAnswers = (array) => {
        return array.answers.some((item) => {
            return (item.isSelected && item.isCorrect);
        })
    }


    showCounter = () => {
        this.setState({completed: true});
    }
    closeCounter = () => {
        this.setState({completed: false});
    }

    setCurrentQuestion() {
        this.setState({currentQuestion: this.getCurrentQuestion()});
    }

    getCurrentQuestion() {
        return this.state.array[this.state.counter];
    }

    changeCounter = (e, counter) => {
        if (e.target.className.includes("body__button__previous")) {
            this.setState({counter: counter - 1});
        } else if (e.target.className.includes("body__button__next")) {
            this.setState({counter: counter + 1});
        }
    }


    selectAnswer = (id) => {
        this.setCurrentQuestion()
        this.setState(({currentQuestion, array}) => {
            const answers = currentQuestion.answers.map((item) => {
                if (item.id === id) {
                    return {...item, isSelected: !item.isSelected}
                }
                return {...item, isSelected: false}
            })
            const newItem = {...currentQuestion, answers}
            const newArray = array.map(item => {

                if (item.id === newItem.id) {
                    return newItem
                }
                return item
            })
            return {array: newArray, currentQuestion: newItem};
        })
    }


    startQuiz = () => {
        this.setState({started: true})
    }


    render() {

        const {array, counter, completed, loading, started} = this.state

        const modal = completed ?
            <Modal result={this.getCorrectAnswers(array)}
                   close={this.closeCounter} active={completed}/> : null
        const start = !started && !loading ?
            <Start startQuiz={this.startQuiz}/> : null

        const loader = loading ? <Loading/> : null

        const view = started && !loading ?
            <View counter={counter} selectAnswer={this.selectAnswer} array={this.getCurrentQuestion()}/> : null
        const complete = (array !== null) && (counter === array.length - 1) ?
            <Complete complete={this.showCounter}/> : null

        if (!array && !loading) {

            return (
                <ErrorPage/>
            )
        }
        const buttons = started ? <Buttons counter={counter}
                                           started={started}
                                           complete={complete}
                                           array={array}
                                           changeCounter={(e) => this.changeCounter(e, counter)}/> : null
        return (
            <div className="body">
                {start}
                {view}
                {buttons}
                {modal}
                {loader}
            </div>

        )
    }
}
const Start = ({startQuiz}) => {
    return (
        <button style={{marginTop: "30px"}} className="yellow-button-filled" onClick={startQuiz}>Start</button>
    )

}
const Complete = ({complete}) => {
    return (
        <button className="yellow-button-filled complete" onClick={complete}>Complete</button>
    )

}
const Modal = ({active, result, close}) => {
    return (
        <div onClick={close} className={`modal ${active ? "active" : ""}`}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <h1 className="modal__content__headline">Your score</h1>
                <h1 className="modal__content__score">{result}</h1>
                <button className="yellow-button-filled"><a href="list">Go to list</a></button>
            </div>
        </div>
    )
}

const View = ({array, selectAnswer, counter}) => {
    const {question, answers} = array;
    const AnswersCheckBox = answers.map(item => {
        const selected = item.isSelected ? " body__answer__selected" : "";
        return (

            <div onClick={() => selectAnswer(item.id)} key={item.id} className=
                {"body__answer" + selected}>
                < p className="body__answer__letter"> {item.letter}.</p>
                <p className="body__answer__word">{item.word}</p>
            </div>


        )
    })
    return (
        <>
            <h1>Question {counter + 1}</h1>
            <div className="body__question">
                <p className={"body__question__p"}>{question}</p>
            </div>
            <div className="body__answers">
                {AnswersCheckBox}
            </div>
        </>

    )
}

const Buttons = ({counter, started, complete, array, changeCounter}) => {
    return (<div onClick={e => changeCounter(e, counter)}
                 className={"body__buttons"}>
        <button disabled={!started || counter === 0}

                className={"gray-button-filled body__button__previous"}>
            Previous
        </button>
        {complete}
        <button disabled={!started || counter === array.length - 1}
                className="yellow-button-filled body__button__next">
            Next
        </button>
    </div>)
}

