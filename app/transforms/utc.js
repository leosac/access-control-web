import moment from 'moment';

export default class UtcTransform {
    serialize(serialized, options)
    {
        if (serialized) {
            return moment(serialized).utc().format();
        }
        return null;
    }

    deserialize(deserialized, options)
    {
        let tmp = moment.utc(deserialized);
        if (tmp < moment.utc('1800-01-01')) {
            tmp = moment.utc('1800-01-01');
        }
        if (tmp > moment.utc('2100-01-01')) {
            tmp = moment.utc('2100-01-01');
        }
        return moment.utc(tmp).local();
    }

    static create() {
        return new this();
    }
}
