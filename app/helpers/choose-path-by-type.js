import Ember from 'ember';

export function choosePathByType(params/*, hash*/) {
    if (params[0] === 'typeUser')
    {
        return 'profile';
    }
    else if (params[0] === 'typeGroup')
    {
        return 'group';
    }
    else if (params[0] === 'typeZone')
    {
        return 'zone';
    }
    else if (params[0] === 'typeDoor')
    {
        return 'door';
    }
    else if (params[0] === 'typeSchedule')
    {
        return 'schedule';
    }
    else if (params[0] === 'typePinCode')
    {
        return 'credentials.pin-code';
    }
    else if (params[0] === 'typeRfidCard')
    {
        return 'credentials.rfid-card';
    }
    else if (params[0] === 'piface-digital-gpio')
    {
        return 'piface-digital-gpio.piface-digital-gpio';
    }
    else if (params[0] === 'wiegand-reader')
    {
        return 'wiegand-reader';
    }
    else if (params[0] === 'buzzer')
    {
        return 'led-buzzer.buzzer';
    }
    else if (params[0] === 'led')
    {
        return 'led-buzzer.led';
    }
}

export default Ember.Helper.helper(choosePathByType);
