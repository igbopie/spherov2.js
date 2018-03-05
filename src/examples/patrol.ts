import { Toy } from "../toy";
import { wait } from "../utils";

const PATROL_TIME: number = 2000;
const WAIT_TIME: number = 2000;
const SPEED: number = 100;
export default async (toy: Toy) => {
  while(true) {
    await toy.rollTime(SPEED, 270, PATROL_TIME, []);
    await wait(WAIT_TIME);
    await toy.rollTime(SPEED, 0, PATROL_TIME, []);
    await wait(WAIT_TIME);
    await toy.rollTime(SPEED, 90, PATROL_TIME, []);
    await wait(WAIT_TIME);
    await toy.rollTime(SPEED, 180, PATROL_TIME, []);
    await wait(WAIT_TIME);
  }
};
