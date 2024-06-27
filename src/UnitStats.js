import unitData from "./data/data.json";
import techniqueData from "./data/techniques.json";
//import effectData from "./data/effects.json";
import { useState, useEffect } from "react";

const UnitStats = () => {
  const [unitStats, setUnitStats] = useState({
    'cost': null,
    'damage': null,
    'range': null,
    'spa': null,
    'effect': null,
    'money': null
  });
  const [unit, setUnit] = useState("");
  const [technique, setTechnique] = useState("");
  const [unitLevel, setUnitLevel] = useState(0);
  const [totalCost, setTotalCost] = useState({
    'cost': 0,
    'level': 0
  });

  // WHEN UNIT CHANGES, SET THE LEVEL TO 0

  useEffect(() => {
    const calcStat = (stat, statTable) => {
      if (statTable[stat]){
        let totalStat = parseFloat(statTable[stat].replace(/,/g,''));
        if (technique && technique !== "base" && techniqueData[technique][stat] !== null){
          totalStat *= techniqueData[technique][stat];
        }
        return (Math.round(totalStat*100)/100).toLocaleString();
      }
      return null;
    }
    if (unit){
      let currentUnitData = unitData[unit][unitLevel];
      let atk = calcStat('damage', currentUnitData);
      let money = calcStat('money', currentUnitData);
      let range = calcStat('range', currentUnitData);
      let spa = calcStat('spa', currentUnitData);
      let effect = currentUnitData['effect'];
      let cost = unitLevel > 0 && unitLevel !== totalCost['level'] ? totalCost + currentUnitData['cost'] : currentUnitData['cost'];
      setUnitStats({
        'cost': cost,
        'damage': atk,
        'range': range,
        'spa': spa,
        'effect': effect,
        'money': money
      });
      setTotalCost({
        'cost': cost,
        'level': unitLevel
      })
    }
  }, [unit, unitLevel, technique, totalCost]);

  return (
    <div className="unit-statistics">
      <div className="unit-selection">
      <select name="units" id="units" value={unit} onChange={e => setUnit(e.target.value)}>
        { Object.keys(unitData).map((name, i) => <option value={name} key={i}>{name}</option>) }
      </select>
      <select name="techniques" id="techniques" value={technique} onChange={e => setTechnique(e.target.value)}>
        { Object.keys(techniqueData).map((name, i) => <option value={name} key={i}>{name}</option>) }
      </select>
      </div>
      <div className="result-container">
        <div className="left-column-stats">
          {unitStats['damage'] && <p>ATK: {unitStats['damage']}</p>}
          {unitStats['money'] && <p>Money: {unitStats['money']}</p>}
          {unitStats['range'] && <p>Range: {unitStats['range']}</p>}
          {unitStats['spa'] && <p>SPA: {unitStats['spa']}</p>}
          {unitStats['effect'] && <p>Effect: {unitStats['effect']}</p>}
          {unitStats['cost'] && <p>Total Cost: {unitStats['cost']}</p>}
          {unitLevel && <p>Upgrade Level: {unitLevel}</p>}
          {<p>Technique: {technique}</p>}
        </div>
        <div className="main-column">
          <div className="display">
            MAGIC
            <button onClick={() => {unit && unitData[unit][unitLevel+1] && setUnitLevel(unitLevel+1)}}>Upgrade</button>
          </div>
          <div className="kill-calc">
            KILL CALC
          </div>
        </div>
        <div className="right-column-grades">
          <div className="right-grade" id="atk-grade">
            A+
          </div>
          <div className="right-grade" id="range-grade">
            B+
          </div>
          <div className="right-grade" id="spa-grade">
            C+
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnitStats