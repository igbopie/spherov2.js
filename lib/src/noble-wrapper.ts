import * as noble from 'noble';
// export const Peripheral = noble.Peripheral;
// export default noble;
// import * as nobleMac from 'noble-mac';
// export const Peripheral = nobleMac.Peripheral;
// export default nobleMac;

// @ts-ignore
import * as myNoble from './noble';
export const Peripheral = noble.Peripheral;
export default myNoble;
