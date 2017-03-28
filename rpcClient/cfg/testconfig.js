var config = {};

config.rpcServer = {};
config.rpcServer.host = '10.2.2.100';
config.rpcServer.port = 9200;


// change for local VistA
config.robertSSN = '000000029';
config.robertName = "ALEXANDER,ROBERT";
config.robertIEN = '61';
config.robertAccess = 'fakedoc1';
config.robertVerify = '1Doc!@#$';


config.marySSN = '000000030';
config.maryName = "SMITH,MARY";
config.maryIEN = '62';
config.maryAccess = 'fakenurse1';
config.maryVerify = '1Nur!@#$';

config.patientId = '3';

config.diabetes = { 
    '1': 'GMPFLD(.01)="521774^R69."',
    '2': 'GMPFLD(.03)="0^"',
    '3': 'GMPFLD(.05)="^Diabetes mellitus"',
    '4': 'GMPFLD(.08)="3170316"',
    '5': 'GMPFLD(.12)="A^ACTIVE"',
    '6': 'GMPFLD(.13)="^"',
    '7': 'GMPFLD(1.01)="7130783^"',
    '8': 'GMPFLD(1.02)="P"',
    '9': 'GMPFLD(1.03)="62^Alexander,Robert"',
    '10': 'GMPFLD(1.04)="62^Alexander,Robert"',
    '11': 'GMPFLD(1.05)="62^Alexander,Robert"',
    '12': 'GMPFLD(1.06)="^"',
    '13': 'GMPFLD(1.07)="^"',
    '14': 'GMPFLD(1.08)="8^Clinicd"',
    '15': 'GMPFLD(1.09)="3170316"',
    '16': 'GMPFLD(1.1)="^Unknown"',
    '17': 'GMPFLD(1.11)="0^NO"',
    '18': 'GMPFLD(1.12)="0^NO"',
    '19': 'GMPFLD(1.13)="0^NO"',
    '20': 'GMPFLD(1.14)="@^"',
    '21': 'GMPFLD(1.15)="0^NO"',
    '22': 'GMPFLD(1.16)="0^NO"',
    '23': 'GMPFLD(1.17)="0^NO"',
    '24': 'GMPFLD(1.18)="0^NO"',
    '25': 'GMPFLD(80001)="73211009"',
    '26': 'GMPFLD(80002)="121589010"',
    '27': 'GMPFLD(80101)="^"',
    '28': 'GMPFLD(80102)="^"',
    '29': 'GMPFLD(80201)="3170316"',
    '30': 'GMPFLD(80202)="10D^ICD-10-CM"',
    '31': 'GMPFLD(10,0)="0"' 
};

try {
    module.exports = config;
}
catch(exception) {
    //will fail in browser - config is referenced by browser client for convenience
}

