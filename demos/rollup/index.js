import { logA } from './lib'
import { version } from './package.json';

logA()

export default function () {
  console.log('version ' + version);
}