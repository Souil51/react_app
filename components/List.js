import React from "react";
import { ListItem } from "./ListItem";
import { ListItemModel } from "../models/ListItemModel.js"
import { EnumMessageType } from '../js/master.js';
import '../css/index.css';

export class List extends React.Component
{
    listeComplete = [];//Liste statique pour les items sans API

    constructor(props)
    {
        super(props);
        this.state =
        {
            liste: [],
            lastIndex: 0,
            noMoreItems: false,
            loading: false,
            prevY: 0,
            typeFilter: 0,
        };

        this.handleLoadMoreItems = this.handleLoadMoreItems.bind(this);
    }

    componentDidMount()
    {
        this.initListeComplete();
        this.getNextMessages();

        var options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        };

        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options
        );
        this.observer.observe(this.loadingRef);
    }

    handleObserver(entities, observer)
    {
        const y = entities[0].boundingClientRect.y;

        if (this.state.prevY > y)
        {
            if(!this.state.loading)
                this.handleLoadMoreItems();
        }
        this.setState({ prevY: y });
    }

    getNextMessages()
    {
        //Recherche des nouveaux items sans API
        const nextTen = this.listeComplete.slice(this.state.lastIndex, this.state.lastIndex + 10);

        const newItems = [...this.state.liste, ...nextTen];

        this.setState((prevState, props) =>
        {
            return {
                lastIndex: this.state.lastIndex + nextTen.length,
                liste: newItems,
                noMoreItems: nextTen.length < 10,
            }
        });
    }

    //Initialisation de la liste des items sans API
    initListeComplete()
    {
        for (let i = 1; i < 50; i++)
        {
            const nbLigneMessage = Math.floor(Math.random() * 4) + 1;
            const nType = Math.floor(Math.random() * 2) + 1;

            let msg = "";

            for (let j = 0; j < nbLigneMessage; j++)
            {
                if (msg != "")
                    msg += "<br>";
                    
                msg += `Message ${j}`;
            }

            this.listeComplete.push(new ListItemModel(i, nType, "User " + i, "00" + i, msg, new Date(2021, 4, 25), 0, 0, false, false));
        }
    }

    handleLoadMoreItems()
    {
        this.setState((prevState, props) =>
        {
            return { loading: true }
        });

        const refThis = this;

        //Simulation du temps de chargement des nouveaux items
        setTimeout(function ()
        {
            //refThis.props.DisplayMessage("Une erreur est survenue lors du chargement des prochains éléments", EnumMessageType.ERROR)

            refThis.getNextMessages();

            refThis.setState((prevState, props) =>
            {
                return { loading: false }
            });
        }, 500);
    }

    handlerFilterClick(index)
    {
        this.setState((prevState, props) =>
        {
            return { typeFilter: index }
        });
    }

    handleTestDisplayMessage()
    {
        var randInt = Math.floor(Math.random() * 4);

        switch (randInt)
        {
            case 0: this.props.DisplayMessage("Erreur", EnumMessageType.ERROR); break;
            case 1: this.props.DisplayMessage("Attention", EnumMessageType.WARNING); break;
            case 2: this.props.DisplayMessage("Information", EnumMessageType.MESSAGE); break;
            case 3: this.props.DisplayMessage("Succès", EnumMessageType.SUCCESS); break;
        }
        
    }

    renderItem(listItemModel)
    {
        return (
            <ListItem Item={listItemModel} key={listItemModel.id}></ListItem>
        );
    }

    renderLoadingContainer()
    {
        return (
            <div className="loading-container"
                ref={loadingRef => (this.loadingRef = loadingRef)}>
                <button onClick={this.handleLoadMoreItems}>Load more items</button>
                {this.state.loading && <div className="loading-wheel"></div>}
            </div>
        );
    }

    renderNoMoreItemToLoad()
    {
        return (
            <div className="loading-container">
                No more items to load...
            </div>
        );
    }

    renderFilterButtons()
    {
        const classButton = "filter-button";
        const classButtonSelected = "filter-button filter-button-selected";

        return (
            <div className="filter-banner">
                <button className={this.state.typeFilter == 0 ? classButtonSelected : classButton} onClick={() => this.handlerFilterClick(0)}>No filter</button>
                <button className={this.state.typeFilter == 1 ? classButtonSelected : classButton} onClick={() => this.handlerFilterClick(1)}>Filter 1</button>
                <button className={this.state.typeFilter == 2 ? classButtonSelected : classButton} onClick={() => this.handlerFilterClick(2)}>Filter 2</button>
            </div>
        );
    }

    render()
    {
        const loadingContainer = this.renderLoadingContainer();
        const noMoreItem = this.renderNoMoreItemToLoad();
        const fiterButtons = this.renderFilterButtons();

        const itemsList = this.state.liste.filter(item => this.state.typeFilter == 0 || this.state.typeFilter == item.typeID);

        return (
            <div className="list-container">
                <button onClick={() => this.handleTestDisplayMessage()}>Afficher un message aléatoire</button>
                {fiterButtons}
                <div className="element-list">
                    {itemsList.map(item => this.renderItem(item))}
                    {!this.state.noMoreItems && loadingContainer}
                    {this.state.noMoreItems && noMoreItem}
                </div>
            </div>
        );
    }
}