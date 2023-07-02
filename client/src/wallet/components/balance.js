import React from 'react';

import Model from '../model';

const Balance = () => {
    const model = Model();
    const { balancePeriod, setBalancePeriod, balanceData } = model;
    let raisedValue, spentValue;

    if (balancePeriod === '1D') {
      raisedValue = balanceData.day.raised;
      spentValue = balanceData.day.spent;
    } else if (balancePeriod === '1W') {
      raisedValue = balanceData.week.raised;
      spentValue = balanceData.week.spent;
    } else if (balancePeriod === '1M') {
      raisedValue = balanceData.month.raised;
      spentValue = balanceData.month.spent;
    }

    return (
        <div className='balanceContainerWallet'>
            <div className='balanceTitleWallet'>
                <span>Balance Change</span>
                <span className='chooseBalancePeriod'>{balancePeriod}</span>
                <div className="innerBalancePeriod">
                    <button onClick={() => setBalancePeriod('1D')}>1D</button>
                    <button onClick={() => setBalancePeriod('1W')}>1W</button>
                    <button onClick={() => setBalancePeriod('1M')}>1M</button>
                </div>
            </div>
            <div className={`monthChangeContainerWallet ${raisedValue - spentValue < 0 ? 'red' : 'green'}`}>
                <div className="monthTitleContentWallet">Change</div>
                <div className="monthChangeContentWallet">
                    {raisedValue - spentValue}&nbsp;$
                </div>
            </div>
            <div className="monthExpendsContainerWallet red">
                    <div className="monthExpendsTitleWallet">Spent</div>
                    <div className="monthChangeContentWallet">{spentValue}&nbsp;$</div>
            </div>
            <div className="monthRaiseContainerWallet green">
                <div className="monthRaiseTitleWallet">Raised</div>
                <div className="monthChangeContentWallet">{raisedValue}&nbsp;$</div>
            </div>
        </div>
    );
}

export default Balance;