import React, { Component } from 'react';

const uriClientById = 'http://localhost:3001/api/utilisateurs/'
class userProfile extends Component {

    constructor(props) {
        super(props)
        this.state = { requestFailed: false }
    }

    componentDidMount() {
        fetch(uriClientById + this.props.match.params.id)
            .then(response => {
                console.log(response);
                if (!response.ok) throw Error("request failed")
                return response
            })
            .then(data => data.json())
            .then(json => { this.setState({ utilisateursData: json }) },
            () => {
                this.setState({
                    requestFailed: true,
                })
            });
    }

  render() {

        if (this.state.requestFailed) return <p>Echec de la requete</p>
        if (!this.state.utilisateursData) return <p>Chargement ...</p> 
        return (
            <div className="appartement container-fluid">
                <div className="col-md-3" key={this.state.utilisateursData._id}>
                    <div className="panel panel-default">
                        <div className="panel-heading">{this.state.utilisateursData.nom}</div>
                        <div className="panel-body">
                            <ul>
                                <li>{this.state.utilisateursData.mail}</li>
                                <li>création du profil: {this.state.utilisateursData.date_crea}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default userProfile;
