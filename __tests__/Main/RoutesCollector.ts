jest.mock('fs');
import fs from 'fs';

test('test', async function(){
    expect(fs.readdir('/213', null, () => {})).toBe('124');
});