import '../App.css';
import React, {Component} from 'react';

class AppButton extends React.Component {

    addEvent = () => {
        var itemList = document.getElementById("itemList") 
        if (itemList.style.visibility === "hidden") {
            itemList.style.visibility = "visible";
        } else {
            itemList.style.visibility = "hidden";
        }

    }

    render() {
        return (
            <div>
                <button className="App-button" onClick={this.addEvent}> 
                    Share 
                    </button>
                <ol id="itemList">
                    <li>itemList</li>
                    </ol>
            </div>
        );
    }
};

export default AppButton;
