import DS from 'ember-data';
import moment from 'moment';

export default DS.Transform.extend({
    serialize: function (value)
    {
        if (value)
            return moment(value).utc().format();
        return null;
    },

    deserialize: function (value)
    {
        let tmp = moment.utc(value);
        if (tmp < moment.utc('1800-01-01'))
            tmp = moment.utc('1800-01-01');
        if (tmp > moment.utc('2100-01-01'))
            tmp = moment.utc('2100-01-01');
        return moment.utc(tmp).local();
    }
});
