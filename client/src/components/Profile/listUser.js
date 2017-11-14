import React, { Component } from 'react';
import { Link } from 'react-router-dom'
const uriClients = 'http://localhost:3001/api/utilisateurs/'
class userList extends Component {

    constructor(props) {
        super(props)
        this.state = { requestFailed: false }
    }

    componentDidMount() {
        fetch(uriClients)
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
      const listUser = this.state.utilisateursData.map((utilisateur) =>
          <div className="col-md-3" key={utilisateur._id}>
          <div className="panel panel-default">
                  <div className="panel-heading"> {utilisateur.nom}</div>
            <div className="panel-body">
                <ul>
                    <li>{utilisateur.mail}</li>
                    <li>création du profil: {utilisateur.date_crea}</li>
                </ul>
                <Link to={"/profil/" + utilisateur._id}>Voir</Link>
              </div>
          </div>
        </div>
    );


    return (
      <div className="user container-fluid">
            {listUser}
      </div>
    );
  }
}

export default userList;
