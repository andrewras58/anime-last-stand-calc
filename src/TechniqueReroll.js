import { useState, useEffect } from "react";
import TechniqueSelector from "./TechniqueSelector";
import TechniqueProbability from "./TechniqueProbability";

const TechniqueReroll = () => {
  const [techniques, setTechniques] = useState({
    'scoped': false,
    'accelerate': false,
    'sturdy': false,
    'shining': false,
    'eagleEye': false,
    'golden': false,
    'hyperSpeed': false,
    'juggernaut': false,
    'elementalMaster': false,
    'vulture': false,
    'diamond': false,
    'cosmic': false,
    'demigod': false,
    'allSeeing': false,
    'entrepreneur': false,
    'shinigami': false,
    'overlord': false,
    'avatar': false,
    'glitched': false
  });
  const [rerolls, setRerolls] = useState(null);

  useEffect(() => {
    console.log(techniques);
  }, [techniques])

  return ( 
    <div className="technique-reroll">
      <TechniqueSelector techniques={techniques} setTechniques={setTechniques} />
      <input type="number" onChange={(e) => setRerolls(e.target.value)}/>
      <TechniqueProbability rerolls={rerolls} techniques={techniques}/>
    </div>
  );
}
 
export default TechniqueReroll;