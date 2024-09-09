import "./QuizList.scss"
import {Component} from "react";
import {v4 as uuid} from "uuid"

export default class QuizList extends Component {
    state = {
        content: [
            {
                id: uuid(),
                easyActive: true,
                hardActive: false,
                mediumActive: false,
                difficulty: "easy",
                limit: 5,
                tags: "Php"
            },
            {
                id: uuid(),
                easyActive: true,
                hardActive: false,
                mediumActive: false,
                difficulty: "easy",
                limit: 5,
                tags: "Javascript"
            },
            {
                id: uuid(),
                easyActive: true,
                hardActive: false,
                mediumActive: false,
                difficulty: "easy",
                limit: 5,
                tags: "Wordpress"
            },
            {
                id: uuid(),
                easyActive: true,
                hardActive: false,
                mediumActive: false,
                difficulty: "easy",
                limit: 5,
                tags: "Mysql",
            },
            {
                id: uuid(),
                easyActive: true,
                hardActive: false,
                mediumActive: false,
                difficulty: "easy",
                limit: 5,
                tags: "Html",
            }

        ]
    }
    setDifficulty = (difficulty, id, choose, firstNotChoose, secondNotChoose) => {
        this.setState(({content}) => {
            const newContent = content.map((item) => {
                if (item.id === id) {
                    item = {
                        ...item, difficulty: difficulty,
                        [choose]: true,
                        [firstNotChoose]: false,
                        [secondNotChoose]: false
                    }
                }
                return item;
            })
            return {content: newContent}
        })
    }
    chooseDifficulty = (e, id) => {
        const difficulty = e.target.dataset.difficulty;
        if (difficulty === "Easy") {
            this.setDifficulty(difficulty, id, "easyActive", "mediumActive", "hardActive")
        }
        if (difficulty === "Medium") {
            this.setDifficulty(difficulty, id, "mediumActive", "easyActive", "hardActive")
        }
        if (difficulty === "Hard") {
            this.setDifficulty(difficulty, id, "hardActive", "easyActive", "mediumActive")
        }
    }

    changeCounter = (e, id) => {
        const target = e.target.innerHTML;
        this.setState(({content}) => {
            const newContent = content.map((item) => {
                if (item.id === id && target === "+" && 20 > item.limit) {
                    return {...item, limit: item.limit + 5}
                }
                if (item.id === id && target === "-" && 5 < item.limit) {
                    return {...item, limit: item.limit - 5}
                }
                return item
            })
            return {content: newContent}
        })
    }

    render() {
        const {setQuiz} = this.props;
        const {content} = this.state;
        return (
            <ul className="list">
                {content.map(item => {
                    return (
                        <li key={item.id}
                            className="list__item">
                            <img src={`imgList/${item.tags}.png`} alt="" className="list__item__img"/>
                            <div onClick={(e) => this.chooseDifficulty(e, item.id)} className="list__item__difficulty">
                                <button
                                    data-difficulty="Easy"
                                    className={`gray-button-filled easy ${item.easyActive ? "active" : ""}`}>
                                    Easy
                                </button>
                                <button
                                    data-difficulty="Medium"
                                    className={`gray-button-filled medium ${item.mediumActive ? "active" : ""}`}>
                                    Medium
                                </button>
                                <button
                                    data-difficulty="Hard"
                                    className={`gray-button-filled hard ${item.hardActive ? "active" : ""}`}>
                                    Hard
                                </button>

                            </div>
                            <div
                                onClick={(e) => {
                                    this.changeCounter(e, item.id)
                                }} className="list__item__counter">
                                <button className="gray-button-filled">-</button>
                                {item.limit}
                                <button className="gray-button-filled">+</button>
                            </div>
                            <button onClick={() => setQuiz(item)} className="yellow-button-filled">
                                <a href="game">{item.tags}</a>
                            </button>
                        </li>
                    )
                })}
            </ul>
        )
    }

}