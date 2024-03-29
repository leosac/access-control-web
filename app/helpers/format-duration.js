import { helper as buildHelper } from '@ember/component/helper';

export function formatDuration(params)
{
    let duration = params[0]; // assumed in seconds.
    let date = new Date(null);
    date.setSeconds(duration);
    return date.toISOString().substr(11, 8);
}

export default buildHelper(formatDuration);
