import fs from 'fs';
import util from 'util';

export const readdir = util.promisify(fs.readdir);