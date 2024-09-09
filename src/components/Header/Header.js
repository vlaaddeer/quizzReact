import {Component} from "react";
import "./Header.scss"

export default class Header extends Component {


    render() {
        return (
            <header className="header">
                <img className="header__logo" src="logo.svg" alt=""/>
                <ul className="header__navigation">
                    <li>
                        <a className="header__navigation__item" href="/">Home</a>
                    </li>
                    <li>
                        <button className="yellow-button-outline">
                            <a className="header__navigation__item" href="list">Choose Topic</a>
                        </button>
                    </li>
                </ul>
            </header>
        )
    }
}