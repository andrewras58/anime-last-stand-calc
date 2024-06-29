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
  const [totalCost, setTotalCost] = useState(null);
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
  const [crit, setCrit] = useState({
    'critRate': 0,
    'critDamage': 0
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

    const getCrit = () => {
      let critRate = 0;
      let critDamage = 0;
      if (technique && technique !== "base"){
        if (techniqueData[technique]['critRate'] !== null){
          critRate += techniqueData[technique]['critRate'];
        }
        if (techniqueData[technique]['critRate'] !== null){
          critDamage += techniqueData[technique]['critDamage'];
        }
      }
      if (tree && tree !== "none"){
        if (treeData[tree]['critRate'] !== null){
          critRate += treeData[tree]['critRate'];
        }
        if (treeData[tree]['critRate'] !== null){
          critDamage += treeData[tree]['critDamage'];
        }
      }
      return [critDamage, critRate];
    }

    const calcDPS = (atk, spa, thisDOT, critDamage, critRate) => {
      if (!atk){
        return null;
      }
      let baseDamage = convertStringToNum(atk) / spa;
      let damageWithCrits = baseDamage * (1 + critRate * critDamage);
      if (!thisDOT){
        return convertNumToString(damageWithCrits);
      }
      let [DOTDamage, DOTDuration] = thisDOT;
      return convertNumToString(damageWithCrits + (DOTDamage / DOTDuration));
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
      let [critDamage, critRate] = getCrit();

      let thisTotalCost = 0;
      for (let i=0; i<unitLevel+1; i++){
        thisTotalCost += convertStringToNum(unitData[unit][i.toString()]['cost']);
      }
      setTotalCost(convertNumToString(thisTotalCost));
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
      setCrit({
        'critDamage': critDamage,
        'critRate': critRate
      });
      setDPS(calcDPS(atk, spa, thisDOT, critDamage, critRate));
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
          {unitStats['cost'] && <p>Current Cost: ${unitStats['cost']}</p>}
          {totalCost && <p>Cumulative Cost: ${totalCost}</p>}
          {unitLevel!==null && <p>Upgrade Level: {unitLevel}</p>}
          {technique && <p>Technique: {technique}</p>}
          {crit && <p>Crit: {`${convertNumToString(crit['critDamage']*100)}% damage at ${convertNumToString(crit['critRate']*100)}% rate`}</p>}
          {DOT['damage'] && <p>DOT: {`${convertNumToString(DOT['damage'])} damage over ${DOT['duration']}s`}</p>}
          {DPS && <p>AVG DPS: {DPS}</p>}
        </div>
        <div className="main-column">
          <div className="display">
            {unit && <img src={`${process.env.PUBLIC_URL}/img/${unit}.webp`} alt={`${unit}`} />}
            <button onClick={() => {unit && unitData[unit][unitLevel+1] && setUnitLevel(unitLevel+1)}}>Upgrade</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnitStats