import { useEffect, useState } from "react";
import Statistics from "statistics.js";

const probabilities = {
  'scoped': 0.26,
  'accelerate': 0.21,
  'sturdy': 0.21,
  'shining': 0.09,
  'eagleEye': 0.04,
  'golden': 0.035,
  'hyperSpeed': 0.03,
  'juggernaut': 0.03,
  'elementalMaster': 0.02,
  'vulture': 0.0225,
  'diamond': 0.0175,
  'cosmic': 0.01,
  'demigod': 0.01,
  'allSeeing': 0.0035,
  'entrepreneur': 0.003,
  'shinigami': 0.002,
  'overlord': 0.002,
  'avatar': 0.001,
  'glitched': 0.0003
};

const calcProbability = (rerolls, techniques, probabilities) => {
  if (rerolls && rerolls !== "0"){
    let cumProb = 0;
    Object.keys(techniques).forEach( (key) => { 
      techniques[key] && (cumProb += probabilities[key]);
      cumProb = Math.round(cumProb*1000000) / 1000000;
    });
    let x = new Statistics({});
    return Math.round(x.binomialDistribution(parseInt(rerolls), cumProb).slice(1).reduce((a,b)=>a+b) * 100000) / 1000;
  }
}

const TechniqueProbability = ({rerolls, techniques}) => {
  const [probability, setProbability] = useState(null);
  useEffect(() => {
    setProbability(calcProbability(rerolls, techniques, probabilities));
  }, [rerolls, techniques])

  return ( 
    <div className="probability-output">
      {probability && (
        <p>{probability}%</p>
      )}
    </div>
  );
}
 
export default TechniqueProbability;