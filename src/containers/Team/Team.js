import React, {useState, useEffect} from 'react';

import Grid from "@material-ui/core/Grid/index";
import Paper from "@material-ui/core/Paper/index";
import Typography from "@material-ui/core/Typography/index";

import footballApi from "../../api/footballApi";

import classes from "./Team.module.css";
import Matches from "../../components/Matches";




const Team = (props) => {

  const [team, setTeam] = useState({activeCompetitions: []})
  const [matches, setMatches] = useState([])



  useEffect(() => {
    const teamId = props.match.params.teamId;
    footballApi.get(`/teams/${teamId}`)
      .then(response => {
        setTeam(response.data)
      })
  }, [props.match.params.teamId]);

  useEffect(() => {
    const teamId = props.match.params.teamId;
    footballApi.get(`/teams/${teamId}/matches`)
      .then(response => {
        setMatches(response.data.matches)
      })
  }, [props.match.params.teamId]);

  const onViewSquadButtonClick = () => {
    props.history.push(`/squad/${team.id}`)
  };


  return (
    <>
      <div>
        <Paper className={classes.content}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h4">
                {team.name}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    Basic info
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h8">
                    Founded:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  {team.founded}
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h8">
                    Stadium name:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h8">
                    {team.venue}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h8">
                    Address:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h8">
                    {team.address}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h8">
                    Website:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h8">
                    <a href={team.website}>{team.website}</a>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h8">
                    Email:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h8">
                    {team.email}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h8">
                    Full Squad:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h8">
                    <button className={classes.viewSquadButton} onClick={onViewSquadButtonClick}>View</button>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    Active competitions
                  </Typography>
                </Grid>
                {team.activeCompetitions.map(c => (
                  <>
                    <Grid item xs={6}>
                      <Typography variant="h8">
                        {c.area.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h8">
                        {c.name}
                      </Typography>
                    </Grid>
                  </>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Typography variant="h4">
          Matches
        </Typography>
        <Matches history={props.history} matches={matches}/>
      </div>
    </>
  )

};

export default Team;
