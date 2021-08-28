import React from "react";

export class ListItem extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            upvote: props.Item.upvote,
            downvote: props.Item.downvote
        };

        this.handleUpvoteClick = this.handleUpvoteClick.bind(this);
        this.handleDownvoteClick = this.handleDownvoteClick.bind(this);
    }

    addUpvote()
    {
        this.props.Item.upvote++;
        this.props.Item.currentUserUpvote = true;

        if (this.props.Item.currentUserDownvote)
            this.props.Item.downvote--;
        
        this.props.Item.currentUserDownvote = false;

        this.setState((prevState, props) =>
        {
            return {
                upvote: prevState.upvote + 1,
                downvote: this.props.Item.downvote,
            }
        });
    }

    addDownvote()
    {
        this.props.Item.downvote++;
        this.props.Item.currentUserDownvote = true;

        if (this.props.Item.currentUserUpvote)
            this.props.Item.upvote--;

        this.props.Item.currentUserUpvote = false;

        this.setState((prevState, props) =>
        {
            return {
                downvote: prevState.downvote + 1,
                upvote: this.props.Item.upvote,
            }
        });
    }

    removeUpvote()
    {
        this.props.Item.upvote--;
        this.props.Item.currentUserUpvote = false;
        this.setState((prevState, props) =>
        {
            return { upvote: prevState.upvote - 1 }
        });
    }

    removeDownvote()
    {
        this.props.Item.downvote--;
        this.props.Item.currentUserDownvote = false;
        this.setState((prevState, props) =>
        {
            return { downvote: prevState.downvote - 1 }
        });
    }

    handleUpvoteClick()
    {
        if (this.props.Item.currentUserUpvote)
        {
            this.removeUpvote();
        }
        else
        {
            this.addUpvote();
        }
    }

    handleDownvoteClick()
    {
        if (this.props.Item.currentUserDownvote)
        {
            this.removeDownvote();
        }
        else
        {
            this.addDownvote();
        }
    }

    render()
    {
        return (
            <div className="list-item">
                <div className="lateral">
                    <img width="50px" height="50px" alt="profil" src="./image/profil.jpg" className="image-profil" />
                </div>
                <div className="item-inner">
                    <div className="inner-banner">
                        <span className="pseudo">{this.props.Item.userName}</span>
                        <span className="identifiant">   #{this.props.Item.userPublicId}</span>
                        <span className="date">- {this.props.Item.GetDateToDisplay()}</span>
                    </div>
                    <div className="inner-message" dangerouslySetInnerHTML={{ __html: this.props.Item.message }}>
                    </div>
                    <div className="inner-footer">
                        <a className={this.props.Item.currentUserUpvote ? "btn-1 btnSelected" : "btn-1"} onClick={this.handleUpvoteClick}>
                            <img src="./image/validation.png" alt="validation" width="30px" height="30px" className="btn-icon" />
                            <span className="btn-text">
                                Upvote
                            <span className="count">({this.state.upvote})</span>
                            </span>
                        </a>
                        <a className={this.props.Item.currentUserDownvote ? "btn-2 btnSelected" : "btn-2"} onClick={this.handleDownvoteClick}>
                            <img src="./image/cross.png" alt="cross" width="30px" height="30px" className="btn-icon" />
                            <span className="btn-text">
                                Downvote
                        <span className="count">({this.state.downvote})</span>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}