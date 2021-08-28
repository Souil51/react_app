import React from "react";

export class ErrorDisplay extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            listErrors: []
        };
    }

    handleChildClick(key)
    {
        const _thisObject = this;

        setTimeout(function ()
        {
            _thisObject.setState((prevState, props) =>
            {
                return { listErrors: _thisObject.state.listErrors.filter((value, i) => value.id !== key) }
            });
        }, 500);
    }

    renderMessage(model)
    {
        return <ErrorMessage key={model.id} ErrorItem={model} onClick={() => this.handleChildClick(model.id)}></ErrorMessage>
    }

    addMessage(szClass, msg)
    {
        this.setState((prevState, props) =>
        {
            return { listErrors: [...prevState.listErrors, new ErrorMessageModel(this.getNextKey(), msg, szClass)] }
        });
    }

    getNextKey()
    {
        let nMax = 0;

        if (this.state.listErrors.length > 0)
            nMax = Math.max.apply(Math, this.state.listErrors.map(function (item) { return item.id; }));

        return nMax + 1;
    }

    render()
    {
        return(
            <div className="ErrorDisplayComponent">
                {this.state.listErrors.map(item => this.renderMessage(item))}
            </div>
        )
    }
}

export class ErrorMessage extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            isVisible: true
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick()
    {
        this.setState((prevState, props) =>
        {
            return { isVisible: false }
        });

        this.props.onClick();
    }

    render()
    {
        return (
            <div className={this.state.isVisible ? "banner-message " + this.props.ErrorItem.class : "banner-message destroyed " + this.props.ErrorItem.class}
                onClick={this.handleClick}
            >
                <div className="message">
                {this.props.ErrorItem.message}
                </div>

                <img src="./image/cross_black.png" alt="cross" width="20px" height="20px" />
            </div>
        );
    }
}

export class ErrorMessageModel
{
    constructor(id, message, szClass)
    {
        this.id = id;
        this.message = message;
        this.class = szClass;
    }
}