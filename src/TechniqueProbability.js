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

const TechniqueProbability = ({rerolls, techniques}) => {
  return ( 
    <div className="probability-output">
      {rerolls && techniques && (
        <p>{rerolls}</p>
      )}
    </div>
  );
}
 
export default TechniqueProbability;