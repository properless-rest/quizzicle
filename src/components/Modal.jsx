import React from "react";


export default function Modal( { modalVisible, setModalVisible } ) {

    function switchModal() {
        setModalVisible(false);
    }

    return (
        <div id="modal" className={modalVisible ? "modal": "modal invisible"}>
            <div className="modal-content">
                <p>Not enough questions for your querry.</p>
                <button id="okButton" onClick={switchModal}>OK</button>
            </div>
        </div>
    );
}
