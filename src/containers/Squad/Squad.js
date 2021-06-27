import React, {useState, useEffect} from 'react';


import footballApi from "../../api/footballApi";

import Grid from "@material-ui/core/Grid";
import PlayersAccordion from "../../components/PlayersAccordion";


const Squad = (props) => {

  const [squad, setSquad] = useState([]);

  useEffect(() => {
    const teamId = props.match.params.teamId;
    footballApi.get(`/teams/${teamId}`)
      .then(response => {
        setSquad(response.data.squad)
      })
  }, []);

  return (
    <Grid container spacing={3}>
      <PlayersAccordion title="Goalkeepers" players={squad.filter(player => player.position === "Goalkeeper")}/>
      <PlayersAccordion title="Defenders" players={squad.filter(player => player.position === "Defender")}/>
      <PlayersAccordion title="Midfielders" players={squad.filter(player => player.position === "Midfielder")}/>
      <PlayersAccordion title="Attackers" players={squad.filter(player => player.position === "Attacker")}/>
      <PlayersAccordion title="Manager" players={squad.filter(player => player.role === "COACH")}/>
    </Grid>
  )
}

export default Squad;
