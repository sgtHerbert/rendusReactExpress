import React, { Component } from 'react';
import singleAppart from './singleAppart';
import { Link } from 'react-router-dom'

const uriAppartements = 'http://localhost:3001/api/appartements/'
class listAppartement extends Component {

    constructor(props){
        super(props)
        this.state = { requestFailed: false }
    }

    componentDidMount() {
        fetch(uriAppartements)
            .then(response => {
                console.log(response);
                if (!response.ok) throw Error("request failed")
                return response
            })
            .then(data => data.json())
            .then(json => { this.setState({ appartementsData: json }) },
            () => {
                this.setState({
                    requestFailed: true,
                })
            });
    }

  render() {
        if (this.state.requestFailed) return <p>Echec de la requete</p>
        if (!this.state.appartementsData) return <p>Chargement ...</p> 
        const listAppart = this.state.appartementsData.map((appartement) =>
            <div className="col-md-3" key={appartement._id}>
                <div className="panel panel-default">
                    <div className="panel-heading">Appartement: {appartement.adresse}</div>
                    <div className="panel-body">
                        <ul>
                            <li>Bailleur: {appartement.utilisateur_id}</li>
                            <li>Adresse: {appartement.adresse} {appartement.ville} {appartement.CP}</li>
                            <li>Nombre de place: {appartement.place}</li>
                            <li>Prix: {appartement.prix}</li>
                        </ul>
                    <Link to={"/appart/" + appartement._id}>Voir</Link>
                    </div>
                </div>
            </div>
        );
        return (
            <div className="appartement container-fluid">
                {listAppart}
            </div>
        );
    }
}

export default listAppartement;
