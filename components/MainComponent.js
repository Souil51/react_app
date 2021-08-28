import React from "react";
import { List } from "./List.js";
import { Account } from "./Account.js";
import { Admin } from "./Admin.js";
import { Submit } from "./Submit.js";
import { ErrorDisplay } from "../components/ErrorDisplay.js";
import { EnumMessageType } from '../js/master.js';
import { Route, Switch, NavLink } from "react-router-dom";

export class MainComponent extends React.Component
{
    constructor(props)
    {
        super(props);

        this._ErrorDisplay = React.createRef()
        this.DisplayMessage = this.DisplayMessage.bind(this);
    }

    DisplayMessage(message, color)
    {
        this._ErrorDisplay.current.addMessage(color, message);
    }

    render()
    {
        return (
            <div className="outer-box" >
                <div className="sidebar">
                    <div className="menu">
                        <NavLink to="/" exact={true} className="nav-item" activeClassName="menu-selected">
                            <img src="./image/home.png" alt="home" width="30px" height="30px" className="icon-menu" />
                            <img src="./image/home_blue.png" alt="home" width="30px" height="30px" className="icon-menu icon-menu-hover" />
                            <span className="nav-not-first-letter">Home</span>
                        </NavLink>
                        <NavLink to="/admin" exact={true} className="nav-item" activeClassName="menu-selected">
                            <img src="./image/flag.png" alt="flag" width="30px" height="30px" className="icon-menu" />
                            <img src="./image/flag_blue.png" alt="flag" width="30px" height="30px" className="icon-menu icon-menu-hover" />
                            <span className="nav-not-first-letter">Admin</span>
                        </NavLink>
                        <NavLink to="/account" exact={true} className="nav-item" activeClassName="menu-selected">
                            <img src="./image/account.png" alt="account" width="30px" height="30px" className="icon-menu" />
                            <img src="./image/account_blue.png" alt="account" width="30px" height="30px" className="icon-menu icon-menu-hover" />
                            <span className="nav-not-first-letter">Account</span>
                        </NavLink>
                        <NavLink to="/submit" exact={true} className="nav-item" activeClassName="menu-selected">
                            <img src="./image/article.png" alt="article" width="30px" height="30px" className="icon-menu" />
                            <img src="./image/article_blue.png" alt="article" width="30px" height="30px" className="icon-menu icon-menu-hover" />
                            <span className="nav-not-first-letter">Submit</span>
                        </NavLink>
                    </div>
                    <div className="copyright">
                        Copyright 2021<span className="copyright-nom"> - CHERRIER Maxence</span>
                    </div>
                </div>
                <div className="content">
                    <ErrorDisplay ref={this._ErrorDisplay}></ErrorDisplay>
                    <div className="banner">
                        <div className="banner-title">
                            Dowell&nbsp;<span className="banner-subtitle"> : have you done well ?</span>
                        </div>
                    </div>
                    <div className="main">
                        <Switch>
                            <Route exact path="/" render={(props) => (<List DisplayMessage={this.DisplayMessage} />)} />
                            <Route exact path="/admin" render={(props) => (<Admin DisplayMessage={this.DisplayMessage} />)} />
                            <Route exact path="/account" render={(props) => (<Account DisplayMessage={this.DisplayMessage} />)} />
                            <Route exact path="/submit" render={(props) => (<Submit DisplayMessage={this.DisplayMessage} />)} />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}