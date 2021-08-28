import React from "react";
import { EnumMessageType } from '../js/master.js';
import '../css/account.css';

export class Account extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            profileImage : null,
        };

        this.fileInput = React.createRef();
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDarkModeClick = this.handleDarkModeClick.bind(this);
    }

    handleInputChange()
    {
        if (this.fileInput.current.files && this.fileInput.current.files.length > 0)
        {
            const selectedFile = this.fileInput.current.files[0];
            const reader = new FileReader();

            const imgtag = document.querySelector(".image-profil");
            imgtag.title = selectedFile.name;

            const thisRef = this;

            reader.onload = function (event)
            {
                imgtag.src = event.target.result;

                thisRef.setState((prevState, props) =>
                {
                    return { profileImage: event.target.result }
                });
            };

            reader.readAsDataURL(selectedFile);
        }
    }

    handleDarkModeClick()
    {
        console.log("CHANGE TO DARK MODE");
    }

    render()
    {
        return (
            <div className="account-container">
                <h2>Profile</h2>
                <div className="profile-container">
                    <div>
                        <span className="userName">UserName</span>
                        <span className="userID">#0001</span>
                    </div>
                    <div className="profile-image">
                        <img width="50px" height="50px" alt="profil" src="./image/profil.jpg" className="image-profil" />
                        <div>
                            <input type="file" name="file" id="file" className="inputfile" ref={this.fileInput} onChange={this.handleInputChange} />
                            <label htmlFor="file">Choose a new image</label>
                        </div>
                    </div>
                </div>
                <h2>Parameters</h2>
                <div className="parameters-container">
                    <div>Dark mode : </div>
                    <div>
                        <label className="switch">
                            <input type="checkbox" onChange={this.handleDarkModeClick} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>
            </div>
        );
    }
}