import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class NumberedPaginator extends Component {
    first = 0;
    last = 0;
    current = 0;

    // The action that is triggered when a user change page by clicking.
    onPageChange = () => {
    };

    constructor(owner, args) {
        super(owner, args);
        this.compute();
    }

    compute() {
        "use strict";

        this.first = this.args.first || 0;
        this.last = this.args.last || 0;
        this.current = this.args.current || 0;
        this.pages = this.args.pages || [];

        const safeAdd = (n) =>
        {
            if (this.pages.indexOf(n) === -1) {
                this.pages.push(n);
            }
        };

        // If we have more than 10 pages, we will not display
        // all page number. Rather we propose something else.
        if (this.last - this.first > 10)
        {
            let i = -1;
            while (++i < 5)
            {
                const next = this.current + i > this.last ? this.last : this.current + i;
                const prev = this.current - i < this.first ? this.first : this.current - i;

                safeAdd(this.first);
                safeAdd(prev);
                safeAdd(this.current);
                safeAdd(next);
                safeAdd(this.last);
            }
        }
        else
        {
            // Just present all page number.
            for (let i = this.first; i !== this.last; i++)
            {
                safeAdd(i);
            }
            safeAdd(this.last);
        }
        this.pages.sort(function (a, b)
        {
            return a - b;
        });
    }

    @action
    changePage(n) {
        "use strict";
        this.get('onPageChange')(Number(n));
    }
}
