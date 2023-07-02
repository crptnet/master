import React, { useEffect, useRef } from 'react';

let tvScriptLoadingPromise;

const Chart = () => {
    const onLoadScriptRef = useRef();
    useEffect( () => {
        onLoadScriptRef.current = createWidget;

        if (!tvScriptLoadingPromise) {
            tvScriptLoadingPromise = new Promise((resolve) => {
            const script = document.createElement('script');
            script.id = 'tradingview-widget-loading-script';
            script.src = 'https://s3.tradingview.com/tv.js';
            script.type = 'text/javascript';
            script.onload = resolve;

            document.head.appendChild(script);
            });
        }

        tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

        return () => onLoadScriptRef.current = null;

        function createWidget() {
            if (document.getElementById('tradingview_d4221') && 'TradingView' in window) {
            new window.TradingView.widget({
                autosize: true,
                symbol: "BTCUSDT",
                timezone: "Etc/UTC",
                theme: "dark",
                style: "1",
                locale: "in",
                toolbar_bg: "#f1f3f6",
                enable_publishing: false,
                withdateranges: true,
                range: "1M",
                hide_side_toolbar: false,
                allow_symbol_change: true,
                show_popup_button: true,
                popup_width: "1980",
                popup_height: "1080",
                container_id: "tradingview_d4221"
            });
            }
        }
    },[]);
    return (
            <div className='tradingview-widget-container'>
                <div id='tradingview_d4221' />
            </div>
    );
}

export default Chart;