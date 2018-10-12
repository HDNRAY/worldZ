import { Component } from 'react';
import PropTypes from 'prop-types';
import Gear from '../../../../components/label/gear/gear'
import Field from '../../../../components/shared/field/field';

class GearField extends Component {
    render() {
        const { position, insert, invalid } = this.props;

        return (
            <Field invalid={!!invalid} name={Gear.positions[position]}>
                {!!insert ? <Gear where='equiped' position={position} gear={insert} /> : null}
            </Field>
        )
    }
}

GearField.propTypes = {
    position: PropTypes.string.isRequired,
    insert: PropTypes.object,
    invalid: PropTypes.bool
}

export default GearField;