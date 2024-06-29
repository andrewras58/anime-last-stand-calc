import unitData from "./data/data.json";
import techniqueData from "./data/techniques.json";
import effectData from "./data/effects.json";
import treeData from "./data/trees.json";
import gradesData from "./data/grades.json";
import { useState, useEffect } from "react";
import DropdownSelect from "./DropdownSelect";

const UnitStats = () => {
  const [unit, setUnit] = useState("");
  const [technique, setTechnique] = useState("");
  const [unitLevel, setUnitLevel] = useState(null);
  const [DPS, setDPS] = useState(null);
  const [tree, setTree] = useState("");
  const [damageGrade, setDamageGrade] = useState("");
  const [rangeGrade, setRangeGrade] = useState("");
  const [spaGrade, setSpaGrade] = useState("");
  const [unitStats, setUnitStats] = useState({
    'cost': null,
    'damage': null,
    'range': null,
    'spa': null,
    'effect': null,
    'money': null
  });
  const [DOT, setDOT] = useState({
    'damage': null,
    'duration': null
  });

  const changeUnit = (unitName) => {
    setUnit(unitName);
    setUnitLevel(0);
    setDOT({
      'damage': null,
      'duration': null
    });
    setDPS(null);
  }

  const convertNumToString = (num) => {
    return (Math.round(num*100)/100).toLocaleString();
  }

  const convertStringToNum = (str) => {
    return parseFloat(str.replace(/,/g,''));
  }

  // WHEN UNIT CHANGES, SET THE LEVEL TO 0

  useEffect(() => {
    const calcStat = (stat, statTable) => {
      if (statTable[stat]){
        let totalStat = convertStringToNum(statTable[stat]);

        if (stat==='damage' && damageGrade){totalStat *= gradesData['damage'][damageGrade]}
        if (stat==='range' && rangeGrade){totalStat *= gradesData['range'][rangeGrade]}
        if (stat==='spa' && spaGrade){totalStat *= gradesData['spa'][spaGrade]}

        if (tree && tree !== "none" && treeData[tree][stat]){
          totalStat *= treeData[tree][stat];
        }
        if (technique && technique !== "base" && techniqueData[technique][stat] !== null){
          totalStat *= techniqueData[technique][stat];
        }
        return convertNumToString(totalStat);
      }
      return null;
    }

    const calcDOT = (atk, effect, thisTechnique) => {
      if (!effect || !effectData[effect]['damage']){
        return null;
      }
      let dmg = effectData[effect]['damage'];
      let duration = effectData[effect]['duration'];
      let totalDOTDamage = convertStringToNum(atk)*dmg;

      if (thisTechnique){
        if (techniqueData[thisTechnique]['DOT']){totalDOTDamage *= techniqueData[thisTechnique]['DOT']}
        if (techniqueData[thisTechnique]['DOTDuration']){duration *= techniqueData[thisTechnique]['DOTDuration']}
      }
      
      return [totalDOTDamage, duration];
    }

    const calcDPS = (atk, spa, thisDOT) => {
      if (!atk){
        return null;
      }
      if (!thisDOT){
        return convertNumToString(convertStringToNum(atk) / spa);
      }
      let DOTDamage = thisDOT[0];
      let DOTDuration = thisDOT[1];
      return convertNumToString((convertStringToNum(atk) / spa) + (DOTDamage / DOTDuration));
    }

    if (unit){
      let currentUnitData = unitData[unit][unitLevel];
      let atk = calcStat('damage', currentUnitData);
      let money = calcStat('money', currentUnitData);
      let range = calcStat('range', currentUnitData);
      let spa = calcStat('spa', currentUnitData);
      let effect = currentUnitData['effect'];
      let cost = currentUnitData['cost'];
      let thisDOT = calcDOT(atk, effect, technique);
      setUnitStats({
        'cost': cost,
        'damage': atk,
        'range': range,
        'spa': spa,
        'effect': effect,
        'money': money
      });
      if (thisDOT){
        setDOT({
          'damage': thisDOT[0],
          'duration': thisDOT[1]
        });
      }
      setDPS(calcDPS(atk, spa, thisDOT));
    }
  }, [unit, unitLevel, technique, tree, damageGrade, rangeGrade, spaGrade]);

  return (
    <div className="unit-statistics">
      <div className="unit-selection">
        <DropdownSelect name="Units" value={unit} setValue={changeUnit} data={unitData} />
        <DropdownSelect name="Techniques" value={technique} setValue={setTechnique} data={techniqueData} />
        <DropdownSelect name="Trees" value={tree} setValue={setTree} data={treeData} />
        <DropdownSelect name="Damage Grade" value={damageGrade} setValue={setDamageGrade} data={gradesData['damage']} />
        <DropdownSelect name="Range Grade" value={rangeGrade} setValue={setRangeGrade} data={gradesData['range']} />
        <DropdownSelect name="SPA Grade" value={spaGrade} setValue={setSpaGrade} data={gradesData['spa']} />
      </div>
      <div className="result-container">
        <div className="left-column-stats">
          <span>Unit Stats:</span>
          {unitStats['damage'] && <p>ATK: {unitStats['damage']}</p>}
          {unitStats['money'] && <p>Money: {unitStats['money']}</p>}
          {unitStats['range'] && <p>Range: {unitStats['range']}</p>}
          {unitStats['spa'] && <p>SPA: {unitStats['spa']}</p>}
          {unitStats['effect'] && <p>Effect: {unitStats['effect']}</p>}
          {unitStats['cost'] && <p>Cost: {unitStats['cost']}</p>}
          {unitLevel!==null && <p>Upgrade Level: {unitLevel}</p>}
          {technique && <p>Technique: {technique}</p>}
          {DOT['damage'] && <p>DOT: {`${convertNumToString(DOT['damage'])} damage over ${DOT['duration']}s`}</p>}
          {DPS && <p>DPS: {DPS}</p>}
        </div>
        <div className="main-column">
          <div className="display">
            <button onClick={() => {unit && unitData[unit][unitLevel+1] && setUnitLevel(unitLevel+1)}}>Upgrade</button>
          </div>
        </div>
        {/* <div className="right-column-grades">
          <div className="right-grade" id="atk-grade">
            A+
          </div>
          <div className="right-grade" id="range-grade">
            B+
          </div>
          <div className="right-grade" id="spa-grade">
            C+
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default UnitStats