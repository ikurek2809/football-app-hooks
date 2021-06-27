import React, {useState, useEffect} from 'react';


import footballApi from "../../api/footballApi";
import TopScorerAccordion from "../../components/TopScorerAccordion";
import Spinner from "../../components/Spinner";


const TopScorers = (props) => {

  const [scorersData, setScorersData] = useState({scorers: []});

  useEffect(() => {
    const competitionId = props.match.params.competitionId;
    footballApi.get(`/competitions/${competitionId}/scorers`)
      .then(response => {
        setScorersData(response.data)
      })
  }, []);


  return (
    <div>
      {scorersData.scorers.length === 0
      ? <Spinner/>
      :
      <TopScorerAccordion title={scorersData.competition.name} scorers={scorersData.scorers}/>}
    </div>
  )
}

export default TopScorers;
