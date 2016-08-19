import Ember from 'ember';

export default Ember.Component.extend({
    first: 0,
    last: 0,
    current: 0,
    pages: [],
    // The action that is triggered when a user change page by clicking.
    onPageChange: (n) =>
    {
        n = n;
    },
    didUpdateAttrs() {
        "use strict";
        this._super();
        this.compute();
    },
    compute()
    {
        "use strict";

        const first = this.get('first') || 0;
        const last = this.get('last') || 0;
        const current = this.get('current') || 0;
        this.set('pages', []);
        const pages = this.get('pages');

        const safeAdd = (n) =>
        {
            if (pages.indexOf(n) === -1)
                pages.push(n);
        };

        // If we have more than 10 pages, we will not display
        // all page number. Rather we propose something else.
        if (last - first > 10)
        {
            for (let i = 0; i < 50; i += 10)
            {
                const next = current + i > last ? last : current + i;
                const prev = current - i < first ? first : current - i;

                safeAdd(first);
                safeAdd(prev);
                safeAdd(current);
                safeAdd(next);
                safeAdd(last);
            }
        }
        else
        {
            // Just present all page number.
            for (let i = first; i !== last; i++)
            {
                safeAdd(i);
            }
            safeAdd(last);
        }
        pages.sort(function (a, b)
        {
            return a - b;
        });
    },
    init()
    {
        "use strict";
        this._super();
        this.compute();
    },
    actions: {
        changePage(n)
        {
            "use strict";
            this.get('onPageChange')(Number(n));
        }
    }
});
