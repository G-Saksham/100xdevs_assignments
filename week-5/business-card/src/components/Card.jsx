import {useState} from 'react'

function Card () {
    const [cardDetails, setCardDetails] = useState([{
        id: "123",
        name: "fullName",
        description: "a short description",
        interests: ["first", "second", "third", "and so on"],
        socialLinks: {
          linkedin: "linkedin-link",
          twitter: "twitter-link"
        }
      }, {
        id: "324",
        name: "fullName",
        description: "a short description",
        interests: ["first", "second", "third", "and so on"],
        socialLinks: {
          linkedin: "linkedin-link",
          twitter: "twitter-link"
        }
      }]);

      function Interests ({interests}) {
        return <div>
            <h3>Interests</h3>
            {interests.map((interest) => {
                return <li key = {interest}>{interest}</li>
            })}
            <br />
        </div>
    }

      return <div style = {{display: "flex", justifyContent: "space-evenly"}}>
        {cardDetails.map((card)=>{
            return <div style = {{"box-shadow" : "2px 2px 2px 3px grey", width: "30%",height: "15%" , padding: "20px", margin: "20px", "border-radius": "10px"}}>
                <div key = {card.id}>
                <h2>{card.name}</h2>
                <h4>{card.description}</h4>
                <Interests interests = {card.interests} />
                <div style = {{display: "flex"}}>
                    <button>LinkedIn</button>
                    <button>Twitter</button>
                </div>
            </div>
            </div>
        })}
      </div>
}

export default Card 