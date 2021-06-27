import React, {useState, useEffect} from 'react';

import TableContainer from "@material-ui/core/TableContainer/index";
import Paper from "@material-ui/core/Paper/index";
import Table from "@material-ui/core/Table/index";
import TableHead from "@material-ui/core/TableHead/index";
import TableRow from "@material-ui/core/TableRow/index";
import TableCell from "@material-ui/core/TableCell/index";
import TableBody from "@material-ui/core/TableBody/index";

import footballApi from "../../api/footballApi";

import classes from "./Standings.module.css";
import Button from "@material-ui/core/Button";


const Standings = (props) => {

  const competitionId = props.match.params.competitionId;
  const [currentTable, setCurrentTable] = useState([])
  const [standings, setStandings] = useState([])
  const [competitionName, setCompetitionName] = useState("")

  const onChangeStandingsTypeButtonClick = (standingsType) => {
    if (standingsType === "TOTAL") {
      setCurrentTable(standings[0] ? standings[0].table: [])
    } else if (standingsType === "HOME") {
      setCurrentTable(standings[1] ? standings[1].table: [])
    } else {
      setCurrentTable(standings[2] ? standings[2].table: [])
    }
  };

  useEffect(() => {
    const competitionId = props.match.params.competitionId;
    footballApi.get(`/competitions/${competitionId}/standings`)
      .then(response => {
        setCurrentTable(response.data.standings[0].table)
        setStandings(response.data.standings)
        setCompetitionName(response.data.competition.name)
      })
  }, []);


  return (
    <>
      <div>
        <h1>{competitionName}</h1>
        <Button onClick={() => props.history.push(`/fixtures/${competitionId}`)}  >Fixtures</Button>
        <Button onClick={() => props.history.push(`/topScorers/${competitionId}`)} >Top Scorers</Button>
        <br/>
        <Button className={classes.changeStandingsButton} onClick={() => onChangeStandingsTypeButtonClick("HOME")}>HOME</Button>
        <Button className={classes.changeStandingsButton} onClick={() => onChangeStandingsTypeButtonClick("AWAY")}>AWAY</Button>
        <Button className={classes.changeStandingsButton} onClick={() => onChangeStandingsTypeButtonClick("TOTAL")}>TOTAL</Button>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Team Name</TableCell>
                <TableCell align="right">Played</TableCell>
                <TableCell align="right">Last 5 games</TableCell>
                <TableCell align="right">W</TableCell>
                <TableCell align="right">D</TableCell>
                <TableCell align="right">L</TableCell>
                <TableCell align="right">GF</TableCell>
                <TableCell align="right">GA</TableCell>
                <TableCell align="right">PTS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentTable.map(row => (
                <TableRow key={row.name}>
                  <TableCell onClick={() => props.history.push(`/team/${row.team.id}`)} component="th" scope="row">
                    {row.team.name}
                  </TableCell>
                  <TableCell align="right">{row.playedGames}</TableCell>
                  <TableCell align="right">{row.form}</TableCell>
                  <TableCell align="right">{row.won}</TableCell>
                  <TableCell align="right">{row.draw}</TableCell>
                  <TableCell align="right">{row.lost}</TableCell>
                  <TableCell align="right">{row.goalsFor}</TableCell>
                  <TableCell align="right">{row.goalsAgainst}</TableCell>
                  <TableCell align="right">{row.points}</TableCell>
                </TableRow>
              ))}
              {currentTable.length === 0 && "Data not available"}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  )

};

export default Standings;
