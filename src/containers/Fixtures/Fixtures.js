import React, {useEffect, useState} from 'react';


import footballApi from "../../api/footballApi";
import Matches from "../../components/Matches";
import Spinner from "../../components/Spinner";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";


const Fixtures = (props) => {

  const [matches, setMatches] = useState([])
  const [selectedMatchday, setSelectedMatchday] = useState()
  const [matchdays, setMatchdays] = useState([])
  const [filteredMatches, setFilteredMatches] = useState([])



  useEffect(() => {
    const competitionId = props.match.params.competitionId;
    footballApi.get(`/competitions/${competitionId}/matches`)
      .then(response => {
        const matchDaysWithDuplicates = response.data.matches.map(match => match.matchday).flat();
        const matchdaysSet = new Set(matchDaysWithDuplicates);
        const matchdays = [...matchdaysSet];
        const filteredMatches = response.data.matches.filter(match => match.matchday === response.data.matches[0].season.currentMatchday);
        setMatches(response.data.matches)
        setMatchdays(matchdays)
        setFilteredMatches(filteredMatches)
        setSelectedMatchday(response.data.matches[0].season.currentMatchday)
        console.log("current",response.data.matches[0].season.currentMatchday)
      })
  }, []);

   const onSelectedMatchdayChange = (e) => {
     const filteredMatches = matches.filter(match => match.matchday === e.target.value);
     setSelectedMatchday(e.target.value);
     setFilteredMatches(filteredMatches);
  };

  const onPlusMatchdayButton = () => {
    const newMatchday = selectedMatchday + 1
    const filteredMatches = matches.filter(match => match.matchday === newMatchday);
    setSelectedMatchday(newMatchday)
    setFilteredMatches(filteredMatches)
  }

  const onMinusMatchdayButton = () => {
    const newMatchday = selectedMatchday - 1
    const filteredMatches = matches.filter(match => match.matchday === newMatchday);
    setSelectedMatchday(newMatchday)
    setFilteredMatches(filteredMatches)
  }


  return (
    <>
      <div>
        {filteredMatches.length === 0
          ? <Spinner/>
          :
          <>
            <FormControl>
              Matchday:
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedMatchday}
                onChange={e => onSelectedMatchdayChange(e)}
              >

                {matchdays.map(matchday => (
                  <MenuItem value={matchday}>{matchday}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <br/>
            <Button onClick={onMinusMatchdayButton}>&lt;</Button>
            <Button onClick={onPlusMatchdayButton}>&gt;</Button>
            <Matches history={props.history} matches={filteredMatches} />
          </>
        }
      </div>
    </>
  )

};

export default Fixtures;
