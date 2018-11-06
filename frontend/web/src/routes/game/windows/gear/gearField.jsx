import { Component } from 'react';
import PropTypes from 'prop-types';
import Gear from '../../../../components/label/gear/gear'
import Field from '../../../../components/shared/field/field';
import { gearPositions } from '../../../../services/constant/gear';

class GearField extends Component {
    render() {
        const { position, insert, invalid } = this.props
        return (
            <Field invalid={!!invalid} name={Object.values(gearPositions).find(p => p.value === position).name}>
                {!!insert ? <Gear where='equiped' position={position} gear={insert} /> : null}
            </Field>
        )
    }
}

GearField.propTypes = {
    position: PropTypes.number.isRequired,
    insert: PropTypes.object,
    invalid: PropTypes.bool
}

export default GearField;