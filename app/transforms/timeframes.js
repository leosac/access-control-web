function clone(obj)
{
    if (obj === null || "object" !== typeof obj) {
        return obj;
    }
    let copy = obj.constructor();
    for (let attr in obj)
    {
        if (obj.hasOwnProperty(attr)) {
            copy[attr] = clone(obj[attr]);
        }
    }
    return copy;
}

/**
 * This is a transform for an array of SingleTimeFrame.
 *
 * SingleTimeFrame are a Leosac C++ structure.
 */
export default class TimeframesTransform {
    deserialize(serialized, options) {
        // Remember, a single timeframe from the server can only be bound to 1 day.
        // We need to merge timeframe together.
        const output = [];
        const findSameTimeframe = (startTime, endTime) =>
        {
            let found;
            output.forEach((tf) =>
            {
                if (tf.startTime === startTime && tf.endTime === endTime)
                {
                    found = tf;
                    return tf;
                }
            });
            return found;
        };

        if (serialized && Array.isArray(serialized))
        {
            let count = 0;
            serialized.forEach((tf) =>
            {
                let editedTimeframe = findSameTimeframe(tf['start-time'], tf['end-time']);
                if (!editedTimeframe)
                {
                    editedTimeframe = {
                        id: count++,
                        startTime: tf['start-time'],
                        endTime: tf['end-time']
                    };
                    output.push(editedTimeframe);
                }

                // Mark the current tf (`tf`)'s day as an enabled day.
                if (tf.day === 0) {
                    editedTimeframe.enabledOnMonday = true;
                }
                if (tf.day === 1) {
                    editedTimeframe.enabledOnTuesday = true;
                }
                if (tf.day === 2) {
                    editedTimeframe.enabledOnWednesday = true;
                }
                if (tf.day === 3) {
                    editedTimeframe.enabledOnThursday = true;
                }
                if (tf.day === 4) {
                    editedTimeframe.enabledOnFriday = true;
                }
                if (tf.day === 5) {
                    editedTimeframe.enabledOnSaturday = true;
                }
                if (tf.day === 6) {
                    editedTimeframe.enabledOnSunday = true;
                }
            });
        }
        return output;
    }

    serialize(deserialized, options) {
        if (!deserialized || deserialized.length === 0) {
            return null;
        }

        // We need to add create a JSON object that looks like a
        // Leosac's SingleTimeFrame.
        // A timeframe that is not enabled on any day is discarded.
        const output = [];
        deserialized.forEach((tf) =>
        {
            const leosacTimeFrame = {};

            if (tf.startTime) {
                if (typeof tf.startTime !== 'string') {
                    leosacTimeFrame['start-time'] = tf.startTime.format('H:mm');
                } else {
                    leosacTimeFrame['start-time'] = tf.startTime;
                }
            } else {
                leosacTimeFrame['start-time'] = '00:00';
            }

            if (tf.endTime) {
                if (typeof tf.endTime !== 'string') {
                    leosacTimeFrame['end-time'] = tf.endTime.format('H:mm');
                } else {
                    leosacTimeFrame['end-time'] = tf.endTime;
                }
            } else {
                leosacTimeFrame['end-time'] = '23:59';
            }

            if (tf.enabledOnMonday)
            {
                leosacTimeFrame.day = 0;
                output.push(clone(leosacTimeFrame));
            }
            if (tf.enabledOnTuesday)
            {
                leosacTimeFrame.day = 1;
                output.push(clone(leosacTimeFrame));
            }
            if (tf.enabledOnWednesday)
            {
                leosacTimeFrame.day = 2;
                output.push(clone(leosacTimeFrame));
            }
            if (tf.enabledOnThursday)
            {
                leosacTimeFrame.day = 3;
                output.push(clone(leosacTimeFrame));
            }
            if (tf.enabledOnFriday)
            {
                leosacTimeFrame.day = 4;
                output.push(clone(leosacTimeFrame));
            }
            if (tf.enabledOnSaturday)
            {
                leosacTimeFrame.day = 5;
                output.push(clone(leosacTimeFrame));
            }
            if (tf.enabledOnSunday)
            {
                leosacTimeFrame.day = 6;
                output.push(clone(leosacTimeFrame));
            }
        });

        return output.length ? output : null;
    }

    static create() {
        return new this();
    }
}
