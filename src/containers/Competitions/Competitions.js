import React, {useState, useEffect} from 'react';

import ListItem from "@material-ui/core/ListItem/index";
import List from "@material-ui/core/List/index";
import ListItemText from "@material-ui/core/ListItemText/index";
import {Link} from "react-router-dom";

import footballApi from "../../api/footballApi";

import classes from "./Competitions.module.css";


const Competitions = () => {

  const [competitions, setCompetitions] = useState([]);

  useEffect(() => {
    footballApi.get('/competitions')
      .then(response => {
        setCompetitions(response.data.competitions.filter(competition => competition.plan === "TIER_ONE"))
      })
  }, []);

  return (
    <>
      <div>
        <List component="nav" aria-label="secondary mailbox folders">
          {competitions.map(competition => (
            <ListItem button>
              <Link className={classes.ListItemLink} to={`standings/${competition.code}`}>
                <ListItemText primary={competition.name}/>
              </Link>
            </ListItem>
          ))}
        </List>
      </div>
    </>
  )
}

export default Competitions;
