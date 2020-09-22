import React from "react";
import CardDetail from "./Card-detail";
import "../style/Modal.scss"


export default class Modal extends React.Component {
    onClose = e => {
        this.props.onClose && this.props.onClose(e);
    };

    render() {
        if(!this.props.show){
            return null;
        }
        return (
            <div className="modal__wrapper">
            <div className="modal">
                <CardDetail movie={this.props.movie}/>
            </div>
            </div>
        )
    }
}
