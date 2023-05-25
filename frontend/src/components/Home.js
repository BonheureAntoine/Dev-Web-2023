import React, { Component } from 'react';
import "../css/Home.css"


import boxes from '../img/boxes.jpg'
import Chevaux_qui_saute from '../img/Chevaux_qui_saute.jpg'
import Obstacles from '../img/Obstacles.jpg'
import Cheveaux_dans_une_prairie from '../img/Cheveaux_dans_une_prairie.jpg'


function formatageJsonConcours(concoursJson){
  return concoursJson.map(concours => (
    <li key={concours.id}>
      <div>{concours.typeName}</div>
      <div>{`${new Date(concours.startDate).toLocaleDateString('fr-FR')}:${new Date(concours.endDate).toLocaleDateString('fr-FR')}`}</div>
    </li>
  ));
}



class Home extends Component {
  constructor(){
    super();
    this.state={
      concours: "",
      actualite: ""
    }
  }

  componentDidMount() {
    fetch("https://equimanagmentapi.vercel.app/api/concours")
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("There has been a problem with your fetch operation")
        })
        .then(data => {
          this.setState({concours : formatageJsonConcours(data)})
        }).catch((error) => {
        console.log('error: ' + error);
    });
  }



  render() {
    return (
        <div className="acceuil">
          <div className="acceuil-contenu">
            <div className='acceuil-text'>
            <h2>Locations de boxes</h2>
              <p>Plus que quelques boxes à louer !</p>
              <p>Dans nos infrastructures écoresponsables sur 3,5 hectares, tout est réuni pour offrir un maximum de confort à votre cheval🐎.</p>
              <p>Votre cheval est LA priorité, une présence qualifiée est sur place 24h/24h.</p>
              <p>Petite écurie familiale de 20 box dans laquelle hongres, juments et poneys cohabitent.</p>
              <p>Il ne reste plus que quelques places! Ne tardez plus😉</p>
              <p><strong>❗️Pour profiter pleinement de votre cheval, avec la pension, vous pouvez participer GRATUITEMENT aux cours collectifs.</strong></p>
              <p><strong>❗️La pension est TOUT COMPRIS: paille &amp; foin tous les jours et sorties en paddock/prairie.</strong></p>
              <p>Plus d'informations en message privé ou par téléphone auprès de Nicolas au 0478/ 84 96 47</p>
              <p>N'hésitez pas à partager l'information!</p>
              </div>
              <div className='acceuil-contenu-images'>
                <img src={Cheveaux_dans_une_prairie} alt='Cheveaux_dans_une_prairie' className="acceuil-image-first"></img>
                  <div className="acceuil-images">    
                    <img src={boxes} alt='boxes' className="acceuil-image"></img>
                    <img src={Obstacles} alt='Obstacles' className="acceuil-image"></img>
                    <img src={Chevaux_qui_saute} alt='Chevaux_qui_saute' className="acceuil-image"></img>
                  </div>
                  </div>  
                </div>

            <div className="acceuil-listes">
                
                <div className="acceuil-actualite">
                <ul>
                    {this.state.actualite}            
                </ul>
                </div>
                <div className="acceuil-concours">
                <ul>
                    {this.state.concours}            
                </ul>
                </div>
                
            </div>
        </div>
    );
  }
}

export default Home;