import accelerate from './images/techniques/accelerate.bmp';
import allSeeing from './images/techniques/all seeing.bmp';
import avatar from './images/techniques/avatar.bmp';
import cosmic from './images/techniques/cosmic.bmp';
import demigod from './images/techniques/demigod.bmp';
import diamond from './images/techniques/diamond.bmp';
import eagleEye from './images/techniques/eagle eye.bmp';
import elementalMaster from './images/techniques/elemental master.bmp';
import entrepreneur from './images/techniques/entrepreneur.bmp';
import glitched from './images/techniques/glitched.bmp';
import golden from './images/techniques/golden.bmp';
import hyperSpeed from './images/techniques/hyper speed.bmp';
import juggernaut from './images/techniques/juggernaut.bmp';
import overlord from './images/techniques/overlord.bmp';
import scoped from './images/techniques/scoped.bmp';
import shinigami from './images/techniques/shinigami.bmp';
import shining from './images/techniques/shining.bmp';
import sturdy from './images/techniques/sturdy.bmp';
import vulture from './images/techniques/vulture.bmp';

const TechniqueSelector = ({techniques, setTechniques}) => {

  const toggleButton = (e) => {
    let tempTeq = structuredClone(techniques);
    tempTeq[e.target.alt] = !tempTeq[e.target.alt];
    setTechniques(tempTeq);
    tempTeq[e.target.alt] ? e.currentTarget.style.backgroundColor="green" : e.currentTarget.style.backgroundColor="red";
  }

  return ( 
    <div className="technique-input">
      <button onClick={toggleButton}><img src={scoped} alt="scoped"/></button>
      <button onClick={toggleButton}><img src={accelerate} alt="accelerate"/></button>
      <button onClick={toggleButton}><img src={sturdy} alt="sturdy"/></button>
      <button onClick={toggleButton}><img src={shining} alt="shining"/></button>
      <button onClick={toggleButton}><img src={eagleEye} alt="eagleEye"/></button>
      <button onClick={toggleButton}><img src={golden} alt="golden"/></button>
      <button onClick={toggleButton}><img src={hyperSpeed} alt="hyperSpeed"/></button>
      <button onClick={toggleButton}><img src={juggernaut} alt="juggernaut"/></button>
      <button onClick={toggleButton}><img src={elementalMaster} alt="elementalMaster"/></button>
      <button onClick={toggleButton}><img src={vulture} alt="vulture"/></button>
      <button onClick={toggleButton}><img src={diamond} alt="diamond"/></button>
      <button onClick={toggleButton}><img src={cosmic} alt="cosmic"/></button>
      <button onClick={toggleButton}><img src={demigod} alt="demigod"/></button>
      <button onClick={toggleButton}><img src={allSeeing} alt="allSeeing"/></button>
      <button onClick={toggleButton}><img src={entrepreneur} alt="entrepreneur"/></button>
      <button onClick={toggleButton}><img src={shinigami} alt="shinigami"/></button>
      <button onClick={toggleButton}><img src={overlord} alt="overlord"/></button>
      <button onClick={toggleButton}><img src={avatar} alt="avatar"/></button>
      <button onClick={toggleButton}><img src={glitched} alt="glitched"/></button>
    </div>
  );
}
 
export default TechniqueSelector;