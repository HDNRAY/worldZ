import { Component } from 'react';
// import PropTypes from 'prop-types';
import style from './spendable.less';
import Item from '../../shared/item/item';
import itemStyle from '../../shared/item/item.less'
import ImmmutablePropTypes from 'react-immutable-proptypes';
import { menuTypes } from '../../../services/constant/menu'
import { is } from 'immutable';
import { qualities } from '../../../services/constant/item';

class Spendable extends Component {

    shouldComponentUpdate(nextProps) {
        return !is(this.props.spendable, nextProps.spendable)
    }

    render() {
        const { spendable } = this.props;
        const { name, quantity, quality, description } = spendable.toJS();

        const display = `${name}${!!quantity ? ('\(' + quantity + '\)') : ''}`;

        const qualityStyle = itemStyle[qualities.find(q => q.value === quality).className];

        const actions = [{
            name: '使用',
            action: () => {
                console.log('used')
                if (!!quantity) console.log('spended')
            }
        }, {
            name: '丢弃',
            confirm: '确认丢弃吗',
            type: menuTypes.CONFIRM,
            action: () => {
                console.log('deleted')
            }
        }]
        // const actions = []

        const tips = (<div className={style.tips}>
            <div className={qualityStyle + ' ' + style.name}>{display}</div>
            <div className={style.quantity}>
                数量 {quantity}
            </div>
            <div className={style.description}>
                {description}
            </div>
        </div>)

        return (
            <Item name={name}
                tips={tips}
                quality={quality}
                operations={actions} />
        )
    }
}


Spendable.propTypes = {
    spendable: ImmmutablePropTypes.map,
}


export default Spendable;