import DS from 'ember-data';

export default DS.Transform.extend({
    deserialize(serialized) {
        if (serialized === 'SIMPLE_WIEGAND')
            return 'wiegand-mode.simple';
        else if (serialized === 'WIEGAND_PIN_4BITS')
            return 'wiegand-mode.pin_4';
        else if (serialized === 'WIEGAND_PIN_8BITS')
            return 'wiegand-mode.pin_8';
        else if (serialized === 'WIEGAND_PIN_BUFFERED')
            return 'wiegand-mode.pin_buffered';
        else if (serialized === 'WIEGAND_CARD_PIN_4BITS')
            return 'wiegand-mode.card_4';
        else if (serialized === 'WIEGAND_CARD_PIN_8BITS')
            return 'wiegand-mode.card_8';
        else if (serialized === 'WIEGAND_CARD_PIN_BUFFERED')
            return 'wiegand-mode.card_buffered';
        else if (serialized === 'AUTODETECT')
            return 'wiegand-mode.autodetect';
    },
    serialize(serialized) {
        if (serialized === 'wiegand-mode.simple')
            return "SIMPLE_WIEGAND";
        else if (serialized === 'wiegand-mode.pin_4')
            return "WIEGAND_PIN_4BITS";
        else if (serialized === 'wiegand-mode.pin_8')
            return "WIEGAND_PIN_8BITS";
        else if (serialized === 'wiegand-mode.pin_buffered')
            return "WIEGAND_PIN_BUFFERED";
        else if (serialized === 'wiegand-mode.card_4')
            return "WIEGAND_CARD_PIN_4BITS";
        else if (serialized === 'wiegand-mode.card_8')
            return "WIEGAND_CARD_PIN_8BITS";
        else if (serialized === 'wiegand-mode.card_buffered')
            return "WIEGAND_CARD_PIN_BUFFERED";
        else
            return "AUTODETECT";
    }
});
