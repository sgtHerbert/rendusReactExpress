import React, { Component } from 'react';

const uriAppartementById = 'http://localhost:3001/api/appartements/'
class singleAppartement extends Component {

    constructor(props){
        super(props)
        this.state = { requestFailed : false}
    }

    //this.props.match.params.id;
    componentDidMount(){
        console.log(this.props)
        fetch(uriAppartementById + this.props.match.params.id/*this.props.match.params.id*/)
            .then( response => { 
                console.log(response); 
                if(!response.ok) throw Error("request failed");
                return response
            })
            .then( data => data.json())
            .then( json => { this.setState({ appartementData : json})},
            () => {
                this.setState({
                    requestFailed : true,
                })
            });
    }
    

    render() {

        if(this.state.requestFailed) return <p>Echec de la requete</p>
        if (!this.state.appartementData) return <p>Chargement ...</p> 
        return (
            <div className="col-md-3" key={this.state.appartementData._id}>
                <div className="panel panel-default">
                    <div className="panel-heading">Appartement: {this.state.appartementData.adresse}</div>
                    <div className="panel-body">
                        <ul>
                            <li>Bailleur: {this.state.appartementData.utilisateur_id}</li>
                            <li>Adresse: {this.state.appartementData.adresse} {this.state.appartementData.ville} {this.state.appartementData.CP}</li>
                            <li>Nombre de place: {this.state.appartementData.place}</li>
                            <li>Prix: {this.state.appartementData.prix}</li>
                        </ul>
                        <button type="button" className="btn btn-primary btn-md">Reserver</button> &nbsp;
                    </div>
                </div>
            </div>
        )
    };

}

export default singleAppartement;
