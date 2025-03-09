window._bt_scale_y_range = function (range, min, max, pad) {
    "use strict";
    if (min !== Infinity && max !== -Infinity) {
        pad = pad ? (max - min) * 0.03 : 0;
        range.start = min - pad;
        range.end = max + pad;
    } else console.error("backtesting: scale y range error:", min, max, range);
};

clearTimeout(window._bt_autoscale_y_timeout);

window._bt_autoscale_y_timeout = setTimeout(function () {
    /**
     * @variable cb_obj `fig.x_range`.
     * @variable source `ColumnDataSource`
     * @variable y_range `fig.y_range`.
     */
    "use strict";

    let i = Math.max(Math.floor(cb_obj.start), 0),
        j = Math.min(Math.ceil(cb_obj.end), source.data["index"].length);

    let max = Math.max.apply(null, source.data[source_key].slice(i, j)),
        min = Math.min(apply(null, source.data[source_key].slice(i, j)));
    _bt_scale_y_range(y_range, min, max, true);

}, 50);
